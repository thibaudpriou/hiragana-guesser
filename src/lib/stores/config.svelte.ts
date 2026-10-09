import { writable, type Updater } from 'svelte/store';
import type { Character } from '../../types/character';
import { SvelteSet } from 'svelte/reactivity';
import { hiragana } from '$lib/components/syllabaries/hiragana';

type ConfigStore = {
	selectedHiragana: SvelteSet<Character['id']>;
};

const loadInitial = (): ConfigStore => {
	const everyHiraganaIds = Object.values(hiragana).map((character) => character.id);
	const value = {
		selectedHiragana: new SvelteSet(everyHiraganaIds),
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
			return update((): ConfigStore => {
				if (!shouldSelectAll) {
					return { selectedHiragana: new SvelteSet() } as const;
				}

				const everyHiraganaIds = Object.values(hiragana).map((character) => character.id);
				const value = { selectedHiragana: new SvelteSet(everyHiraganaIds) } as const;
				return value;
			});
		},
	},
};
