import type { Character } from '../../types';
type DelayedCharacter = Character & { nbStrokeDelay: number };

/**
 * To correctly draw each character sequentially, we need to add
 * delay each drawing of the number of previous characters' strokes
 */
export const getDelayedChars = (arr: Character[]) => {
	const delayed: DelayedCharacter[] = [];
	let nbPrevStrokes = 0;

	for (const el of arr) {
		delayed.push({
			...el,
			nbStrokeDelay: nbPrevStrokes,
		});

		nbPrevStrokes += el.nbStrokes;
	}

	return delayed;
};
