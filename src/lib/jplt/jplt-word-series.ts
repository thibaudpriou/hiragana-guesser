import type { Character } from '../../types';
import type { WordEntry } from '../../types/wordEntry';
import n5 from './assets/n5.csv';

type WordCsvRow = {
	expression: string; // kanji
	guid: string; // string
	meaning: string; // english translation
	reading: string; // hiragana (or katana)
	tags: string; // list of tags, separated by space char
};

const wordListToSet = (list: WordCsvRow[]): WordEntry[] => {
	return list.map((row) => ({
		reading: row.reading.split(''),
		meaning: row.meaning,
	}));
};

const n5Entries = wordListToSet(n5);

/**
 * @returns every JPLT N5 word, excluding characters not in whitelist when provided
 */
export const getWordsN5 = (whitelist: Character[] | null): WordEntry[] => {
	if (!whitelist?.length) {
		return n5Entries;
	}

	const whitelistSet = new Set(whitelist.map((char) => char.ascii));

	return n5Entries.filter((entry) => {
		return entry.reading.every((str) => whitelistSet.has(str));
	});
};
