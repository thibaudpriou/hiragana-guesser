import { KanaType, type Character } from '../../../../types';

import { charactersToAsciiMap } from '$lib/conversions/characters-to-ascii-map';
import { SvelteMap } from 'svelte/reactivity';
import type { RegularCharacter } from '../../../../types/character';

import * as A from './seion/a.svelte';
import * as I from './seion/i.svelte';
import * as U from './seion/u.svelte';
import * as E from './seion/e.svelte';
import * as O from './seion/o.svelte';

const formatCharacter = (raw: {
	default: unknown;
}): Pick<RegularCharacter<KanaType.KATAKANA>, 'component' | 'type' | 'kanaType'> => {
	return {
		component: raw.default as Character<KanaType>['component'],
		kanaType: KanaType.KATAKANA,
		type: 'regular',
	};
};

export const katakana = {
	A: {
		...formatCharacter(A),
		romanji: 'a',
		nbStrokes: 2,
		id: 'A',
		ascii: 'ア',
	},
	I: {
		...formatCharacter(I),
		romanji: 'i',
		nbStrokes: 2,
		id: 'I',
		ascii: 'イ',
	},
	U: {
		...formatCharacter(U),
		romanji: 'u',
		nbStrokes: 3,
		id: 'U',
		ascii: 'ウ',
	},
	E: {
		...formatCharacter(E),
		romanji: 'e',
		nbStrokes: 3,
		id: 'E',
		ascii: 'エ',
	},
	O: {
		...formatCharacter(O),
		romanji: 'o',
		nbStrokes: 3,
		id: 'O',
		ascii: 'オ',
	},
} satisfies Record<RegularCharacter<KanaType.KATAKANA>['id'], RegularCharacter<KanaType.KATAKANA>>;

export const katakanaByAscii = charactersToAsciiMap(Object.values(katakana));

export const isKatakanaKey = (key: string, obj: typeof katakana): key is keyof typeof katakana => {
	return key in obj;
};
