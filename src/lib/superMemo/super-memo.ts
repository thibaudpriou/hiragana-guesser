import type { CharacterScoreDetails } from '../../types/character-score-details';

// TODO @tpriou: remove mentions of SuperMemo algorithm as it's not actually implemented

/**
 * Returns a normalized score representing how known is a character.
 * note: Bezier score function
 */
const getStreakScore = (successStreak: number) => {
	const t = successStreak > 7 ? 1 : successStreak / 7;
	return t * t * (3 - 2 * t);
};

/**
 * Returns a score representing how much the related character is known / remembered
 * - min: 0 => never seen
 * - max: 1 => long-term memory
 *
 * This feature aims at finding the most forgetted character.
 */
export const computeSuperMemoScore = (details?: CharacterScoreDetails): number => {
	if (details === undefined || details.successStreak === 0) {
		return 0;
	}

	const score = getStreakScore(details.successStreak);

	// TODO add a small random component? (fuzzy)
	return score;
};

/**
 * Returns an integer to be used as weight to randomly select a character
 * - main: 1 => long-term memory
 * - man: X => never seen
 *
 * where X is the total number of characters in the selection set (see below)
 *
 * Worst case scenario: 1 character not known, all the others (X) fully remembered
 * - probability of picking the unknown character: 0.5
 * - probability of picking another character: 0.5 * 1/X
 */
export const computeWeightFromSuperMemoScore = (normalizedScore: number, nbCharacters: number) => {
	const inverted = 1 - normalizedScore;
	return Math.ceil(inverted * nbCharacters);
};
