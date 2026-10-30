import { hiragana } from '$lib/components/syllabaries/hiragana';
import { katakana } from '$lib/components/syllabaries/katakana';
import type { Character, KanaType, RegularCharacter, SpecialCharacter } from '../../types';

export const yoonToRomanji = (
	previousCharacter: Character<KanaType>,
	yoon: SpecialCharacter<KanaType> & { romanji: string }
): string => {
	const getPrefix = (char: RegularCharacter<KanaType>) => char.romanji.slice(0, -1);
	/**
	 * NOTE: katakana and hiragana characters actually have the same ID
	 * This have no impact here albeit weird when reading code
	 */
	switch (previousCharacter.id) {
		case hiragana.KI.id:
		case hiragana.NI.id:
		case hiragana.HI.id:
		case hiragana.MI.id:
		case hiragana.RI.id:
		case hiragana.GI.id:
		case hiragana.BI.id:
		case hiragana.PI.id:
		case katakana.KI.id:
		case katakana.NI.id:
		case katakana.HI.id:
		case katakana.MI.id:
		case katakana.RI.id:
		case katakana.GI.id:
		case katakana.BI.id:
		case katakana.PI.id: {
			const prefix = getPrefix(previousCharacter as RegularCharacter<KanaType>);
			return `${prefix}${yoon.romanji}`;
		}

		case hiragana.SHI.id:
		case hiragana.CHI.id:
		case hiragana.JI.id:
		case hiragana.JI2.id:
		case katakana.SHI.id:
		case katakana.CHI.id:
		case katakana.JI.id:
		case katakana.JI2.id: {
			const prefix = getPrefix(previousCharacter as RegularCharacter<KanaType>);
			const suffix = yoon.romanji.slice(1);
			return `${prefix}${suffix}`;
		}
		default: {
			throw new Error(`Unknown Yōon combination: ${previousCharacter.romanji}${yoon.romanji}`);
		}
	}
};

export const charactersToRomanji = (characters: Character<KanaType>[]): string[] => {
	const romanji: string[] = [];
	characters.forEach((char, i, arr) => {
		// * "changing sounds" characters
		if (char.type === 'sokuon') {
			const nextCharacter = arr[i + 1];
			if (!nextCharacter?.romanji) {
				throw new Error(`Could not find character following ${char.id} (${char.ascii})`);
			}
			romanji.push(nextCharacter.romanji.charAt(0));
			return;
		}

		// * "contracted sounds" characters
		if (char.type === 'yoon') {
			const previousCharacter = arr[i - 1];
			if (!previousCharacter) {
				throw new Error(`Could not find character preceding ${char.id} (${char.ascii})`);
			}
			romanji.pop();
			romanji.push(yoonToRomanji(previousCharacter, char));
			return;
		}

		romanji.push(char.romanji);
	});

	return romanji;
};
