import { SvelteMap } from 'svelte/reactivity';
import { type Character } from '../../types/character';

export const charactersToAsciiMap = (
	byId: SvelteMap<Character['id'], Character>
): SvelteMap<string, Character> => {
	const byAscii = new SvelteMap<Character['ascii'], Character>();
	for (const char of byId.values()) {
		byAscii.set(char.ascii, char);
	}
	return byAscii;
};
