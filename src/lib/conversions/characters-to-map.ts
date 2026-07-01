import { SvelteMap } from 'svelte/reactivity';
import { Character } from '../../types/character';

export const charactersToMap = (arr: Character[]): SvelteMap<string, Character> => {
	const set = new SvelteMap<string, Character>();
	for (const char of arr) {
		set.set(char.ascii, char);
	}
	return set;
};
