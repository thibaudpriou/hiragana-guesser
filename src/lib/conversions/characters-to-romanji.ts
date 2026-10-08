import type { Character } from '../../types';

export const charactersToRomanji = (characters: Character[]): string[] => {
	const romanji: string[] = [];
	characters.forEach((char, i, arr) => {
		if (char.romanji !== null) {
			romanji.push(char.romanji);
			return;
		}

		// * "changing sounds" characters
		if (char.type === 'sokuon') {
			const nextCharacter = arr[i + 1];
			if (!nextCharacter?.romanji) {
				throw new Error(`Could not find character following ${char.id} (${char.ascii})`);
			}
			romanji.push(nextCharacter.romanji.charAt(0));
			return;
		}

		// TODO handle others special characters

		throw new Error(`Romanji translation not implement for ${char.id} (${char.ascii})`);
	});

	return romanji;
};
