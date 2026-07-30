import { get, writable, type Updater } from 'svelte/store';
import type { Character } from '../../types/character';
import { SvelteDate, SvelteMap, SvelteSet } from 'svelte/reactivity';
import { hiragana } from '$lib/components/syllabaries/hiragana';
import type { HiraganaScoreDetails } from '../../types/hiraganaScoreDetails';
import { computeSuperMemoScore } from '$lib/superMemo/super-memo';

/**
 * This file contains a simplified custom version of SuperMemo to track
 * characters' learning
 */

type SuperMemoStore = {
	hiragana: SvelteMap<Character['id'], HiraganaScoreDetails>;
};

type SuperMemoTuple = [Character['id'], HiraganaScoreDetails];

type LocalStorageSuperMemo = {
	hiraganaByScore: Array<SuperMemoTuple>;
};

const LOCAL_STORAGE_KEY = 'superMemo';

const persistStoreValue = (value: SuperMemoStore) => {
	const localValue: LocalStorageSuperMemo = {
		hiraganaByScore: value.hiragana.entries().toArray(),
	};
	localStorage?.setItem(LOCAL_STORAGE_KEY, JSON.stringify(localValue));
};

const loadInitial = (): SuperMemoStore => {
	const localValueStringify = localStorage?.getItem(LOCAL_STORAGE_KEY);
	let localValue: LocalStorageSuperMemo | undefined;
	if (localValueStringify) {
		localValue = JSON.parse(localValueStringify) as LocalStorageSuperMemo;
		return {
			hiragana: new SvelteMap(localValue.hiraganaByScore),
		};
	}

	// default value
	const everyHiraganaIds: SuperMemoTuple[] = Object.values(hiragana).map((character) => [
		character.id,
		{ lastSeenAt: undefined, successStreak: 0 },
	]);
	const value = {
		hiragana: new SvelteMap(localValue?.hiraganaByScore ?? everyHiraganaIds),
	};
	persistStoreValue(value);
	return value;
};

const initial = loadInitial();
const store = writable<SuperMemoStore>(initial);

const update = (callback: Updater<SuperMemoStore>) => {
	return store.update((last) => {
		const value = callback(last);
		const localValue: LocalStorageSuperMemo = {
			hiraganaByScore: value.hiragana.entries().toArray(),
		};
		localStorage?.setItem(LOCAL_STORAGE_KEY, JSON.stringify(localValue));

		return value;
	});
};

export const superMemo = {
	subscribe: store.subscribe,
	update,
	guess: {
		/**
		 * Compute score for each hiragana character then returns the element
		 * with the maximum score (or a random one between elements that share the maximum score)
		 */
		getMostForgettedCharacter: (whitelist: Array<string>): Character['id'] => {
			const characterByScore = get(store).hiragana;
			const scores: Array<{ id: Character['id']; score: number }> = characterByScore
				.entries()
				.toArray()
				.filter(([id]) => whitelist.includes(id))
				.map(([id, scoreDetails]) => {
					return {
						id,
						score: computeSuperMemoScore(scoreDetails),
					};
				});

			const maxIds = new SvelteSet<string>(scores[0].id);
			let maxScore = scores[0].score;
			for (const entry of scores) {
				if (maxScore > entry.score) {
					continue;
				}

				if (maxScore < entry.score) {
					maxScore = entry.score;
					maxIds.clear();
				}
				maxIds.add(entry.id);
			}

			const entries = maxIds.keys().toArray();
			const randIndex = Math.floor(Math.random() * entries.length);
			return entries[randIndex];
		},
		/**
		 * Update score details of every character after a successful guess
		 */
		success: (characterIds: Character['id'][]) => {
			return update((storeValue) => {
				for (const characterId of characterIds) {
					const previous = storeValue.hiragana.get(characterId);
					const previousSuccessStreak = previous?.successStreak ?? 0;
					storeValue.hiragana.set(characterId, {
						lastSeenAt: new SvelteDate().toISOString(),
						successStreak: previousSuccessStreak + 1,
					});
				}

				return storeValue;
			});
		},
		/**
		 * Update score details of every character after a wrong guess
		 */
		error: (characterIds: Character['id'][]) => {
			return update((storeValue) => {
				for (const characterId of characterIds) {
					storeValue.hiragana.set(characterId, {
						lastSeenAt: new SvelteDate().toISOString(),
						successStreak: 0,
					});
				}

				return storeValue;
			});
		},
	},
};
