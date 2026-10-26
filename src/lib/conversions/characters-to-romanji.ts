import { hiragana } from '$lib/components/syllabaries/hiragana';
import type { Character, RegularCharacter, SpecialCharacter } from '../../types';

export const yoonToRomanji = (
	previousCharacter: Character,
	yoon: SpecialCharacter & { romanji: string }
): string => {
	const getPrefix = (char: RegularCharacter) => char.romanji.slice(0, -1);
	switch (previousCharacter.id) {
		case hiragana.KI.id:
		case hiragana.NI.id:
		case hiragana.HI.id:
		case hiragana.MI.id:
		case hiragana.RI.id:
		case hiragana.GI.id:
		case hiragana.BI.id:
		case hiragana.PI.id: {
			const prefix = getPrefix(previousCharacter as RegularCharacter);
			return `${prefix}${yoon.romanji}`;
		}

		case hiragana.SHI.id:
		case hiragana.CHI.id:
		case hiragana.JI.id:
		case hiragana.JI2.id: {
			const prefix = getPrefix(previousCharacter as RegularCharacter);
			const suffix = yoon.romanji.slice(1);
			return `${prefix}${suffix}`;
		}
		default: {
			throw new Error(`Unknown Yōon combination: ${previousCharacter.romanji}${yoon.romanji}`);
		}
	}
};

export const charactersToRomanji = (characters: Character[]): string[] => {
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

		// TODO handle others special characters

		romanji.push(char.romanji);
	});

	return romanji;
};
