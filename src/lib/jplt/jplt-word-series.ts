import { convertAsciiToCharacters } from '$lib/conversions/convert-ascii-to-characters';
import type { Character } from '../../types';
import type { WordEntry } from '../../types/wordEntry';
import type { JPLT_LEVEL, WordCsvRow } from '../../types/jplt';

/**
 * Convert a CSV row object to a word entry
 *
 * NOTE: only the first reading is returned
 */
const wordListToSet = (
	list: WordCsvRow[],
	asciiToCharacter: (ascii: string) => Character | undefined
): WordEntry[] => {
	return list.map((row) => {
		const readings = row.reading.split('; ');
		const ascii = readings[0].split('');

		return {
			ascii,
			meaning: row.meaning,
			characterIds: convertAsciiToCharacters(asciiToCharacter, ascii).map((c) => c.id),
		};
	});
};

const jpltLevelToEntries = (
	maxLevel: JPLT_LEVEL,
	wordLists: Record<JPLT_LEVEL, WordCsvRow[]>,
	asciiToCharacter: (ascii: string) => Character | undefined
): WordEntry[] => {
	const getWordSet = (level: JPLT_LEVEL) => wordListToSet(wordLists[level], asciiToCharacter);

	const entries: WordEntry[] = [];
	if (maxLevel <= 5) {
		entries.push(...getWordSet(5));
	}
	if (maxLevel <= 4) {
		entries.push(...getWordSet(4));
	}
	if (maxLevel <= 3) {
		entries.push(...getWordSet(3));
	}
	if (maxLevel <= 2) {
		entries.push(...getWordSet(2));
	}
	if (maxLevel == 1) {
		entries.push(...getWordSet(1));
	}

	return entries;
};

/**
 * @returns every JPLT words related to max level, excluding characters not in whitelist when provided
 */
export const getJpltWords = (
	whitelist: Map<Character['id'], Pick<Character, 'ascii'>>,
	maxLevel: JPLT_LEVEL,
	wordLists: Record<JPLT_LEVEL, WordCsvRow[]>,
	asciiToCharacter: (ascii: string) => Character | undefined
): WordEntry[] => {
	const entries = jpltLevelToEntries(maxLevel, wordLists, asciiToCharacter);
	if (!whitelist.size) {
		return entries;
	}

	const whitelistSet = new Set(whitelist.values().map((char) => char.ascii));

	return entries.filter((entry) => {
		// FIXME some entry.ascii actually contains multiple writings escaped by a smemi-color and a space "; "
		return entry.ascii.every((str) => whitelistSet.has(str));
	});
};
