<script lang="ts">
	import type { Character } from '../../types';

	const DEFAULT_STROKE_DURATION_MS = 150;

	type Props = {
		id: string;
		character: Character;
		viewBox?: string;
		strokeDurationMs?: number;
		nbStrokeDelay?: number;
		active?: boolean;
	};
	let {
		viewBox = '0 0 1024 1024',
		strokeDurationMs = DEFAULT_STROKE_DURATION_MS,
		nbStrokeDelay = 0,
		character,
		id,
		active = false,
	}: Props = $props();
</script>

<svg
	{viewBox}
	{id}
	width="100%"
	height="100%"
	class="svg-container"
	class:active
	style:--nb-stroke-delay={nbStrokeDelay}
	style:--stroke-duration-ms={`${strokeDurationMs}ms`}
>
	<character.component {id} />
</svg>

<style>
	.svg-container {
		flex-basis: 1em;
		fill: light-dark(var(--color-surface-950), var(--color-surface-50));

		--character-delay: calc(var(--nb-stroke-delay) * var(--stroke-duration-ms));
	}

	.svg-container.active {
		fill: light-dark(var(--color-surface-50), var(--color-surface-950));
	}

	.svg-container :global(mask > path) {
		fill: none;
		stroke: #fff;

		--nb-stroke-delay: calc(var(--character-delay) + var(--stroke-idx) * var(--stroke-duration-ms));
		animation: strokeOffset var(--stroke-duration-ms) linear forwards var(--nb-stroke-delay);

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
