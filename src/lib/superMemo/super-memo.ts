import type { HiraganaScoreDetails } from '../../types/hiraganaScoreDetails';

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
export const computeSuperMemoScore = (details: HiraganaScoreDetails): number => {
	if (details.successStreak === 0) {
		return 0;
	}

	const score = getStreakScore(details.successStreak);

	// TODO add a small random component? (fuzzy)
	return score;
};

/**
 * Returns an integer to be used as weight to randomly select a character
 * - main: 1 => long-term memory
 * - man: 10 => never seen
 */
export const computeWeightFromSuperMemoScore = (normalizedScore: number) => {
	const inverted = 1 - normalizedScore;
	return Math.ceil(inverted * 10);
};
