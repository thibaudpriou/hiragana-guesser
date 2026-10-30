import { SvelteMap } from 'svelte/reactivity';
import { KanaType, type Character } from '../../types/character';

export const charactersToAsciiMap = (
	characters: Character<KanaType>[]
): Map<string, Character<KanaType>> => {
	const byAscii = new SvelteMap<Character<KanaType>['ascii'], Character<KanaType>>();
	for (const char of characters) {
		byAscii.set(char.ascii, char);
	}

	return byAscii;
};
