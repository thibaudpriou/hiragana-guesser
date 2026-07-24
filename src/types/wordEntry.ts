import type { Character } from './character';

export type WordEntry = {
	ascii: string[]; // array of ASCII Characters
	characterIds: Character['id'][]; // array of ASCII Characters
	meaning?: string;
};
