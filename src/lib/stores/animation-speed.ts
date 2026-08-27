import { writable } from 'svelte/store';
import type { AnimationSpeedLevel } from '../../types/caligraphy';

const DEFAULT_ANIMATION_SPEED_LEVEL = 2;

export const animationSpeedStore = writable<AnimationSpeedLevel>(DEFAULT_ANIMATION_SPEED_LEVEL);
