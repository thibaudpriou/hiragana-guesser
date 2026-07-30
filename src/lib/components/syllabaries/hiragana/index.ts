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
import { charactersToAsciiMap } from '$lib/conversions/characters-to-ascii-map';
import { SvelteMap } from 'svelte/reactivity';

const formatCharacter = (raw: { default: unknown }): Pick<Character, 'component'> => {
	return {
		component: raw.default as Character['component'],
	};
};

export const hiragana: Record<string, Character> = {
	A: {
		...formatCharacter(A),
		name: 'a',
		nbStrokes: 3,
		id: 'A',
		ascii: 'あ',
	},
	I: {
		...formatCharacter(I),
		name: 'i',
		nbStrokes: 2,
		id: 'I',
		ascii: 'い',
	},
	U: {
		...formatCharacter(U),
		name: 'u',
		nbStrokes: 2,
		id: 'U',
		ascii: 'う',
	},
	E: {
		...formatCharacter(E),
		name: 'e',
		nbStrokes: 2,
		id: 'E',
		ascii: 'え',
	},
	O: {
		...formatCharacter(O),
		name: 'o',
		nbStrokes: 3,
		id: 'O',
		ascii: 'お',
	},
	KA: {
		...formatCharacter(KA),
		name: 'ka',
		nbStrokes: 3,
		id: 'KA',
		ascii: 'か',
	},
	KI: {
		...formatCharacter(KI),
		name: 'ki',
		nbStrokes: 4,
		id: 'KI',
		ascii: 'き',
	},
	KU: {
		...formatCharacter(KU),
		name: 'ku',
		nbStrokes: 1,
		id: 'KU',
		ascii: 'く',
	},
	KE: {
		...formatCharacter(KE),
		name: 'ke',
		nbStrokes: 3,
		id: 'KE',
		ascii: 'け',
	},
	KO: {
		...formatCharacter(KO),
		name: 'ko',
		nbStrokes: 2,
		id: 'KO',
		ascii: 'こ',
	},
	SA: {
		...formatCharacter(SA),
		name: 'sa',
		nbStrokes: 3,
		id: 'SA',
		ascii: 'さ',
	},
	SHI: {
		...formatCharacter(SHI),
		name: 'shi',
		nbStrokes: 1,
		id: 'SHI',
		ascii: 'し',
	},
	SU: {
		...formatCharacter(SU),
		name: 'su',
		nbStrokes: 2,
		id: 'SU',
		ascii: 'す',
	},
	SE: {
		...formatCharacter(SE),
		name: 'se',
		nbStrokes: 3,
		id: 'SE',
		ascii: 'せ',
	},
	SO: {
		...formatCharacter(SO),
		name: 'so',
		nbStrokes: 1,
		id: 'SO',
		ascii: 'そ',
	},
	TA: {
		...formatCharacter(TA),
		name: 'ta',
		nbStrokes: 4,
		id: 'TA',
		ascii: 'た',
	},
	CHI: {
		...formatCharacter(CHI),
		name: 'chi',
		nbStrokes: 2,
		id: 'CHI',
		ascii: 'ち',
	},
	TSU: {
		...formatCharacter(TSU),
		name: 'tsu',
		nbStrokes: 1,
		id: 'TSU',
		ascii: 'つ',
	},
	TE: {
		...formatCharacter(TE),
		name: 'te',
		nbStrokes: 1,
		id: 'TE',
		ascii: 'て',
	},
	TO: {
		...formatCharacter(TO),
		name: 'to',
		nbStrokes: 2,
		id: 'TO',
		ascii: 'と',
	},
	NA: {
		...formatCharacter(NA),
		name: 'na',
		nbStrokes: 4,
		id: 'NA',
		ascii: 'な',
	},
	NI: {
		...formatCharacter(NI),
		name: 'ni',
		nbStrokes: 3,
		id: 'NI',
		ascii: 'に',
	},
	NU: {
		...formatCharacter(NU),
		name: 'nu',
		nbStrokes: 2,
		id: 'NU',
		ascii: 'ぬ',
	},
	NE: {
		...formatCharacter(NE),
		name: 'ne',
		nbStrokes: 2,
		id: 'NE',
		ascii: 'ね',
	},
	NO: {
		...formatCharacter(NO),
		name: 'no',
		nbStrokes: 1,
		id: 'NO',
		ascii: 'の',
	},
	HA: {
		...formatCharacter(HA),
		name: 'ha',
		nbStrokes: 3,
		id: 'HA',
		ascii: 'は',
	},
	HI: {
		...formatCharacter(HI),
		name: 'hi',
		nbStrokes: 1,
		id: 'HI',
		ascii: 'ひ',
	},
	FU: {
		...formatCharacter(FU),
		name: 'fu',
		nbStrokes: 4,
		id: 'FU',
		ascii: 'ふ',
	},
	HE: {
		...formatCharacter(HE),
		name: 'he',
		nbStrokes: 1,
		id: 'HE',
		ascii: 'へ',
	},
	HO: {
		...formatCharacter(HO),
		name: 'ho',
		nbStrokes: 5,
		id: 'HO',
		ascii: 'ほ',
	},
	MA: {
		...formatCharacter(MA),
		name: 'ma',
		nbStrokes: 3,
		id: 'MA',
		ascii: 'ま',
	},
	MI: {
		...formatCharacter(MI),
		name: 'mi',
		nbStrokes: 2,
		id: 'MI',
		ascii: 'み',
	},
	MU: {
		...formatCharacter(MU),
		name: 'mu',
		nbStrokes: 3,
		id: 'MU',
		ascii: 'む',
	},
	ME: {
		...formatCharacter(ME),
		name: 'me',
		nbStrokes: 2,
		id: 'ME',
		ascii: 'め',
	},
	MO: {
		...formatCharacter(MO),
		name: 'mo',
		nbStrokes: 3,
		id: 'MO',
		ascii: 'も',
	},
	YA: {
		...formatCharacter(YA),
		name: 'ya',
		nbStrokes: 3,
		id: 'YA',
		ascii: 'や',
	},
	YU: {
		...formatCharacter(YU),
		name: 'yu',
		nbStrokes: 2,
		id: 'YU',
		ascii: 'ゆ',
	},
	YO: {
		...formatCharacter(YO),
		name: 'yo',
		nbStrokes: 2,
		id: 'YO',
		ascii: 'よ',
	},

	RA: {
		...formatCharacter(RA),
		name: 'ra',
		nbStrokes: 2,
		id: 'RA',
		ascii: 'ら',
	},
	RI: {
		...formatCharacter(RI),
		name: 'ri',
		nbStrokes: 2,
		id: 'RI',
		ascii: 'り',
	},
	RU: {
		...formatCharacter(RU),
		name: 'ru',
		nbStrokes: 1,
		id: 'RU',
		ascii: 'る',
	},
	RE: {
		...formatCharacter(RE),
		name: 're',
		nbStrokes: 2,
		id: 'RE',
		ascii: 'れ',
	},
	RO: {
		...formatCharacter(RO),
		name: 'ro',
		nbStrokes: 1,
		id: 'RO',
		ascii: 'ろ',
	},
	// with gokuen
	DA: {
		...formatCharacter(DA),
		name: 'da',
		nbStrokes: 6,
		id: 'DA',
		ascii: 'だ',
	},
	JI2: {
		// "DI"
		...formatCharacter(JI2),
		name: 'ji',
		nbStrokes: 4,
		id: 'JI2',
		ascii: 'ぢ',
	},

	ZU2: {
		// "DU"
		...formatCharacter(ZU2),
		name: 'zu',
		nbStrokes: 3,
		id: 'ZU2',
		ascii: 'づ',
	},
	DE: {
		...formatCharacter(DE),
		name: 'de',
		nbStrokes: 3,
		id: 'DE',
		ascii: 'で',
	},
	DO: {
		...formatCharacter(DO),
		name: 'do',
		nbStrokes: 4,
		id: 'DO',
		ascii: 'ど',
	},
	GA: {
		...formatCharacter(GA),
		name: 'ga',
		nbStrokes: 5,
		id: 'GA',
		ascii: 'が',
	},
	GI: {
		...formatCharacter(GI),
		name: 'gi',
		nbStrokes: 6,
		id: 'GI',
		ascii: 'ぎ',
	},
	GU: {
		...formatCharacter(GU),
		name: 'gu',
		nbStrokes: 3,
		id: 'GU',
		ascii: 'ぐ',
	},
	GE: {
		...formatCharacter(GE),
		name: 'ge',
		nbStrokes: 5,
		id: 'GE',
		ascii: 'げ',
	},
	GO: {
		...formatCharacter(GO),
		name: 'go',
		nbStrokes: 4,
		id: 'GO',
		ascii: 'ご',
	},
	JI: {
		...formatCharacter(JI),
		name: 'ji',
		nbStrokes: 3,
		id: 'JI',
		ascii: 'じ',
	},
	ZA: {
		...formatCharacter(ZA),
		name: 'za',
		nbStrokes: 5,
		id: 'ZA',
		ascii: 'ざ',
	},
	ZE: {
		...formatCharacter(ZE),
		name: 'ze',
		nbStrokes: 5,
		id: 'ZE',
		ascii: 'ぜ',
	},
	ZO: {
		...formatCharacter(ZO),
		name: 'zo',
		nbStrokes: 3,
		id: 'ZO',
		ascii: 'ぞ',
	},
	ZU: {
		...formatCharacter(ZU),
		name: 'zu',
		nbStrokes: 4,
		id: 'ZU',
		ascii: 'ず',
	},
} as const;

const hiraganaById = new SvelteMap(Object.entries(hiragana));
export const hiraganaByAscii = charactersToAsciiMap(hiraganaById);
