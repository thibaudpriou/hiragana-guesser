import type { Character } from '../../types';
type DelayedCharacter = Character & { delay: { nbStrokes: number; nbCharacters: number } };

/**
 * To correctly draw each character sequentially, we need to add
 * delay each drawing of the number of previous characters' strokes
 */
export const getDelayedChars = (arr: Character[]) => {
	const delayed: DelayedCharacter[] = [];
	let nbPrevStrokes = 0;

	for (const [i, char] of arr.entries()) {
		delayed.push({
			...char,
			delay: {
				nbStrokes: nbPrevStrokes,
				nbCharacters: i,
			},
		});

		nbPrevStrokes += char.nbStrokes;
	}

	return delayed;
};
