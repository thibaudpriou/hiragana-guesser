import { get, writable, type Updater } from 'svelte/store';
import {
	KanaType,
	type Character,
	type CharacterIdObject,
	type CharacterMapById,
	type CharacterWhitelist,
} from '../../types/character';
import { SvelteDate, SvelteMap } from 'svelte/reactivity';
import { hiragana } from '$lib/components/syllabaries/hiragana';
import type { CharacterScoreDetails } from '../../types/character-score-details';
import { computeSuperMemoScore, computeWeightFromSuperMemoScore } from '$lib/superMemo/super-memo';
import { shuffleArray } from '$lib/helpers/shuffleArray';
import { katakana } from '$lib/components/syllabaries/katakana';

/**
 * This file contains a simplified custom version of SuperMemo to track
 * characters' learning
 *
 * TODO @tpriou: remove mentions of SuperMemo algorithm as it's not actually implemented
 */

type SuperMemoStore = {
	hiragana: SvelteMap<Character<KanaType.HIRAGANA>['id'], CharacterScoreDetails>;
	katakana: SvelteMap<Character<KanaType.KATAKANA>['id'], CharacterScoreDetails>;
};

type SuperMemoTuple = [Character<KanaType>['id'], CharacterScoreDetails];

type LocalStorageSuperMemo = {
	hiraganaByScore: Array<SuperMemoTuple>;
	katakanaByScore: Array<SuperMemoTuple>;
};

const LOCAL_STORAGE_KEY = 'superMemo';

const persistStoreValue = (value: SuperMemoStore) => {
	const localValue: LocalStorageSuperMemo = {
		hiraganaByScore: value.hiragana.entries().toArray(),
		katakanaByScore: value.katakana.entries().toArray(),
	};
	localStorage?.setItem(LOCAL_STORAGE_KEY, JSON.stringify(localValue));
};

const getEveryHiraganaIds = (): SuperMemoTuple[] =>
	Object.values(hiragana).map((character) => [
		character.id,
		{ lastSeenAt: undefined, successStreak: 0 },
	]);
const getEveryKatakanaIds = (): SuperMemoTuple[] =>
	Object.values(katakana).map((character) => [
		character.id,
		{ lastSeenAt: undefined, successStreak: 0 },
	]);

const reset = (): SuperMemoStore => {
	const value = {
		hiragana: new SvelteMap(getEveryHiraganaIds()),
		katakana: new SvelteMap(getEveryKatakanaIds()),
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
			katakana: new SvelteMap(localValue.katakanaByScore),
		};
	}

	// default value
	const value = {
		hiragana: new SvelteMap(localValue?.hiraganaByScore ?? getEveryHiraganaIds()),
		katakana: new SvelteMap(localValue?.katakanaByScore ?? getEveryKatakanaIds()),
	};
	persistStoreValue(value);
	return value;
};

const getCharacterFromWhitelist = (whitelist: CharacterWhitelist, item: CharacterIdObject) => {
	switch (item.kanaType) {
		case KanaType.HIRAGANA: {
			return whitelist.hiragana.get(item.id) ?? null;
		}
		case KanaType.KATAKANA: {
			return whitelist.katakana.get(item.id) ?? null;
		}
		default: {
			throw new Error(`Unknown kana type: ${item.kanaType}`);
		}
	}
};

const getKanaStore = (store: SuperMemoStore, kanaType: KanaType) => {
	switch (kanaType) {
		case KanaType.HIRAGANA: {
			return store.hiragana;
		}
		case KanaType.KATAKANA: {
			return store.katakana;
		}
		default: {
			throw new Error(`Unknown kana type: ${kanaType}`);
		}
	}
};

const initial = loadInitial();
const store = writable<SuperMemoStore>(initial);

const update = (callback: Updater<SuperMemoStore>) => {
	return store.update((last) => {
		const value = callback(last);
		const localValue: LocalStorageSuperMemo = {
			hiraganaByScore: value.hiragana.entries().toArray(),
			katakanaByScore: value.katakana.entries().toArray(),
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
		getPseudoRandomCharacter: (
			whitelist: CharacterWhitelist,
			excludeCharacterId?: CharacterIdObject
		): Character<KanaType> | null => {
			const selectionItems: Array<{
				id: Character<KanaType>['id'];
				score: number;
				accumulatedWeight: number;
				kanaType: KanaType;
			}> = [];

			const formatWhitelist = (
				whitelistCharactersById: Map<string, Character<KanaType>>,
				scoreMap: SvelteMap<string, CharacterScoreDetails>,
				kanaType: KanaType
			) =>
				whitelistCharactersById
					.entries()
					.toArray()
					.map(([id]) => {
						return {
							id,
							kanaType,
							scoreDetails: scoreMap.get(id),
						};
					});

			const hiraganaByScore = get(store).hiragana;
			const katakanaByScore = get(store).katakana;
			const whitelistedCharacters = [
				...formatWhitelist(whitelist.hiragana, hiraganaByScore, KanaType.HIRAGANA),
				...formatWhitelist(whitelist.katakana, katakanaByScore, KanaType.KATAKANA),
			];
			if (whitelistedCharacters.length == 0) {
				return null;
			}

			let totalWeight = 0;
			for (const { id, kanaType, scoreDetails } of whitelistedCharacters) {
				if (id === excludeCharacterId?.id && kanaType === excludeCharacterId.kanaType) {
					continue;
				}
				const score = computeSuperMemoScore(scoreDetails);
				const weight = computeWeightFromSuperMemoScore(score, whitelistedCharacters.length);
				selectionItems.push({
					id,
					score,
					kanaType,
					accumulatedWeight: totalWeight + weight,
				});
				totalWeight += weight;
			}

			const rand = Math.floor(Math.random() * totalWeight);
			for (const selectionItem of selectionItems) {
				if (selectionItem.accumulatedWeight < rand) {
					continue;
				}

				return getCharacterFromWhitelist(whitelist, selectionItem);
			}

			return null;
		},

		/**
		 * Return an array of truly random elements, independent of its score
		 */
		getRandomCharacters: (
			whitelist: CharacterWhitelist,
			nbElements: number,
			excludeCharacterId?: CharacterIdObject
		): Character<KanaType>[] => {
			const formatWhitelist = <T extends KanaType>(kanaType: T, byId: CharacterMapById<T>) =>
				byId
					.keys()
					.toArray()
					.map((id) => ({ id, kanaType }));
			const whitelistedCharactersId = [
				...formatWhitelist(KanaType.HIRAGANA, whitelist.hiragana),
				...formatWhitelist(KanaType.KATAKANA, whitelist.katakana),
			].filter(
				({ id, kanaType }) =>
					id !== excludeCharacterId?.id || kanaType !== excludeCharacterId?.kanaType
			);

			const shuffled = shuffleArray(whitelistedCharactersId);

			return shuffled.slice(0, nbElements).map((item) => {
				const element = getCharacterFromWhitelist(whitelist, item);

				if (!element) {
					throw new Error(`Character id not in whitelist: ${item.id} (${item.kanaType})`);
				}
				return element;
			});
		},
		getMinimumSuccessStreak: (whitelist: CharacterWhitelist): number => {
			let minSuccessStreak = Number.MAX_SAFE_INTEGER;
			const hiraganaByScore = get(store).hiragana;
			for (const hiraganaId of whitelist.hiragana.keys()) {
				const scoreDetails = hiraganaByScore.get(hiraganaId);

				if (scoreDetails?.successStreak === undefined) {
					return 0;
				}

				if (scoreDetails.successStreak < minSuccessStreak) {
					minSuccessStreak = scoreDetails.successStreak;
				}
			}
			const katakanaByScore = get(store).katakana;
			for (const katakanaId of whitelist.katakana.keys()) {
				const scoreDetails = katakanaByScore.get(katakanaId);

				if (scoreDetails?.successStreak === undefined) {
					return 0;
				}

				if (scoreDetails.successStreak < minSuccessStreak) {
					minSuccessStreak = scoreDetails.successStreak;
				}
			}

			return minSuccessStreak;
		},
		/**
		 * Update score details of every character after a successful guess
		 */
		success: (characterIds: CharacterIdObject[]) => {
			return update((storeValue) => {
				for (const characterId of characterIds) {
					const kanaStore = getKanaStore(storeValue, characterId.kanaType);
					const previous = kanaStore.get(characterId.id);
					const previousSuccessStreak = previous?.successStreak ?? 0;

					kanaStore.set(characterId.id, {
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
		error: (characterIds: CharacterIdObject[]) => {
			return update((storeValue) => {
				for (const characterId of characterIds) {
					const kanaStore = getKanaStore(storeValue, characterId.kanaType);
					kanaStore.set(characterId.id, {
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
