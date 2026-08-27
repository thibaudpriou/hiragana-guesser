import { writable, type Updater } from 'svelte/store';
import type { Character } from '../../types/character';
import { SvelteSet } from 'svelte/reactivity';
import { hiragana } from '$lib/components/syllabaries/hiragana';
import type { AnimationSpeedLevel } from '../../types/caligraphy';

type ConfigStore = {
	animationSpeedLevel: AnimationSpeedLevel;
	selectedHiragana: SvelteSet<Character['id']>;
};

type LocalStorageConfig = {
	animationSpeedLevel: AnimationSpeedLevel;
	selectedHiraganaIds: Character['id'][];
};

const LOCAL_STORAGE_KEY = 'config';
const DEFAULT_ANIMATION_SPEED_LEVEL = 2;

const persistStoreValue = (value: ConfigStore) => {
	const localValue: LocalStorageConfig = {
		animationSpeedLevel: value.animationSpeedLevel,
		selectedHiraganaIds: value.selectedHiragana.keys().toArray(),
	};
	localStorage?.setItem(LOCAL_STORAGE_KEY, JSON.stringify(localValue));
};

const reset = (): ConfigStore => {
	const everyHiraganaIds = Object.values(hiragana).map((character) => character.id);
	const value = {
		animationSpeedLevel: DEFAULT_ANIMATION_SPEED_LEVEL,
		selectedHiragana: new SvelteSet(everyHiraganaIds),
	} as const;
	persistStoreValue(value);
	return value;
};

const loadInitial = (): ConfigStore => {
	const localValueStringify = localStorage?.getItem(LOCAL_STORAGE_KEY);
	let localValue: LocalStorageConfig | undefined;
	if (localValueStringify) {
		localValue = JSON.parse(localValueStringify) as LocalStorageConfig;
		return {
			animationSpeedLevel: localValue.animationSpeedLevel,
			selectedHiragana: new SvelteSet(localValue.selectedHiraganaIds),
		};
	}

	// default value
	const everyHiraganaIds = Object.values(hiragana).map((character) => character.id);
	const value = {
		animationSpeedLevel: localValue?.animationSpeedLevel ?? DEFAULT_ANIMATION_SPEED_LEVEL,
		selectedHiragana: new SvelteSet(localValue?.selectedHiraganaIds ?? everyHiraganaIds),
	} satisfies ConfigStore;
	persistStoreValue(value);
	return value;
};

const initial = loadInitial();
const store = writable<ConfigStore>(initial);

const update = (callback: Updater<ConfigStore>) => {
	return store.update((last) => {
		const value = callback(last);
		const localValue: LocalStorageConfig = {
			animationSpeedLevel: value.animationSpeedLevel,
			selectedHiraganaIds: value.selectedHiragana.keys().toArray(),
		};
		localStorage?.setItem(LOCAL_STORAGE_KEY, JSON.stringify(localValue));

		return value;
	});
};

export const configStore = {
	subscribe: store.subscribe,
	update,
	animationSpeed: {
		set: (level: AnimationSpeedLevel) => {
			return update((storeValue) => {
				storeValue.animationSpeedLevel = level;
				return storeValue;
			});
		},
	},
	selectedHiragana: {
		add: (id: string) => {
			return update((storeValue) => {
				storeValue.selectedHiragana.add(id);
				return storeValue;
			});
		},
		delete: (id: string) => {
			return update((storeValue) => {
				storeValue.selectedHiragana.delete(id);
				return storeValue;
			});
		},
		reset: () => {
			return update(reset);
		},
	},
};
