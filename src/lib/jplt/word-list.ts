import n5 from './assets/n5.csv';
import n4 from './assets/n4.csv';
import n3 from './assets/n3.csv';
import n2 from './assets/n2.csv';
import n1 from './assets/n1.csv';
import type { JPLT_LEVEL, WordCsvRow } from '../../types/jplt';

export const wordList: Record<JPLT_LEVEL, WordCsvRow[]> = {
	1: n1,
	2: n2,
	3: n3,
	4: n4,
	5: n5,
};
