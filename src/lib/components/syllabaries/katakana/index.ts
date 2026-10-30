import { KanaType, type Character } from '../../../../types';

import { charactersToAsciiMap } from '$lib/conversions/characters-to-ascii-map';
import type { RegularCharacter, SpecialCharacter } from '../../../../types/character';

import * as A from './seion/a.svelte';
import * as I from './seion/i.svelte';
import * as U from './seion/u.svelte';
import * as E from './seion/e.svelte';
import * as O from './seion/o.svelte';
import * as KA from './seion/ka.svelte';
import * as KI from './seion/ki.svelte';
import * as KU from './seion/ku.svelte';
import * as KE from './seion/ke.svelte';
import * as KO from './seion/ko.svelte';
import * as SA from './seion/sa.svelte';
import * as SHI from './seion/shi.svelte';
import * as SU from './seion/su.svelte';
import * as SE from './seion/se.svelte';
import * as SO from './seion/so.svelte';
import * as TA from './seion/ta.svelte';
import * as CHI from './seion/chi.svelte';
import * as TSU from './seion/tsu.svelte';
import * as TE from './seion/te.svelte';
import * as TO from './seion/to.svelte';
import * as NA from './seion/na.svelte';
import * as NI from './seion/ni.svelte';
import * as NU from './seion/nu.svelte';
import * as NE from './seion/ne.svelte';
import * as NO from './seion/no.svelte';
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
import * as GA from './dakuon/ga.svelte';
import * as GI from './dakuon/gi.svelte';
import * as GU from './dakuon/gu.svelte';
import * as GE from './dakuon/ge.svelte';
import * as GO from './dakuon/go.svelte';
import * as ZA from './dakuon/za.svelte';
import * as JI from './dakuon/ji.svelte';
import * as ZU from './dakuon/zu.svelte';
import * as ZE from './dakuon/ze.svelte';
import * as ZO from './dakuon/zo.svelte';
import * as DA from './dakuon/da.svelte';
import * as JI2 from './dakuon/ji2.svelte';
import * as ZU2 from './dakuon/zu2.svelte';
import * as DE from './dakuon/de.svelte';
import * as DO from './dakuon/do.svelte';
import * as BA from './dakuon/ba.svelte';
import * as BI from './dakuon/bi.svelte';
import * as BU from './dakuon/bu.svelte';
import * as BE from './dakuon/be.svelte';
import * as BO from './dakuon/bo.svelte';
import * as PA from './dakuon/pa.svelte';
import * as PI from './dakuon/pi.svelte';
import * as PU from './dakuon/pu.svelte';
import * as PE from './dakuon/pe.svelte';
import * as PO from './dakuon/po.svelte';

import * as YOON_YA from './yoon/yoon-ya.svelte';
import * as YOON_YU from './yoon/yoon-yu.svelte';
import * as YOON_YO from './yoon/yoon-yo.svelte';

import * as SOKUON from './sokuon.svelte';

const formatCharacter = <T extends Character<KanaType.KATAKANA>>(
	raw: {
		default: unknown;
	},
	id: T['id'],
	romanji: T['romanji'],
	nbStrokes: T['nbStrokes'],
	ascii: T['ascii'],
	type: T['type'] = 'regular'
): T => {
	return {
		id,
		component: raw.default as Character<KanaType>['component'],
		kanaType: KanaType.KATAKANA,
		type,
		nbStrokes,
		ascii,
		romanji,
	} as T;
};

export const katakana = {
	A: formatCharacter(A, 'A', 'a', 2, 'ア'),
	I: formatCharacter(I, 'I', 'i', 2, 'イ'),
	U: formatCharacter(U, 'U', 'u', 3, 'ウ'),
	E: formatCharacter(E, 'E', 'e', 3, 'エ'),
	O: formatCharacter(O, 'O', 'o', 3, 'オ'),
	KA: formatCharacter(KA, 'KA', 'ka', 2, 'カ'),
	KI: formatCharacter(KI, 'KI', 'ki', 3, 'キ'),
	KU: formatCharacter(KU, 'KU', 'ku', 2, 'ク'),
	KE: formatCharacter(KE, 'KE', 'ke', 3, 'ケ'),
	KO: formatCharacter(KO, 'KO', 'ko', 2, 'コ'),
	SA: formatCharacter(SA, 'SA', 'sa', 3, 'サ'),
	SHI: formatCharacter(SHI, 'SHI', 'shi', 3, 'シ'),
	SU: formatCharacter(SU, 'SU', 'su', 2, 'ス'),
	SE: formatCharacter(SE, 'SE', 'se', 2, 'セ'),
	SO: formatCharacter(SO, 'SO', 'so', 2, 'ソ'),
	TA: formatCharacter(TA, 'TA', 'ta', 3, 'タ'),
	CHI: formatCharacter(CHI, 'CHI', 'chi', 3, 'チ'),
	TSU: formatCharacter(TSU, 'TSU', 'tsu', 3, 'ツ'),
	TE: formatCharacter(TE, 'TE', 'te', 3, 'テ'),
	TO: formatCharacter(TO, 'TO', 'to', 2, 'ト'),
	NA: formatCharacter(NA, 'NA', 'na', 2, 'ナ'),
	NI: formatCharacter(NI, 'NI', 'ni', 2, 'ニ'),
	NU: formatCharacter(NU, 'NU', 'nu', 1, 'ヌ'),
	NE: formatCharacter(NE, 'NE', 'ne', 4, 'ネ'),
	NO: formatCharacter(NO, 'NO', 'no', 2, 'ノ'),
	HA: formatCharacter(HA, 'HA', 'ha', 2, 'ハ'),
	HI: formatCharacter(HI, 'HI', 'hi', 2, 'ヒ'),
	FU: formatCharacter(FU, 'FU', 'fu', 1, 'フ'),
	HE: formatCharacter(HE, 'HE', 'he', 1, 'ヘ'),
	HO: formatCharacter(HO, 'HO', 'ho', 4, 'ホ'),
	MA: formatCharacter(MA, 'MA', 'ma', 2, 'マ'),
	MI: formatCharacter(MI, 'MI', 'mi', 3, 'ミ'),
	MU: formatCharacter(MU, 'MU', 'mu', 2, 'ム'),
	ME: formatCharacter(ME, 'ME', 'me', 2, 'メ'),
	MO: formatCharacter(MO, 'MO', 'mo', 3, 'モ'),
	YA: formatCharacter(YA, 'YA', 'ya', 2, 'ヤ'),
	YU: formatCharacter(YU, 'YU', 'yu', 2, 'ユ'),
	YO: formatCharacter(YO, 'YO', 'yo', 3, 'ヨ'),
	RA: formatCharacter(RA, 'RA', 'ra', 2, 'ラ'),
	RI: formatCharacter(RI, 'RI', 'ri', 2, 'リ'),
	RU: formatCharacter(RU, 'RU', 'ru', 2, 'ル'),
	RE: formatCharacter(RE, 'RE', 're', 1, 'レ'),
	RO: formatCharacter(RO, 'RO', 'ro', 3, 'ロ'),
	WA: formatCharacter(WA, 'WA', 'wa', 2, 'ワ'),
	WO: formatCharacter(WO, 'WO', 'wo', 3, 'ヲ'),
	N: formatCharacter(N, 'N', 'n', 2, 'ン'),
	GA: formatCharacter(GA, 'GA', 'ga', 4, 'ガ'),
	GI: formatCharacter(GI, 'GI', 'gi', 5, 'ギ'),
	GU: formatCharacter(GU, 'GU', 'gu', 4, 'グ'),
	GE: formatCharacter(GE, 'GE', 'ge', 5, 'ゲ'),
	GO: formatCharacter(GO, 'GO', 'go', 0, 'ゴ'),
	ZA: formatCharacter(ZA, 'ZA', 'za', 5, 'ザ'),
	JI: formatCharacter(JI, 'JI', 'ji', 5, 'ジ'),
	ZU: formatCharacter(ZU, 'ZU', 'zu', 4, 'ズ'),
	ZE: formatCharacter(ZE, 'ZE', 'ze', 4, 'ゼ'),
	ZO: formatCharacter(ZO, 'ZO', 'zo', 0, 'ゾ'),
	DA: formatCharacter(DA, 'DA', 'da', 5, 'ダ'),
	JI2: formatCharacter(JI2, 'JI2', 'ji', 5, 'ヂ'),
	ZU2: formatCharacter(ZU2, 'ZU', 'zu', 5, 'ヅ'),
	DE: formatCharacter(DE, 'DE', 'de', 5, 'デ'),
	DO: formatCharacter(DO, 'DO', 'do', 4, 'ド'),
	BA: formatCharacter(BA, 'BA', 'ba', 4, 'バ'),
	BI: formatCharacter(BI, 'BI', 'bi', 4, 'ビ'),
	BU: formatCharacter(BU, 'BU', 'bu', 3, 'ブ'),
	BE: formatCharacter(BE, 'BE', 'be', 3, 'ベ'),
	BO: formatCharacter(BO, 'BO', 'bo', 6, 'ボ'),
	PA: formatCharacter(PA, 'PA', 'pa', 3, 'パ'),
	PI: formatCharacter(PI, 'PI', 'pi', 3, 'ピ'),
	PU: formatCharacter(PU, 'PU', 'pu', 2, 'プ'),
	PE: formatCharacter(PE, 'PE', 'pe', 2, 'ペ'),
	PO: formatCharacter(PO, 'PO', 'po', 5, 'ポ'),
} satisfies Record<RegularCharacter<KanaType.KATAKANA>['id'], RegularCharacter<KanaType.KATAKANA>>;

export const katakanaSpecials = {
	SOKUON: formatCharacter(SOKUON, 'SOKUON', null, 3, 'ッ', 'sokuon'),
	YOON_YA: formatCharacter(YOON_YA, 'YOON_YA', 'ya', 2, 'ャ', 'yoon'),
	YOON_YU: formatCharacter(YOON_YU, 'YOON_YU', 'yu', 2, 'ュ', 'yoon'),
	YOON_YO: formatCharacter(YOON_YO, 'YOON_YO', 'yo', 0, 'ョ', 'yoon'),
} satisfies Record<SpecialCharacter<KanaType.KATAKANA>['id'], SpecialCharacter<KanaType.KATAKANA>>;

export const katakanaByAscii = charactersToAsciiMap(Object.values(katakana));

export const isKatakanaKey = (key: string, obj: typeof katakana): key is keyof typeof katakana => {
	return key in obj;
};
