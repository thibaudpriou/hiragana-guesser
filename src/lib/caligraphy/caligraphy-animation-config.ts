import type { AnimationSpeedLevel, CaligraphyAnimationConfig } from '../../types/caligraphy';

export const getCaligraphyAnimationConfig = (
	speedLevel: AnimationSpeedLevel = 1
): CaligraphyAnimationConfig => {
	switch (speedLevel) {
		case 0: {
			return {
				speedLevel,
				strokeDurationMs: 0,
				characterSpacingMs: 0,
				strokeSpacingMs: 0,
			};
		}
		case 1:
		default: {
			return {
				speedLevel,
				strokeDurationMs: 150,
				characterSpacingMs: 50,
				strokeSpacingMs: 20,
			};
		}
		case 2: {
			return {
				speedLevel,
				strokeDurationMs: 225,
				characterSpacingMs: 75,
				strokeSpacingMs: 30,
			};
		}
	}
};
