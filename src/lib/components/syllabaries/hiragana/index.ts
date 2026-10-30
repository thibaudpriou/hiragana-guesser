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

const formatCharacter = <T extends Character<KanaType.HIRAGANA>>(
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
		kanaType: KanaType.HIRAGANA,
		type,
		nbStrokes,
		ascii,
		romanji,
	} as T;
};

export const hiragana = {
	A: formatCharacter(A, 'A', 'a', 3, 'あ'),
	I: formatCharacter(I, 'I', 'i', 2, 'い'),
	U: formatCharacter(U, 'U', 'u', 2, 'う'),
	E: formatCharacter(E, 'E', 'e', 2, 'え'),
	O: formatCharacter(O, 'O', 'o', 3, 'お'),
	KA: formatCharacter(KA, 'KA', 'ka', 3, 'か'),
	KI: formatCharacter(KI, 'KI', 'ki', 4, 'き'),
	KU: formatCharacter(KU, 'KU', 'ku', 1, 'く'),
	KE: formatCharacter(KE, 'KE', 'ke', 3, 'け'),
	KO: formatCharacter(KO, 'KO', 'ko', 2, 'こ'),
	SA: formatCharacter(SA, 'SA', 'sa', 3, 'さ'),
	SHI: formatCharacter(SHI, 'SHI', 'shi', 1, 'し'),
	SU: formatCharacter(SU, 'SU', 'su', 2, 'す'),
	SE: formatCharacter(SE, 'SE', 'se', 3, 'せ'),
	SO: formatCharacter(SO, 'SO', 'so', 1, 'そ'),
	TA: formatCharacter(TA, 'TA', 'ta', 4, 'た'),
	CHI: formatCharacter(CHI, 'CHI', 'chi', 2, 'ち'),
	TSU: formatCharacter(TSU, 'TSU', 'tsu', 1, 'つ'),
	TE: formatCharacter(TE, 'TE', 'te', 1, 'て'),
	TO: formatCharacter(TO, 'TO', 'to', 2, 'と'),
	NA: formatCharacter(NA, 'NA', 'na', 4, 'な'),
	NI: formatCharacter(NI, 'NI', 'ni', 3, 'に'),
	NU: formatCharacter(NU, 'NU', 'nu', 2, 'ぬ'),
	NE: formatCharacter(NE, 'NE', 'ne', 2, 'ね'),
	NO: formatCharacter(NO, 'NO', 'no', 1, 'の'),
	/* NOTE: can also be pronounced "wa" when used as a topic marker */
	HA: formatCharacter(HA, 'HA', 'ha', 3, 'は'),
	HI: formatCharacter(HI, 'HI', 'hi', 1, 'ひ'),
	FU: formatCharacter(FU, 'FU', 'fu', 4, 'ふ'),
	HE: formatCharacter(HE, 'HE', 'he', 1, 'へ'),
	HO: formatCharacter(HO, 'HO', 'ho', 5, 'ほ'),
	MA: formatCharacter(MA, 'MA', 'ma', 3, 'ま'),
	MI: formatCharacter(MI, 'MI', 'mi', 2, 'み'),
	MU: formatCharacter(MU, 'MU', 'mu', 3, 'む'),
	ME: formatCharacter(ME, 'ME', 'me', 2, 'め'),
	MO: formatCharacter(MO, 'MO', 'mo', 3, 'も'),
	YA: formatCharacter(YA, 'YA', 'ya', 3, 'や'),
	YU: formatCharacter(YU, 'YU', 'yu', 2, 'ゆ'),
	YO: formatCharacter(YO, 'YO', 'yo', 2, 'よ'),
	RA: formatCharacter(RA, 'RA', 'ra', 2, 'ら'),
	RI: formatCharacter(RI, 'RI', 'ri', 2, 'り'),
	RU: formatCharacter(RU, 'RU', 'ru', 1, 'る'),
	RE: formatCharacter(RE, 'RE', 're', 2, 'れ'),
	RO: formatCharacter(RO, 'RO', 'ro', 1, 'ろ'),
	WA: formatCharacter(WA, 'WA', 'wa', 2, 'わ'),
	WO: formatCharacter(WO, 'WO', 'wo', 3, 'を'),
	N: formatCharacter(N, 'N', 'n', 1, 'ん'),

	/** with gokuen */
	GA: formatCharacter(GA, 'GA', 'ga', 5, 'が'),
	GI: formatCharacter(GI, 'GI', 'gi', 6, 'ぎ'),
	GU: formatCharacter(GU, 'GU', 'gu', 3, 'ぐ'),
	GE: formatCharacter(GE, 'GE', 'ge', 5, 'げ'),
	GO: formatCharacter(GO, 'GO', 'go', 4, 'ご'),
	ZA: formatCharacter(ZA, 'ZA', 'za', 5, 'ざ'),
	JI: formatCharacter(JI, 'JI', 'ji', 3, 'じ'),
	ZE: formatCharacter(ZE, 'ZE', 'ze', 5, 'ぜ'),
	ZO: formatCharacter(ZO, 'ZO', 'zo', 3, 'ぞ'),
	ZU: formatCharacter(ZU, 'ZU', 'zu', 4, 'ず'),
	DA: formatCharacter(DA, 'DA', 'da', 6, 'だ'),
	JI2: formatCharacter(JI2, 'JI2', 'ji', 4, 'ぢ'), // "DI"
	ZU2: formatCharacter(ZU2, 'ZU2', 'zu', 3, 'づ'), // "DU"
	DE: formatCharacter(DE, 'DE', 'de', 3, 'で'),
	DO: formatCharacter(DO, 'DO', 'do', 4, 'ど'),
	BA: formatCharacter(BA, 'BA', 'ba', 5, 'ば'),
	BI: formatCharacter(BI, 'BI', 'bi', 3, 'び'),
	BU: formatCharacter(BU, 'BU', 'bu', 6, 'ぶ'),
	BE: formatCharacter(BE, 'BE', 'be', 3, 'べ'),
	BO: formatCharacter(BO, 'BO', 'bo', 6, 'ぼ'),
	PA: formatCharacter(PA, 'PA', 'pa', 4, 'ぱ'),
	PI: formatCharacter(PI, 'PI', 'pi', 2, 'ぴ'),
	PU: formatCharacter(PU, 'PU', 'pu', 5, 'ぷ'),
	PE: formatCharacter(PE, 'PE', 'pe', 2, 'ぺ'),
	PO: formatCharacter(PO, 'PO', 'po', 5, 'ぽ'),
} satisfies Record<RegularCharacter<KanaType.HIRAGANA>['id'], RegularCharacter<KanaType.HIRAGANA>>;

export const hiraganaSpecials = {
	SOKUON: formatCharacter(SOKUON, 'SPECIAL_SOKUON', null, 1, 'っ', 'sokuon'),
	YOON_YA: formatCharacter(YOON_YA, 'YOON_YA', 'ya', 3, 'ゃ', 'yoon'),
	YOON_YU: formatCharacter(YOON_YU, 'YOON_YU', 'yu', 2, 'ゅ', 'yoon'),
	YOON_YO: formatCharacter(YOON_YO, 'YOON_YO', 'yo', 2, 'ょ', 'yoon'),
} satisfies Record<SpecialCharacter<KanaType.HIRAGANA>['id'], SpecialCharacter<KanaType.HIRAGANA>>;

export const hiraganaByAscii = charactersToAsciiMap([
	...Object.values(hiragana),
	...Object.values(hiraganaSpecials),
]);

export const isHiraganaKey = (key: string, obj: typeof hiragana): key is keyof typeof hiragana => {
	return key in obj;
};
