import { KanaType, type Character } from '../../../../types';
import * as A from './seion/a.svelte';
import * as CHI from './seion/chi.svelte';
import * as DA from './dakuon/da.svelte';
import * as DE from './dakuon/de.svelte';
import * as DO from './dakuon/do.svelte';
import * as E from './seion/e.svelte';
import * as GA from './dakuon/ga.svelte';
import * as GE from './dakuon/ge.svelte';
import * as GI from './dakuon/gi.svelte';
import * as GO from './dakuon/go.svelte';
import * as GU from './dakuon/gu.svelte';
import * as I from './seion/i.svelte';
import * as JI from './dakuon/ji.svelte';
import * as JI2 from './dakuon/ji2.svelte';
import * as KA from './seion/ka.svelte';
import * as KE from './seion/ke.svelte';
import * as KI from './seion/ki.svelte';
import * as KO from './seion/ko.svelte';
import * as KU from './seion/ku.svelte';
import * as NA from './seion/na.svelte';
import * as NE from './seion/ne.svelte';
import * as NI from './seion/ni.svelte';
import * as NO from './seion/no.svelte';
import * as NU from './seion/nu.svelte';
import * as O from './seion/o.svelte';
import * as SA from './seion/sa.svelte';
import * as SE from './seion/se.svelte';
import * as SHI from './seion/shi.svelte';
import * as SO from './seion/so.svelte';
import * as SU from './seion/su.svelte';
import * as TA from './seion/ta.svelte';
import * as TE from './seion/te.svelte';
import * as TO from './seion/to.svelte';
import * as TSU from './seion/tsu.svelte';
import * as U from './seion/u.svelte';
import * as ZA from './dakuon/za.svelte';
import * as ZE from './dakuon/ze.svelte';
import * as ZO from './dakuon/zo.svelte';
import * as ZU from './dakuon/zu.svelte';
import * as ZU2 from './dakuon/zu2.svelte';
import * as HA from './seion/ha.svelte';
import * as HI from './seion/hi.svelte';
import * as FU from './seion/fu.svelte';
import * as HE from './seion/he.svelte';
import * as HO from './seion/ho.svelte';
import * as MA from './seion/ma.svelte';
import * as MI from './seion/mi.svelte';
import * as MU from './seion/mu.svelte';
import * as ME from './seion/me.svelte';
import * as MO from './seion/mo.svelte';
import * as YA from './seion/ya.svelte';
import * as YU from './seion/yu.svelte';
import * as YO from './seion/yo.svelte';
import * as RA from './seion/ra.svelte';
import * as RI from './seion/ri.svelte';
import * as RU from './seion/ru.svelte';
import * as RE from './seion/re.svelte';
import * as RO from './seion/ro.svelte';
import * as WA from './seion/wa.svelte';
import * as WO from './seion/wo.svelte';
import * as N from './seion/n.svelte';
import * as BA from './dakuon/ba.svelte';
import * as BE from './dakuon/be.svelte';
import * as BI from './dakuon/bi.svelte';
import * as BO from './dakuon/bo.svelte';
import * as BU from './dakuon/bu.svelte';
import * as PA from './dakuon/pa.svelte';
import * as PE from './dakuon/pe.svelte';
import * as PI from './dakuon/pi.svelte';
import * as PO from './dakuon/po.svelte';
import * as PU from './dakuon/pu.svelte';
import * as SOKUON from './sokuon.svelte';
import * as YOON_YA from './yoon/yoon-ya.svelte';
import * as YOON_YU from './yoon/yoon-yu.svelte';
import * as YOON_YO from './yoon/yoon-yo.svelte';
import { charactersToAsciiMap } from '$lib/conversions/characters-to-ascii-map';
import type { RegularCharacter, SpecialCharacter } from '../../../../types/character';

const formatCharacter = (raw: {
	default: unknown;
}): Pick<RegularCharacter<KanaType.HIRAGANA>, 'component' | 'type' | 'kanaType'> => {
	return {
		component: raw.default as Character<KanaType>['component'],
		kanaType: KanaType.HIRAGANA,
		type: 'regular',
	};
};

export const hiragana = {
	A: {
		...formatCharacter(A),
		romanji: 'a',
		nbStrokes: 3,
		id: 'A',
		ascii: 'あ',
	},
	I: {
		...formatCharacter(I),
		romanji: 'i',
		nbStrokes: 2,
		id: 'I',
		ascii: 'い',
	},
	U: {
		...formatCharacter(U),
		romanji: 'u',
		nbStrokes: 2,
		id: 'U',
		ascii: 'う',
	},
	E: {
		...formatCharacter(E),
		romanji: 'e',
		nbStrokes: 2,
		id: 'E',
		ascii: 'え',
	},
	O: {
		...formatCharacter(O),
		romanji: 'o',
		nbStrokes: 3,
		id: 'O',
		ascii: 'お',
	},
	KA: {
		...formatCharacter(KA),
		romanji: 'ka',
		nbStrokes: 3,
		id: 'KA',
		ascii: 'か',
	},
	KI: {
		...formatCharacter(KI),
		romanji: 'ki',
		nbStrokes: 4,
		id: 'KI',
		ascii: 'き',
	},
	KU: {
		...formatCharacter(KU),
		romanji: 'ku',
		nbStrokes: 1,
		id: 'KU',
		ascii: 'く',
	},
	KE: {
		...formatCharacter(KE),
		romanji: 'ke',
		nbStrokes: 3,
		id: 'KE',
		ascii: 'け',
	},
	KO: {
		...formatCharacter(KO),
		romanji: 'ko',
		nbStrokes: 2,
		id: 'KO',
		ascii: 'こ',
	},
	SA: {
		...formatCharacter(SA),
		romanji: 'sa',
		nbStrokes: 3,
		id: 'SA',
		ascii: 'さ',
	},
	SHI: {
		...formatCharacter(SHI),
		romanji: 'shi',
		nbStrokes: 1,
		id: 'SHI',
		ascii: 'し',
	},
	SU: {
		...formatCharacter(SU),
		romanji: 'su',
		nbStrokes: 2,
		id: 'SU',
		ascii: 'す',
	},
	SE: {
		...formatCharacter(SE),
		romanji: 'se',
		nbStrokes: 3,
		id: 'SE',
		ascii: 'せ',
	},
	SO: {
		...formatCharacter(SO),
		romanji: 'so',
		nbStrokes: 1,
		id: 'SO',
		ascii: 'そ',
	},
	TA: {
		...formatCharacter(TA),
		romanji: 'ta',
		nbStrokes: 4,
		id: 'TA',
		ascii: 'た',
	},
	CHI: {
		...formatCharacter(CHI),
		romanji: 'chi',
		nbStrokes: 2,
		id: 'CHI',
		ascii: 'ち',
	},
	TSU: {
		...formatCharacter(TSU),
		romanji: 'tsu',
		nbStrokes: 1,
		id: 'TSU',
		ascii: 'つ',
	},
	TE: {
		...formatCharacter(TE),
		romanji: 'te',
		nbStrokes: 1,
		id: 'TE',
		ascii: 'て',
	},
	TO: {
		...formatCharacter(TO),
		romanji: 'to',
		nbStrokes: 2,
		id: 'TO',
		ascii: 'と',
	},
	NA: {
		...formatCharacter(NA),
		romanji: 'na',
		nbStrokes: 4,
		id: 'NA',
		ascii: 'な',
	},
	NI: {
		...formatCharacter(NI),
		romanji: 'ni',
		nbStrokes: 3,
		id: 'NI',
		ascii: 'に',
	},
	NU: {
		...formatCharacter(NU),
		romanji: 'nu',
		nbStrokes: 2,
		id: 'NU',
		ascii: 'ぬ',
	},
	NE: {
		...formatCharacter(NE),
		romanji: 'ne',
		nbStrokes: 2,
		id: 'NE',
		ascii: 'ね',
	},
	NO: {
		...formatCharacter(NO),
		romanji: 'no',
		nbStrokes: 1,
		id: 'NO',
		ascii: 'の',
	},
	HA: {
		...formatCharacter(HA),
		/* NOTE: can also be pronounced "wa" when used as a topic marker */
		romanji: 'ha',
		nbStrokes: 3,
		id: 'HA',
		ascii: 'は',
	},
	HI: {
		...formatCharacter(HI),
		romanji: 'hi',
		nbStrokes: 1,
		id: 'HI',
		ascii: 'ひ',
	},
	FU: {
		...formatCharacter(FU),
		romanji: 'fu',
		nbStrokes: 4,
		id: 'FU',
		ascii: 'ふ',
	},
	HE: {
		...formatCharacter(HE),
		romanji: 'he',
		nbStrokes: 1,
		id: 'HE',
		ascii: 'へ',
	},
	HO: {
		...formatCharacter(HO),
		romanji: 'ho',
		nbStrokes: 5,
		id: 'HO',
		ascii: 'ほ',
	},
	MA: {
		...formatCharacter(MA),
		romanji: 'ma',
		nbStrokes: 3,
		id: 'MA',
		ascii: 'ま',
	},
	MI: {
		...formatCharacter(MI),
		romanji: 'mi',
		nbStrokes: 2,
		id: 'MI',
		ascii: 'み',
	},
	MU: {
		...formatCharacter(MU),
		romanji: 'mu',
		nbStrokes: 3,
		id: 'MU',
		ascii: 'む',
	},
	ME: {
		...formatCharacter(ME),
		romanji: 'me',
		nbStrokes: 2,
		id: 'ME',
		ascii: 'め',
	},
	MO: {
		...formatCharacter(MO),
		romanji: 'mo',
		nbStrokes: 3,
		id: 'MO',
		ascii: 'も',
	},
	YA: {
		...formatCharacter(YA),
		romanji: 'ya',
		nbStrokes: 3,
		id: 'YA',
		ascii: 'や',
	},
	YU: {
		...formatCharacter(YU),
		romanji: 'yu',
		nbStrokes: 2,
		id: 'YU',
		ascii: 'ゆ',
	},
	YO: {
		...formatCharacter(YO),
		romanji: 'yo',
		nbStrokes: 2,
		id: 'YO',
		ascii: 'よ',
	},

	RA: {
		...formatCharacter(RA),
		romanji: 'ra',
		nbStrokes: 2,
		id: 'RA',
		ascii: 'ら',
	},
	RI: {
		...formatCharacter(RI),
		romanji: 'ri',
		nbStrokes: 2,
		id: 'RI',
		ascii: 'り',
	},
	RU: {
		...formatCharacter(RU),
		romanji: 'ru',
		nbStrokes: 1,
		id: 'RU',
		ascii: 'る',
	},
	RE: {
		...formatCharacter(RE),
		romanji: 're',
		nbStrokes: 2,
		id: 'RE',
		ascii: 'れ',
	},
	RO: {
		...formatCharacter(RO),
		romanji: 'ro',
		nbStrokes: 1,
		id: 'RO',
		ascii: 'ろ',
	},
	WA: {
		...formatCharacter(WA),
		romanji: 'wa',
		nbStrokes: 2,
		id: 'WA',
		ascii: 'わ',
	},
	WO: {
		...formatCharacter(WO),
		romanji: 'wo',
		nbStrokes: 3,
		id: 'WO',
		ascii: 'を',
	},
	N: {
		...formatCharacter(N),
		romanji: 'n',
		nbStrokes: 1,
		id: 'N',
		ascii: 'ん',
	},
	// with gokuen
	DA: {
		...formatCharacter(DA),
		romanji: 'da',
		nbStrokes: 6,
		id: 'DA',
		ascii: 'だ',
	},
	JI2: {
		// "DI"
		...formatCharacter(JI2),
		romanji: 'ji',
		nbStrokes: 4,
		id: 'JI2',
		ascii: 'ぢ',
	},

	ZU2: {
		// "DU"
		...formatCharacter(ZU2),
		romanji: 'zu',
		nbStrokes: 3,
		id: 'ZU2',
		ascii: 'づ',
	},
	DE: {
		...formatCharacter(DE),
		romanji: 'de',
		nbStrokes: 3,
		id: 'DE',
		ascii: 'で',
	},
	DO: {
		...formatCharacter(DO),
		romanji: 'do',
		nbStrokes: 4,
		id: 'DO',
		ascii: 'ど',
	},
	GA: {
		...formatCharacter(GA),
		romanji: 'ga',
		nbStrokes: 5,
		id: 'GA',
		ascii: 'が',
	},
	GI: {
		...formatCharacter(GI),
		romanji: 'gi',
		nbStrokes: 6,
		id: 'GI',
		ascii: 'ぎ',
	},
	GU: {
		...formatCharacter(GU),
		romanji: 'gu',
		nbStrokes: 3,
		id: 'GU',
		ascii: 'ぐ',
	},
	GE: {
		...formatCharacter(GE),
		romanji: 'ge',
		nbStrokes: 5,
		id: 'GE',
		ascii: 'げ',
	},
	GO: {
		...formatCharacter(GO),
		romanji: 'go',
		nbStrokes: 4,
		id: 'GO',
		ascii: 'ご',
	},
	JI: {
		...formatCharacter(JI),
		romanji: 'ji',
		nbStrokes: 3,
		id: 'JI',
		ascii: 'じ',
	},
	ZA: {
		...formatCharacter(ZA),
		romanji: 'za',
		nbStrokes: 5,
		id: 'ZA',
		ascii: 'ざ',
	},
	ZE: {
		...formatCharacter(ZE),
		romanji: 'ze',
		nbStrokes: 5,
		id: 'ZE',
		ascii: 'ぜ',
	},
	ZO: {
		...formatCharacter(ZO),
		romanji: 'zo',
		nbStrokes: 3,
		id: 'ZO',
		ascii: 'ぞ',
	},
	ZU: {
		...formatCharacter(ZU),
		romanji: 'zu',
		nbStrokes: 4,
		id: 'ZU',
		ascii: 'ず',
	},
	BA: {
		...formatCharacter(BA),
		romanji: 'ba',
		nbStrokes: 5,
		id: 'BA',
		ascii: 'ば',
	},
	BI: {
		...formatCharacter(BI),
		romanji: 'bi',
		nbStrokes: 3,
		id: 'BI',
		ascii: 'び',
	},
	BU: {
		...formatCharacter(BU),
		romanji: 'bu',
		nbStrokes: 6,
		id: 'BU',
		ascii: 'ぶ',
	},
	BE: {
		...formatCharacter(BE),
		romanji: 'be',
		nbStrokes: 3,
		id: 'BE',
		ascii: 'べ',
	},
	BO: {
		...formatCharacter(BO),
		romanji: 'bo',
		nbStrokes: 6,
		id: 'BO',
		ascii: 'ぼ',
	},
	PA: {
		...formatCharacter(PA),
		romanji: 'pa',
		nbStrokes: 4,
		id: 'PA',
		ascii: 'ぱ',
	},
	PI: {
		...formatCharacter(PI),
		romanji: 'pi',
		nbStrokes: 2,
		id: 'PI',
		ascii: 'ぴ',
	},
	PU: {
		...formatCharacter(PU),
		romanji: 'pu',
		nbStrokes: 5,
		id: 'PU',
		ascii: 'ぷ',
	},
	PE: {
		...formatCharacter(PE),
		romanji: 'pe',
		nbStrokes: 2,
		id: 'PE',
		ascii: 'ぺ',
	},
	PO: {
		...formatCharacter(PO),
		romanji: 'po',
		nbStrokes: 5,
		id: 'PO',
		ascii: 'ぽ',
	},
} satisfies Record<RegularCharacter<KanaType.HIRAGANA>['id'], RegularCharacter<KanaType.HIRAGANA>>;

export const hiraganaSpecials = {
	SOKUON: {
		...formatCharacter(SOKUON),
		romanji: null,
		nbStrokes: 1,
		id: 'SPECIAL_SOKUON',
		ascii: 'っ',
		type: 'sokuon',
	},
	YOON_YA: {
		...formatCharacter(YOON_YA),
		romanji: 'ya',
		nbStrokes: 3,
		id: 'YOON_YA',
		ascii: 'ゃ',
		type: 'yoon',
	},
	YOON_YU: {
		...formatCharacter(YOON_YU),
		romanji: 'yu',
		nbStrokes: 2,
		id: 'YOON_YU',
		ascii: 'ゅ',
		type: 'yoon',
	},
	YOON_YO: {
		...formatCharacter(YOON_YO),
		romanji: 'yo',
		nbStrokes: 2,
		id: 'YOON_YO',
		ascii: 'ょ',
		type: 'yoon',
	},
} satisfies Record<SpecialCharacter<KanaType.HIRAGANA>['id'], SpecialCharacter<KanaType.HIRAGANA>>;

export const hiraganaByAscii = charactersToAsciiMap([
	...Object.values(hiragana),
	...Object.values(hiraganaSpecials),
]);

export const isHiraganaKey = (key: string, obj: typeof hiragana): key is keyof typeof hiragana => {
	return key in obj;
};
