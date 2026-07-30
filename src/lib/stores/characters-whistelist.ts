import { derived } from 'svelte/store';
import { configStore } from './config.svelte';
import { SvelteMap } from 'svelte/reactivity';
import type { Character } from '../../types/character';
import { hiragana } from '$lib/components/syllabaries/hiragana';

export const charactersWhitelist = derived(configStore, ($config) => {
	const charactersIds = $config.selectedHiragana.keys().toArray();

	const whitelist = new SvelteMap<Character['id'], Character>();
	for (const id of charactersIds) {
		whitelist.set(id, hiragana[id]);
	}

	return whitelist;
});
