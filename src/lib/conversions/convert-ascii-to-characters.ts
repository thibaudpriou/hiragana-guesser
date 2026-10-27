import { type Character } from '../../types/character';

type AsciiTopCharacterCallback = (ascii: string) => Character | undefined;

/**
 * Converts ASCII string to array of characters
 */
export const convertAsciiToCharacters = (
	asciiToCharacter: AsciiTopCharacterCallback,
	str: string[]
): Character[] => {
	const converted = str.map((k) => asciiToCharacter(k));

	const defined = converted.filter(Boolean) as Character[];
	// TODO handle error / mismatch between length
	return defined;
};
