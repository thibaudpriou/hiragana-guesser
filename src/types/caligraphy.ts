export type AnimationSpeedLevel = 0 | 1 | 2;
export const maxAnimationSpeedLevel: AnimationSpeedLevel = 2;
export const minAnimationSpeedLevel: AnimationSpeedLevel = 0;

export type CaligraphyAnimationConfig = {
	speedLevel: AnimationSpeedLevel;
	strokeDurationMs: number;
	characterSpacingMs: number;
	strokeSpacingMs: number;
};
