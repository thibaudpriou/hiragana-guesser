import { writable, type Updater } from 'svelte/store';
import { SvelteSet } from 'svelte/reactivity';
import { hiragana } from '$lib/components/syllabaries/hiragana';
import type { Character, KanaType } from '../../types/character';
import { katakana } from '$lib/components/syllabaries/katakana';

type ConfigStore = {
	selectedHiragana: SvelteSet<Character<KanaType.HIRAGANA>['id']>;
	selectedKatakana: SvelteSet<Character<KanaType.KATAKANA>['id']>;
};

const loadInitial = (): ConfigStore => {
	const everyHiraganaIds = Object.keys(hiragana);
	const everyKatakanaIds = Object.keys(katakana);
	const value = {
		selectedHiragana: new SvelteSet(everyHiraganaIds),
		selectedKatakana: new SvelteSet(everyKatakanaIds),
	} satisfies ConfigStore;
	return value;
};

const initial = loadInitial();
const store = writable<ConfigStore>(initial);

const update = (callback: Updater<ConfigStore>) => {
	return store.update((last) => {
		const value = callback(last);
		return value;
	});
};

export const configStore = {
	subscribe: store.subscribe,
	update,
	selectedHiragana: {
		/** add new character to selection set */
		add: (id: string) => {
			return update((storeValue) => {
				storeValue.selectedHiragana.add(id);
				return storeValue;
			});
		},
		/** remove character from selection set */
		delete: (id: string) => {
			return update((storeValue) => {
				storeValue.selectedHiragana.delete(id);
				return storeValue;
			});
		},
		/** reset selection set */
		reset: (shouldSelectAll: boolean = true) => {
			return update((storeValue): ConfigStore => {
				if (!shouldSelectAll) {
					return {
						selectedHiragana: new SvelteSet(),
						selectedKatakana: storeValue.selectedKatakana,
					} as const;
				}

				const value = {
					selectedHiragana: new SvelteSet(Object.keys(hiragana)),
					selectedKatakana: storeValue.selectedKatakana,
				} as const;
				return value;
			});
		},
	},

	selectedKatakana: {
		/** add new character to selection set */
		add: (id: string) => {
			return update((storeValue) => {
				storeValue.selectedKatakana.add(id);
				return storeValue;
			});
		},
		/** remove character from selection set */
		delete: (id: string) => {
			return update((storeValue) => {
				storeValue.selectedKatakana.delete(id);
				return storeValue;
			});
		},
		/** reset selection set */
		reset: (shouldSelectAll: boolean = true) => {
			return update((storeValue): ConfigStore => {
				if (!shouldSelectAll) {
					return {
						selectedHiragana: storeValue.selectedHiragana,
						selectedKatakana: new SvelteSet(),
					} as const;
				}

				const value = {
					selectedHiragana: storeValue.selectedHiragana,
					selectedKatakana: new SvelteSet(Object.keys(katakana)),
				} as const;
				return value;
			});
		},
	},
};
