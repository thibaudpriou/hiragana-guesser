export type JPLT_LEVEL = 5 | 4 | 3 | 2 | 1;

export type WordCsvRow = {
	expression: string; // kanji
	guid: string; // string
	meaning: string; // english translation
	reading: string; // hiragana (or katana)
	tags: string; // list of tags, separated by space char
};
