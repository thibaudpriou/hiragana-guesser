import { writable } from 'svelte/store';
import type { JPLT_LEVEL } from '../../types/jplt';

export const DEFAULT_JPLT_WORD_LEVEL = 5;

export const jpltWordLevelStore = writable<JPLT_LEVEL>(DEFAULT_JPLT_WORD_LEVEL);
