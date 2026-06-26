import type { Character } from '../../../types';
import {
	A,
	CHI,
	DA,
	DE,
	DO,
	E,
	GA,
	GE,
	GI,
	GO,
	GU,
	I,
	JI,
	JI2,
	KA,
	KE,
	KI,
	KO,
	KU,
	NA,
	NE,
	NI,
	NO,
	NU,
	O,
	SA,
	SE,
	SHI,
	SO,
	SU,
	TA,
	TE,
	TO,
	TSU,
	U,
	ZA,
	ZE,
	ZO,
	ZU,
	ZU2
} from './hiragana';

export const hiraganaCharacters: Character[] = [
	[A, I, U, E, O],
	[KA, KI, KU, KE, KO],
	[GA, GI, GU, GE, GO],
	[SA, SHI, SU, SE, SO],
	[ZA, JI, ZU, ZE, ZO],
	[TA, CHI, TSU, TE, TO],
	[DA, JI2, ZU2, DE, DO],
	[NA, NE, NU, NI, NO]
].flatMap((mArr) =>
	mArr.map(
		(m): Character => ({
			name: m.NAME,
			component: m.default as Character['component'],
			strokes: m.NB_STROKES
		})
	)
);
