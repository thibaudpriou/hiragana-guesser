import { differenceInCalendarDays } from 'date-fns';
import type { HiraganaScoreDetails } from '../../types/hiraganaScoreDetails';

/**
 * Returns a normalized score representing how recent was the character seen.
 * note: arbitrary threshold and values
 */
const getLastSeenScore = (lastSeenAt: string) => {
	const nbDays = differenceInCalendarDays(lastSeenAt, Date.now());

	if (nbDays <= 0) {
		return 0;
	} else if (nbDays < 1) {
		return 0.1;
	} else if (nbDays < 3) {
		return 0.25;
	} else if (nbDays < 5) {
		return 0.4;
	} else if (nbDays < 30) {
		return 0.7;
	} else if (nbDays < 90) {
		return 0.9;
	}

	return 1;
};

/**
 * Returns a normalized score representing how known is a character.
 * note: arbitrary threshold and values
 */
const getStreakScore = (successStreak: number) => {
	if (successStreak <= 0) {
		return 0;
	} else if (successStreak < 1) {
		return 0.1;
	} else if (successStreak < 3) {
		return 0.2;
	} else if (successStreak < 5) {
		return 0.4;
	} else if (successStreak < 15) {
		return 0.7;
	} else if (successStreak < 45) {
		return 0.9;
	}

	return 1;
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
	return score / total;
};
