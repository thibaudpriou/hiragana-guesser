import { Character } from '../../types/character';

/**
 * Converts ASCII string to array of characters
 */
export const asciiToCharacters = (
	charactersMap: Map<string, Character>,
	str: string[]
): Character[] => {
	const converted = str.map((c) => {
		return charactersMap.get(c);
	});

	const defined = converted.filter(Boolean) as Character[];
	// TODO handle error / mismatch between length
	return defined;
};
