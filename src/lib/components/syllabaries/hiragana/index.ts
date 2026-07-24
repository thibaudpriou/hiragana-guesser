import type { Character } from '../../../../types';
import * as A from './a.svelte';
import * as CHI from './chi.svelte';
import * as DA from './da.svelte';
import * as DE from './de.svelte';
import * as DO from './do.svelte';
import * as E from './e.svelte';
import * as GA from './ga.svelte';
import * as GE from './ge.svelte';
import * as GI from './gi.svelte';
import * as GO from './go.svelte';
import * as GU from './gu.svelte';
import * as I from './i.svelte';
import * as JI from './ji.svelte';
import * as JI2 from './ji2.svelte';
import * as KA from './ka.svelte';
import * as KE from './ke.svelte';
import * as KI from './ki.svelte';
import * as KO from './ko.svelte';
import * as KU from './ku.svelte';
import * as NA from './na.svelte';
import * as NE from './ne.svelte';
import * as NI from './ni.svelte';
import * as NO from './no.svelte';
import * as NU from './nu.svelte';
import * as O from './o.svelte';
import * as SA from './sa.svelte';
import * as SE from './se.svelte';
import * as SHI from './shi.svelte';
import * as SO from './so.svelte';
import * as SU from './su.svelte';
import * as TA from './ta.svelte';
import * as TE from './te.svelte';
import * as TO from './to.svelte';
import * as TSU from './tsu.svelte';
import * as U from './u.svelte';
import * as ZA from './za.svelte';
import * as ZE from './ze.svelte';
import * as ZO from './zo.svelte';
import * as ZU from './zu.svelte';
import * as ZU2 from './zu2.svelte';
import * as HA from './ha.svelte';
import * as HI from './hi.svelte';
import * as FU from './fu.svelte';
import * as HE from './he.svelte';
import * as HO from './ho.svelte';
import * as MA from './ma.svelte';
import * as MI from './mi.svelte';
import * as MU from './mu.svelte';
import * as ME from './me.svelte';
import * as MO from './mo.svelte';
import * as YA from './ya.svelte';
import * as YU from './yu.svelte';
import * as YO from './yo.svelte';
import * as RA from './ra.svelte';
import * as RI from './ri.svelte';
import * as RU from './ru.svelte';
import * as RE from './re.svelte';
import * as RO from './ro.svelte';
import { charactersToMap } from '$lib/conversions/characters-to-map';

const formatCharacter = (raw: {
	NAME: string;
	NB_STROKES: number;
	default: unknown;
}): Pick<Character, 'nbStrokes' | 'component' | 'name'> => {
	return {
		name: raw.NAME,
		nbStrokes: raw.NB_STROKES,
		component: raw.default as Character['component'],
	};
};

export const hiragana: Record<string, Character> = {
	A: {
		...formatCharacter(A),
		id: 'A',
		ascii: 'あ',
	},
	I: {
		...formatCharacter(I),
		id: 'I',
		ascii: 'い',
	},
	U: {
		...formatCharacter(U),
		id: 'U',
		ascii: 'う',
	},
	E: {
		...formatCharacter(E),
		id: 'E',
		ascii: 'え',
	},
	O: {
		...formatCharacter(O),
		id: 'O',
		ascii: 'お',
	},
	KA: {
		...formatCharacter(KA),
		id: 'KA',
		ascii: 'か',
	},
	KI: {
		...formatCharacter(KI),
		id: 'KI',
		ascii: 'き',
	},
	KU: {
		...formatCharacter(KU),
		id: 'KU',
		ascii: 'く',
	},
	KE: {
		...formatCharacter(KE),
		id: 'KE',
		ascii: 'け',
	},
	KO: {
		...formatCharacter(KO),
		id: 'KO',
		ascii: 'こ',
	},
	SA: {
		...formatCharacter(SA),
		id: 'SA',
		ascii: 'さ',
	},
	SHI: {
		...formatCharacter(SHI),
		id: 'SHI',
		ascii: 'し',
	},
	SU: {
		...formatCharacter(SU),
		id: 'SU',
		ascii: 'す',
	},
	SE: {
		...formatCharacter(SE),
		id: 'SE',
		ascii: 'せ',
	},
	SO: {
		...formatCharacter(SO),
		id: 'SO',
		ascii: 'そ',
	},
	TA: {
		...formatCharacter(TA),
		id: 'TA',
		ascii: 'た',
	},
	CHI: {
		...formatCharacter(CHI),
		id: 'CHI',
		ascii: 'ち',
	},
	TSU: {
		...formatCharacter(TSU),
		id: 'TSU',
		ascii: 'つ',
	},
	TE: {
		...formatCharacter(TE),
		id: 'TE',
		ascii: 'て',
	},
	TO: {
		...formatCharacter(TO),
		id: 'TO',
		ascii: 'と',
	},
	NA: {
		...formatCharacter(NA),
		id: 'NA',
		ascii: 'な',
	},
	NI: {
		...formatCharacter(NI),
		id: 'NI',
		ascii: 'に',
	},
	NU: {
		...formatCharacter(NU),
		id: 'NU',
		ascii: 'ぬ',
	},
	NE: {
		...formatCharacter(NE),
		id: 'NE',
		ascii: 'ね',
	},
	NO: {
		...formatCharacter(NO),
		id: 'NO',
		ascii: 'の',
	},
	HA: {
		...formatCharacter(HA),
		id: 'HA',
		ascii: 'は',
	},
	HI: {
		...formatCharacter(HI),
		id: 'HI',
		ascii: 'ひ',
	},
	FU: {
		...formatCharacter(FU),
		id: 'FU',
		ascii: 'ふ',
	},
	HE: {
		...formatCharacter(HE),
		id: 'HE',
		ascii: 'へ',
	},
	HO: {
		...formatCharacter(HO),
		id: 'HO',
		ascii: 'ほ',
	},
	MA: {
		...formatCharacter(MA),
		id: 'MA',
		ascii: 'ま',
	},
	MI: {
		...formatCharacter(MI),
		id: 'MI',
		ascii: 'み',
	},
	MU: {
		...formatCharacter(MU),
		id: 'MU',
		ascii: 'む',
	},
	ME: {
		...formatCharacter(ME),
		id: 'ME',
		ascii: 'め',
	},
	MO: {
		...formatCharacter(MO),
		id: 'MO',
		ascii: 'も',
	},
	YA: {
		...formatCharacter(YA),
		id: 'YA',
		ascii: 'や',
	},
	YU: {
		...formatCharacter(YU),
		id: 'YU',
		ascii: 'ゆ',
	},
	YO: {
		...formatCharacter(YO),
		id: 'YO',
		ascii: 'よ',
	},

	RA: {
		...formatCharacter(RA),
		id: 'RA',
		ascii: 'ら',
	},
	RI: {
		...formatCharacter(RI),
		id: 'RI',
		ascii: 'り',
	},
	RU: {
		...formatCharacter(RU),
		id: 'RU',
		ascii: 'る',
	},
	RE: {
		...formatCharacter(RE),
		id: 'RE',
		ascii: 'れ',
	},
	RO: {
		...formatCharacter(RO),
		id: 'RO',
		ascii: 'ろ',
	},
	// with gokuen
	DA: {
		...formatCharacter(DA),
		id: 'DA',
		ascii: 'だ',
	},
	JI2: {
		// "DI"
		...formatCharacter(JI2),
		id: 'JI2',
		ascii: 'ぢ',
	},
	DE: {
		...formatCharacter(DE),
		id: 'DE',
		ascii: 'で',
	},
	DO: {
		...formatCharacter(DO),
		id: 'DO',
		ascii: 'ど',
	},
	GA: {
		...formatCharacter(GA),
		id: 'GA',
		ascii: 'が',
	},
	GI: {
		...formatCharacter(GI),
		id: 'GI',
		ascii: 'ぎ',
	},
	GU: {
		...formatCharacter(GU),
		id: 'GU',
		ascii: 'ぐ',
	},
	GE: {
		...formatCharacter(GE),
		id: 'GE',
		ascii: 'げ',
	},
	GO: {
		...formatCharacter(GO),
		id: 'GO',
		ascii: 'ご',
	},
	JI: {
		...formatCharacter(JI),
		id: 'JI',
		ascii: 'じ',
	},
	ZA: {
		...formatCharacter(ZA),
		id: 'ZA',
		ascii: 'ざ',
	},
	ZE: {
		...formatCharacter(ZE),
		id: 'ZE',
		ascii: 'ぜ',
	},
	ZO: {
		...formatCharacter(ZO),
		id: 'ZO',
		ascii: 'ぞ',
	},
	ZU: {
		...formatCharacter(ZU),
		id: 'ZU',
		ascii: 'ず',
	},
	ZU2: {
		// tsu + gakuen
		...formatCharacter(ZU2),
		id: 'ZU2',
		ascii: 'づ',
	},
} as const;

export const hiraganaByAscii = charactersToMap(Object.values(hiragana));
