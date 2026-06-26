import type { Character } from '../../../types';
import { hiragana } from './hiragana';

export const hiraganaCharacters: Character[] = [
	[hiragana.A, hiragana.I, hiragana.U, hiragana.E, hiragana.O],
	[hiragana.KA, hiragana.KI, hiragana.KU, hiragana.KE, hiragana.KO],
	[hiragana.GA, hiragana.GI, hiragana.GU, hiragana.GE, hiragana.GO],
	[hiragana.SA, hiragana.SHI, hiragana.SU, hiragana.SE, hiragana.SO],
	[hiragana.ZA, hiragana.JI, hiragana.ZU, hiragana.ZE, hiragana.ZO],
	[hiragana.TA, hiragana.CHI, hiragana.TSU, hiragana.TE, hiragana.TO],
	[hiragana.DA, hiragana.JI2, hiragana.ZU2, hiragana.DE, hiragana.DO],
	[hiragana.NA, hiragana.NE, hiragana.NU, hiragana.NI, hiragana.NO]
].flat();
