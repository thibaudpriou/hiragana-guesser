import type { CharacterIdObject } from './character';

export type WordEntry = {
	ascii: string[]; // array of ASCII Characters
	characterIds: CharacterIdObject[];
	meaning?: string;
};
