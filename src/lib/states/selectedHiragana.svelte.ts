import { hiragana } from '$lib/components/syllabaries/hiragana';
import { SvelteSet } from 'svelte/reactivity';

const hiraganaIds = Object.values(hiragana).map((character) => character.id);
const hiraganaSet = new SvelteSet(hiraganaIds);
const selected = $state(hiraganaSet);

export const getSelectedHiraganaState = () => {
	return selected;
};
