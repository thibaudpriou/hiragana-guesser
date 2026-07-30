import { differenceInCalendarDays } from 'date-fns';
import type { HiraganaScoreDetails } from '../../types/hiraganaScoreDetails';

/**
 * Returns a normalized score representing how recent was the character seen.
 * note: Bezier score function
 */
const getLastSeenScore = (lastSeenAt: string) => {
	const nbDays = differenceInCalendarDays(lastSeenAt, Date.now());

	const t = nbDays > 90 ? 1 : nbDays / 90;
	return t * t * (3 - 2 * t);
};

/**
 * Returns a normalized score representing how known is a character.
 * note: Bezier score function
 */
const getStreakScore = (successStreak: number) => {
	const t = successStreak > 45 ? 1 : successStreak / 45;
	return t * t * (3 - 2 * t);
};

/**
 * Returns a score representing how much the related character is known / remembered
 * - min: 0 => never seen
 * - max: 1 => long term memory
 *
 * This feature aims at finding the most forgetted character.
 */
export const computeSuperMemoScore = (details: HiraganaScoreDetails): number => {
	if (details.lastSeenAt === undefined || details.successStreak === 0) {
		return 0;
	}

	const streakCoeff = 2;
	const dateCoeff = 5;
	const total = streakCoeff + dateCoeff;

	const score =
		streakCoeff * getStreakScore(details.successStreak) +
		dateCoeff * getLastSeenScore(details.lastSeenAt);

	// normalize
	// TODO add a small random component? (fuzzy)
	return score / total;
};
