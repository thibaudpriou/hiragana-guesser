import type { AnimationSpeedLevel, CaligraphyAnimationConfig } from '../../types/caligraphy';

export const getCaligraphyAnimationConfig = (
	level: AnimationSpeedLevel = 1
): CaligraphyAnimationConfig => {
	switch (level) {
		case 0:
			return {
				strokeDurationMs: 0,
				characterSpacingMs: 0,
				strokeSpacingMs: 0,
			};
		case 1:
		default:
			return {
				strokeDurationMs: 150,
				characterSpacingMs: 50,
				strokeSpacingMs: 20,
			};
		case 2:
			return {
				strokeDurationMs: 225,
				characterSpacingMs: 75,
				strokeSpacingMs: 30,
			};
	}
};
