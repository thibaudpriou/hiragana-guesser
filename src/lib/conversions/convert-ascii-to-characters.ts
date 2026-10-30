import { KanaType, type Character } from '../../types/character';

type AsciiTopCharacterCallback = (ascii: string) => Character<KanaType> | undefined;

/**
 * Converts ASCII string to array of characters
 */
export const convertAsciiToCharacters = (
	asciiToCharacter: AsciiTopCharacterCallback,
	str: string[]
): Character<KanaType>[] => {
	const converted = str.map((k) => asciiToCharacter(k));

	const defined = converted.filter(Boolean) as Character<KanaType>[];
	// TODO handle error / mismatch between length
	return defined;
};
