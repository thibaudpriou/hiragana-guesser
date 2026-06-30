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

export const hiragana: Record<string, Character> = {
	A: {
		id: 'A',
		ascii: 'あ',
		name: A.NAME,
		nbStrokes: A.NB_STROKES,
		component: A.default as Character['component']
	},
	I: {
		id: 'I',
		ascii: 'い',
		name: I.NAME,
		nbStrokes: I.NB_STROKES,
		component: I.default as Character['component']
	},
	U: {
		id: 'U',
		ascii: 'う',
		name: U.NAME,
		nbStrokes: U.NB_STROKES,
		component: U.default as Character['component']
	},
	E: {
		id: 'E',
		ascii: 'え',
		name: E.NAME,
		nbStrokes: E.NB_STROKES,
		component: E.default as Character['component']
	},
	O: {
		id: 'O',
		ascii: 'お',
		name: O.NAME,
		nbStrokes: O.NB_STROKES,
		component: O.default as Character['component']
	},
	KA: {
		id: 'KA',
		ascii: 'か',
		name: KA.NAME,
		nbStrokes: KA.NB_STROKES,
		component: KA.default as Character['component']
	},
	KI: {
		id: 'KI',
		ascii: 'き',
		name: KI.NAME,
		nbStrokes: KI.NB_STROKES,
		component: KI.default as Character['component']
	},
	KU: {
		id: 'KU',
		ascii: 'く',
		name: KU.NAME,
		nbStrokes: KU.NB_STROKES,
		component: KU.default as Character['component']
	},
	KE: {
		id: 'KE',
		ascii: 'け',
		name: KE.NAME,
		nbStrokes: KE.NB_STROKES,
		component: KE.default as Character['component']
	},
	KO: {
		id: 'KO',
		ascii: 'こ',
		name: KO.NAME,
		nbStrokes: KO.NB_STROKES,
		component: KO.default as Character['component']
	},
	SA: {
		id: 'SA',
		ascii: 'さ',
		name: SA.NAME,
		nbStrokes: SA.NB_STROKES,
		component: SA.default as Character['component']
	},
	SHI: {
		id: 'SHI',
		ascii: 'し',
		name: SHI.NAME,
		nbStrokes: SHI.NB_STROKES,
		component: SHI.default as Character['component']
	},
	SU: {
		id: 'SU',
		ascii: 'す',
		name: SU.NAME,
		nbStrokes: SU.NB_STROKES,
		component: SU.default as Character['component']
	},
	SE: {
		id: 'SE',
		ascii: 'せ',
		name: SE.NAME,
		nbStrokes: SE.NB_STROKES,
		component: SE.default as Character['component']
	},
	SO: {
		id: 'SO',
		ascii: 'そ',
		name: SO.NAME,
		nbStrokes: SO.NB_STROKES,
		component: SO.default as Character['component']
	},
	TA: {
		id: 'TA',
		ascii: 'た',
		name: TA.NAME,
		nbStrokes: TA.NB_STROKES,
		component: TA.default as Character['component']
	},
	CHI: {
		id: 'CHI',
		ascii: 'ち',
		name: CHI.NAME,
		nbStrokes: CHI.NB_STROKES,
		component: CHI.default as Character['component']
	},
	TSU: {
		id: 'TSU',
		ascii: 'つ',
		name: TSU.NAME,
		nbStrokes: TSU.NB_STROKES,
		component: TSU.default as Character['component']
	},
	TE: {
		id: 'TE',
		ascii: 'て',
		name: TE.NAME,
		nbStrokes: TE.NB_STROKES,
		component: TE.default as Character['component']
	},
	TO: {
		id: 'TO',
		ascii: 'と',
		name: TO.NAME,
		nbStrokes: TO.NB_STROKES,
		component: TO.default as Character['component']
	},
	NA: {
		id: 'NA',
		ascii: 'な',
		name: NA.NAME,
		nbStrokes: NA.NB_STROKES,
		component: NA.default as Character['component']
	},
	NI: {
		id: 'NI',
		ascii: 'に',
		name: NI.NAME,
		nbStrokes: NI.NB_STROKES,
		component: NI.default as Character['component']
	},
	NU: {
		id: 'NU',
		ascii: 'ぬ',
		name: NU.NAME,
		nbStrokes: NU.NB_STROKES,
		component: NU.default as Character['component']
	},
	NE: {
		id: 'NE',
		ascii: 'ね',
		name: NE.NAME,
		nbStrokes: NE.NB_STROKES,
		component: NE.default as Character['component']
	},
	NO: {
		id: 'NO',
		ascii: 'の',
		name: NO.NAME,
		nbStrokes: NO.NB_STROKES,
		component: NO.default as Character['component']
	},
	HA: {
		id: 'HA',
		ascii: 'は',
		name: HA.NAME,
		nbStrokes: HA.NB_STROKES,
		component: HA.default as Character['component']
	},
	HI: {
		id: 'HI',
		ascii: 'ひ',
		name: HI.NAME,
		nbStrokes: HI.NB_STROKES,
		component: HI.default as Character['component']
	},
	FU: {
		id: 'FU',
		ascii: 'ふ',
		name: FU.NAME,
		nbStrokes: FU.NB_STROKES,
		component: FU.default as Character['component']
	},
	HE: {
		id: 'HE',
		ascii: 'へ',
		name: HE.NAME,
		nbStrokes: HE.NB_STROKES,
		component: HE.default as Character['component']
	},
	HO: {
		id: 'HO',
		ascii: 'ほ',
		name: HO.NAME,
		nbStrokes: HO.NB_STROKES,
		component: HO.default as Character['component']
	},

	// with gokuen
	DA: {
		id: 'DA',
		ascii: 'だ',
		name: DA.NAME,
		nbStrokes: DA.NB_STROKES,
		component: DA.default as Character['component']
	},
	JI2: {
		// "DI"
		id: 'JI2',
		ascii: 'ぢ',
		name: JI2.NAME,
		nbStrokes: JI2.NB_STROKES,
		component: JI2.default as Character['component']
	},
	DE: {
		id: 'DE',
		ascii: 'で',
		name: DE.NAME,
		nbStrokes: DE.NB_STROKES,
		component: DE.default as Character['component']
	},
	DO: {
		id: 'DO',
		ascii: 'ど',
		name: DO.NAME,
		nbStrokes: DO.NB_STROKES,
		component: DO.default as Character['component']
	},
	GA: {
		id: 'GA',
		ascii: 'が',
		name: GA.NAME,
		nbStrokes: GA.NB_STROKES,
		component: GA.default as Character['component']
	},
	GI: {
		id: 'GI',
		ascii: 'ぎ',
		name: GI.NAME,
		nbStrokes: GI.NB_STROKES,
		component: GI.default as Character['component']
	},
	GU: {
		id: 'GU',
		ascii: 'ぐ',
		name: GU.NAME,
		nbStrokes: GU.NB_STROKES,
		component: GU.default as Character['component']
	},
	GE: {
		id: 'GE',
		ascii: 'げ',
		name: GE.NAME,
		nbStrokes: GE.NB_STROKES,
		component: GE.default as Character['component']
	},
	GO: {
		id: 'GO',
		ascii: 'ご',
		name: GO.NAME,
		nbStrokes: GO.NB_STROKES,
		component: GO.default as Character['component']
	},
	JI: {
		id: 'JI',
		ascii: 'じ',
		name: JI.NAME,
		nbStrokes: JI.NB_STROKES,
		component: JI.default as Character['component']
	},
	ZA: {
		id: 'ZA',
		ascii: 'ざ',
		name: ZA.NAME,
		nbStrokes: ZA.NB_STROKES,
		component: ZA.default as Character['component']
	},
	ZE: {
		id: 'ZE',
		ascii: 'ぜ',
		name: ZE.NAME,
		nbStrokes: ZE.NB_STROKES,
		component: ZE.default as Character['component']
	},
	ZO: {
		id: 'ZO',
		ascii: 'ぞ',
		name: ZO.NAME,
		nbStrokes: ZO.NB_STROKES,
		component: ZO.default as Character['component']
	},
	ZU: {
		id: 'ZU',
		ascii: 'ず',
		name: ZU.NAME,
		nbStrokes: ZU.NB_STROKES,
		component: ZU.default as Character['component']
	},
	ZU2: {
		// tsu + gakuen
		id: 'ZU2',
		ascii: 'づ',
		name: ZU2.NAME,
		nbStrokes: ZU2.NB_STROKES,
		component: ZU2.default as Character['component']
	}
};
