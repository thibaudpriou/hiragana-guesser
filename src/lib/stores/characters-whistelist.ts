import { derived } from 'svelte/store';
import { configStore } from './config.svelte';
import { SvelteMap } from 'svelte/reactivity';
import type { Character, KanaType } from '../../types/character';
import { hiragana, isHiraganaKey } from '$lib/components/syllabaries/hiragana';
import { isKatakanaKey, katakana } from '$lib/components/syllabaries/katakana';

export const charactersWhitelist = derived(configStore, ($config) => {
	const whitelist = {
		hiragana: new SvelteMap<Character<KanaType.HIRAGANA>['id'], Character<KanaType.HIRAGANA>>(),
		katakana: new SvelteMap<Character<KanaType.KATAKANA>['id'], Character<KanaType.KATAKANA>>(),
	};
	for (const id of $config.selectedHiragana.keys().toArray()) {
		if (!isHiraganaKey(id, hiragana)) {
			throw new Error(`Unknown hiragana character ID: ${id}`);
		}
		whitelist.hiragana.set(id, hiragana[id]);
	}

	for (const id of $config.selectedKatakana.keys().toArray()) {
		if (!isKatakanaKey(id, katakana)) {
			throw new Error(`Unknown katakana character ID: ${id}`);
		}
		whitelist.katakana.set(id, katakana[id]);
	}

	return whitelist;
});
