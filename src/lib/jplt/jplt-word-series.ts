import { hiraganaByAscii } from '$lib/components/syllabaries/hiragana';
import { asciiToCharacters } from '$lib/conversions/ascii-to-characters';
import type { Character } from '../../types';
import type { WordEntry } from '../../types/wordEntry';
import n5 from './assets/n5.csv';
import n4 from './assets/n4.csv';
import n3 from './assets/n3.csv';
import n2 from './assets/n2.csv';
import n1 from './assets/n1.csv';
import type { JPLT_LEVEL } from '../../types/jplt';

type WordCsvRow = {
	expression: string; // kanji
	guid: string; // string
	meaning: string; // english translation
	reading: string; // hiragana (or katana)
	tags: string; // list of tags, separated by space char
};

const wordListToSet = (list: WordCsvRow[]): WordEntry[] => {
	return list.map((row) => {
		const ascii = row.reading.split('');

		return {
			ascii,
			meaning: row.meaning,
			characterIds: asciiToCharacters(hiraganaByAscii, ascii).map((c) => c.id),
		};
	});
};

const n5Entries = wordListToSet(n5);
const n4Entries = wordListToSet(n4);
const n3Entries = wordListToSet(n3);
const n2Entries = wordListToSet(n2);
const n1Entries = wordListToSet(n1);

const jpltLevelToEntries = (maxLevel: JPLT_LEVEL): WordEntry[] => {
	const entries: WordEntry[] = [];
	if (maxLevel <= 5) {
		entries.push(...n5Entries);
	}
	if (maxLevel <= 4) {
		entries.push(...n4Entries);
	}
	if (maxLevel <= 3) {
		entries.push(...n3Entries);
	}
	if (maxLevel <= 2) {
		entries.push(...n2Entries);
	}
	if (maxLevel == 1) {
		entries.push(...n1Entries);
	}

	return entries;
};

/**
 * @returns every JPLT words related to max level, excluding characters not in whitelist when provided
 */
export const getJpltWords = (
	whitelist: Map<Character['id'], Character>,
	maxLevel: JPLT_LEVEL
): WordEntry[] => {
	const entries = jpltLevelToEntries(maxLevel);
	if (!whitelist.size) {
		return entries;
	}

	const whitelistSet = new Set(whitelist.values().map((char) => char.ascii));

	return entries.filter((entry) => {
		// FIXME some entry.ascii actually contains multiple writings escaped by a smemi-color and a space "; "
		return entry.ascii.every((str) => whitelistSet.has(str));
	});
};
