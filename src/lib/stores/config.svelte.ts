import { writable, type Updater } from 'svelte/store';
import type { Character } from '../../types/character';
import { SvelteSet } from 'svelte/reactivity';
import { hiragana } from '$lib/components/syllabaries/hiragana';

type ConfigStore = {
	selectedHiragana: SvelteSet<Character['id']>;
};

type LocalStorageConfig = {
	selectedHiraganaIds: Character['id'][];
};

const LOCAL_STORAGE_KEY = 'config';

const persistStoreValue = (value: ConfigStore) => {
	const localValue: LocalStorageConfig = {
		selectedHiraganaIds: value.selectedHiragana.keys().toArray(),
	};
	localStorage?.setItem(LOCAL_STORAGE_KEY, JSON.stringify(localValue));
};

const loadInitial = (): ConfigStore => {
	const localValueStringify = localStorage?.getItem(LOCAL_STORAGE_KEY);
	let localValue: LocalStorageConfig | undefined;
	if (localValueStringify) {
		const localValue: LocalStorageConfig = JSON.parse(localValueStringify);
		return {
			selectedHiragana: new SvelteSet(localValue.selectedHiraganaIds),
		};
	}

	// default value
	const everyHiraganaIds = Object.values(hiragana).map((character) => character.id);
	const value = {
		selectedHiragana: new SvelteSet(localValue?.selectedHiraganaIds ?? everyHiraganaIds),
	};
	persistStoreValue(value);
	return value;
};

const initial = loadInitial();
const store = writable<ConfigStore>(initial);

const update = (callback: Updater<ConfigStore>) => {
	return store.update((last) => {
		const value = callback(last);
		const localValue: LocalStorageConfig = {
			selectedHiraganaIds: value.selectedHiragana.keys().toArray(),
		};
		localStorage?.setItem(LOCAL_STORAGE_KEY, JSON.stringify(localValue));

		return value;
	});
};

export const configStore = {
	subscribe: store.subscribe,
	update,
	selectedHiragana: {
		add: (id: string) => {
			return update((storeValue) => {
				storeValue.selectedHiragana.add(id);
				return storeValue;
			});
		},
		delete: (id: string) => {
			return update((storeValue) => {
				storeValue.selectedHiragana.add(id);
				return storeValue;
			});
		},
	},
};
