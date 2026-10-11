import { get, writable, type Updater } from 'svelte/store';
import type { Character, CharacterWhitelist } from '../../types/character';
import { SvelteDate, SvelteMap } from 'svelte/reactivity';
import { hiragana } from '$lib/components/syllabaries/hiragana';
import type { HiraganaScoreDetails } from '../../types/hiraganaScoreDetails';
import { computeSuperMemoScore, computeWeightFromSuperMemoScore } from '$lib/superMemo/super-memo';

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

const reset = (): SuperMemoStore => {
	const everyHiraganaIds: SuperMemoTuple[] = Object.values(hiragana).map((character) => [
		character.id,
		{ lastSeenAt: undefined, successStreak: 0 },
	]);
	const value = {
		hiragana: new SvelteMap(everyHiraganaIds),
	};
	persistStoreValue(value);
	return value;
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
		 * Return a random element based on its score. The lower the score, the upper the
		 * probability it will be picked
		 *
		 */
		getRandomCharacter: (
			whitelist: CharacterWhitelist,
			excludeCharacterId?: Character['id']
		): Character | null => {
			const characterByScore = get(store).hiragana;
			const selectionItems: Array<{
				id: Character['id'];
				score: number;
				accumulatedWeight: number;
			}> = [];

			const whitelistedCharacters = whitelist
				.entries()
				.toArray()
				.map(([id]) => {
					return {
						id,
						scoreDetails: characterByScore.get(id),
					};
				});

			if (whitelistedCharacters.length == 0) {
				return null;
			}

			let totalWeight = 0;
			for (const { id, scoreDetails } of whitelistedCharacters) {
				if (id === excludeCharacterId) {
					continue;
				}
				const score = computeSuperMemoScore(scoreDetails);
				const weight = computeWeightFromSuperMemoScore(score);
				selectionItems.push({
					id,
					score,
					accumulatedWeight: totalWeight + weight,
				});
				totalWeight += weight;
			}

			const rand = Math.floor(Math.random() * totalWeight);
			for (const selectionItem of selectionItems) {
				if (selectionItem.accumulatedWeight < rand) {
					continue;
				}
				return whitelist.get(selectionItem.id) ?? null;
			}

			return null;
		},
		getMinimumSuccessStreak: (whitelist: CharacterWhitelist): number => {
			let minSuccessStreak = 0;
			const characterByScore = get(store).hiragana;
			for (const characterId of whitelist.keys()) {
				const scoreDetails = characterByScore.get(characterId);
				if (scoreDetails?.successStreak === undefined) {
					return 0;
				}

				if (scoreDetails.successStreak > minSuccessStreak) {
					minSuccessStreak = scoreDetails.successStreak;
				}
			}
			return minSuccessStreak;
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
		reset: () => {
			return update(reset);
		},
	},
};
