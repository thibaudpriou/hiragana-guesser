import { describe, expect, test } from 'vitest';
import type { JPLT_LEVEL, WordCsvRow } from '../../types/jplt';
import { getJpltWords } from './jplt-word-series';
import type { RegularCharacter } from '../../types';
import { hiraganaByAscii } from '$lib/components/syllabaries/hiragana';

const mockWhitelistSet: Map<string, Pick<RegularCharacter, 'ascii'>> = new Map([
	['a', { ascii: 'あ' }],
	['i', { ascii: 'い' }],
	['u', { ascii: 'う' }],
	['e', { ascii: 'え' }],
	['o', { ascii: 'お' }],
]);

const mockAsciiToCharacter = (k: string) => {
	return hiraganaByAscii.get(k);
};

const createWordCsvRow = (partialRow: Pick<WordCsvRow, 'reading' | 'meaning'>): WordCsvRow => ({
	expression: '',
	guid: 'foo',
	tags: '',
	...partialRow,
});

describe('getJpltWords', () => {
	describe('should respect given JPLT level', () => {
		const mockWordLists: Record<JPLT_LEVEL, WordCsvRow[]> = {
			5: [createWordCsvRow({ meaning: 'word 5', reading: 'あ' })],
			4: [
				createWordCsvRow({ meaning: 'word 4.0', reading: 'い' }),
				createWordCsvRow({ meaning: 'word 4.1', reading: 'いい' }),
			],
			3: [createWordCsvRow({ meaning: 'word 3', reading: 'う' })],
			2: [
				createWordCsvRow({ meaning: 'word 2.0', reading: 'え' }),
				createWordCsvRow({ meaning: 'word 2.1', reading: 'ええ' }),
			],
			1: [createWordCsvRow({ meaning: 'word 1', reading: 'お' })],
		};

		test('when level=5, return only words of this level', () => {
			const maxLevel = 5;
			const result = getJpltWords(mockWhitelistSet, maxLevel, mockWordLists, mockAsciiToCharacter);

			expect(result).toStrictEqual([expect.objectContaining({ meaning: 'word 5' })]);
		});

		test('when level=4, return words of level 5 & 4', () => {
			const maxLevel = 4;
			const result = getJpltWords(mockWhitelistSet, maxLevel, mockWordLists, mockAsciiToCharacter);

			expect(result).toStrictEqual([
				expect.objectContaining({ meaning: 'word 5' }),
				expect.objectContaining({ meaning: 'word 4.0' }),
				expect.objectContaining({ meaning: 'word 4.1' }),
			]);
		});

		test('when level=3, return words of level 5 & 4 & 3', () => {
			const maxLevel = 3;
			const result = getJpltWords(mockWhitelistSet, maxLevel, mockWordLists, mockAsciiToCharacter);

			expect(result).toStrictEqual([
				expect.objectContaining({ meaning: 'word 5' }),
				expect.objectContaining({ meaning: 'word 4.0' }),
				expect.objectContaining({ meaning: 'word 4.1' }),
				expect.objectContaining({ meaning: 'word 3' }),
			]);
		});

		test('when level=2, return words of level 5 & 4 & 3 & 2', () => {
			const maxLevel = 2;
			const result = getJpltWords(mockWhitelistSet, maxLevel, mockWordLists, mockAsciiToCharacter);

			expect(result).toStrictEqual([
				expect.objectContaining({ meaning: 'word 5' }),
				expect.objectContaining({ meaning: 'word 4.0' }),
				expect.objectContaining({ meaning: 'word 4.1' }),
				expect.objectContaining({ meaning: 'word 3' }),
				expect.objectContaining({ meaning: 'word 2.0' }),
				expect.objectContaining({ meaning: 'word 2.1' }),
			]);
		});

		test('when level=1, return words of level 5 & 4 & 3 & 2 & 1', () => {
			const maxLevel = 1;
			const result = getJpltWords(mockWhitelistSet, maxLevel, mockWordLists, mockAsciiToCharacter);

			expect(result).toStrictEqual([
				expect.objectContaining({ meaning: 'word 5' }),
				expect.objectContaining({ meaning: 'word 4.0' }),
				expect.objectContaining({ meaning: 'word 4.1' }),
				expect.objectContaining({ meaning: 'word 3' }),
				expect.objectContaining({ meaning: 'word 2.0' }),
				expect.objectContaining({ meaning: 'word 2.1' }),
				expect.objectContaining({ meaning: 'word 1' }),
			]);
		});
	});

	describe('should exclude words with characters not in whitelist', () => {
		const mockWordLists: Record<JPLT_LEVEL, WordCsvRow[]> = {
			5: [
				createWordCsvRow({ meaning: 'word 5: a', reading: 'あ' }),
				createWordCsvRow({ meaning: 'word 5: ii', reading: 'いい' }),
				createWordCsvRow({ meaning: 'word 5: u', reading: 'う' }),
			],
			4: [
				createWordCsvRow({ meaning: 'word 4: i', reading: 'い' }),
				createWordCsvRow({ meaning: 'word 4: ai', reading: 'あい' }),
				createWordCsvRow({ meaning: 'word 4: uu', reading: 'うう' }),
				createWordCsvRow({ meaning: 'word 4: au', reading: 'あう' }),
			],
			3: [],
			2: [],
			1: [],
		};

		test('should only return words in whitelist', () => {
			const maxLevel = 5;
			const mockWhitelistSet: Map<string, Pick<RegularCharacter, 'ascii'>> = new Map([
				['a', { ascii: 'あ' }],
				// ['i', { ascii: 'い' }],
				['u', { ascii: 'う' }],
				// ['e', { ascii: 'え' }],
				// ['o', { ascii: 'お' }],
			]);

			const result = getJpltWords(mockWhitelistSet, maxLevel, mockWordLists, mockAsciiToCharacter);

			expect(result).toStrictEqual([
				expect.objectContaining({ meaning: 'word 5: a' }),
				expect.objectContaining({ meaning: 'word 5: u' }),
			]);
		});

		test('should only return words in whitelist, with multiple JPLT levels', () => {
			const maxLevel = 4;
			const mockWhitelistSet: Map<string, Pick<RegularCharacter, 'ascii'>> = new Map([
				['a', { ascii: 'あ' }],
				// ['i', { ascii: 'い' }],
				['u', { ascii: 'う' }],
				// ['e', { ascii: 'え' }],
				// ['o', { ascii: 'お' }],
			]);

			const result = getJpltWords(mockWhitelistSet, maxLevel, mockWordLists, mockAsciiToCharacter);

			expect(result).toStrictEqual([
				expect.objectContaining({ meaning: 'word 5: a' }),
				expect.objectContaining({ meaning: 'word 5: u' }),
				expect.objectContaining({ meaning: 'word 4: uu' }),
				expect.objectContaining({ meaning: 'word 4: au' }),
			]);
		});
	});

	describe('should support words with different reading forms', () => {
		const mockWordLists: Record<JPLT_LEVEL, WordCsvRow[]> = {
			5: [
				createWordCsvRow({ meaning: 'word 5 with single form', reading: 'あ' }),
				createWordCsvRow({ meaning: 'word 5 with 2 forms', reading: 'う; いい' }),
			],
			4: [],
			3: [],
			2: [],
			1: [],
		};

		test('should return word when both forms contain characters in whitelist', () => {
			const maxLevel = 5;
			const mockWhitelistSet: Map<string, Pick<RegularCharacter, 'ascii'>> = new Map([
				['a', { ascii: 'あ' }],
				['i', { ascii: 'い' }],
				['u', { ascii: 'う' }],
			]);

			const result = getJpltWords(mockWhitelistSet, maxLevel, mockWordLists, mockAsciiToCharacter);

			expect(result).toStrictEqual([
				expect.objectContaining({ meaning: 'word 5 with single form', ascii: ['あ'] }),
				expect.objectContaining({ meaning: 'word 5 with 2 forms', ascii: ['う'] }),
			]);
		});

		test('should return word when 1st form in whitelist', () => {
			const maxLevel = 5;
			const mockWhitelistSet: Map<string, Pick<RegularCharacter, 'ascii'>> = new Map([
				['a', { ascii: 'あ' }],
				// ['i', { ascii: 'い' }],
				['u', { ascii: 'う' }],
			]);

			const result = getJpltWords(mockWhitelistSet, maxLevel, mockWordLists, mockAsciiToCharacter);

			expect(result).toStrictEqual([
				expect.objectContaining({ meaning: 'word 5 with single form', ascii: ['あ'] }),
				expect.objectContaining({ meaning: 'word 5 with 2 forms', ascii: ['う'] }),
			]);
		});

		test('should not return word when only 2nd form in whitelist', () => {
			const maxLevel = 5;
			const mockWhitelistSet: Map<string, Pick<RegularCharacter, 'ascii'>> = new Map([
				['a', { ascii: 'あ' }],
				['i', { ascii: 'い' }],
				// ['u', { ascii: 'う' }],
			]);

			const result = getJpltWords(mockWhitelistSet, maxLevel, mockWordLists, mockAsciiToCharacter);

			expect(result).toStrictEqual([
				expect.objectContaining({ meaning: 'word 5 with single form', ascii: ['あ'] }),
			]);
		});
	});
});
