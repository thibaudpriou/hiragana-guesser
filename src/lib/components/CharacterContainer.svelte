<script lang="ts">
	import type { Character } from '../../types';

	/*
	 * Caligraphy handwriting animation: each stroke has a mask that we animate
	 *
	 * Note: to ease calculations, each stroke has the same animation duration.
	 * This causes some characters with long strokes do not render well (e.g hiragana NO) but won't fix
	 */

	const DEFAULT_STROKE_DURATION_MS = 150;
	const DEFAULT_CHARACTER_SPACING_MS = 50;
	const DEFAULT_STROKE_SPACING_MS = 20;

	type Props = {
		id: string;
		character: Character;
		viewBox?: string;
		strokeDurationMs?: number;
		characterSpacingMs?: number;
		strokeSpacingMs?: number;
		delay?: {
			nbStrokes: number;
			nbCharacters: number;
		};
		active?: boolean;
	};
	let {
		viewBox = '0 0 1024 1024',
		strokeDurationMs = DEFAULT_STROKE_DURATION_MS,
		characterSpacingMs = DEFAULT_CHARACTER_SPACING_MS,
		strokeSpacingMs = DEFAULT_STROKE_SPACING_MS,
		delay,
		character,
		id,
		active = false,
	}: Props = $props();

	const delayNbCharacterSpacing = $derived(delay?.nbCharacters ?? 0);
	const delayNbStrokes = $derived(delay?.nbStrokes ?? 0);
	const delayNbStrokesSpacing = $derived.by(() => {
		if (!delayNbStrokes) {
			return 0;
		}

		return delayNbStrokes - 1 - (delayNbCharacterSpacing - 1);
	});

	const delayMs = $derived(
		delayNbCharacterSpacing * characterSpacingMs +
			delayNbStrokes * strokeDurationMs +
			delayNbStrokesSpacing * strokeSpacingMs
	);
</script>

<svg
	{viewBox}
	{id}
	width="100%"
	height="100%"
	class="svg-container"
	class:active
	style:--character-delay-ms={`${delayMs}ms`}
	style:--stroke-duration-ms={`${strokeDurationMs}ms`}
	style:--stroke-spacing-ms={`${strokeSpacingMs}ms`}
>
	<character.component {id} />
</svg>

<style>
	.svg-container {
		flex-basis: 1em;
		fill: light-dark(var(--color-surface-950), var(--color-surface-50));
	}

	.svg-container.active {
		fill: light-dark(var(--color-surface-50), var(--color-surface-950));
	}

	.svg-container :global(mask > path) {
		fill: none;
		stroke: #fff;

		animation: strokeOffset var(--stroke-duration-ms) linear forwards;
		--stroke-delay-ms: calc(
			var(--stroke-idx) * var(--stroke-duration-ms) + var(--stroke-idx) * var(--stroke-spacing-ms)
		);
		animation-delay: calc(var(--stroke-delay-ms) + var(--character-delay-ms));

		stroke-dasharray: 3010;
		stroke-dashoffset: 3020;
		stroke-width: 128;
		stroke-linejoin: bevel;
		stroke-linecap: round;
	}

	@keyframes strokeOffset {
		to {
			stroke-dashoffset: 0;
		}
	}
</style>
