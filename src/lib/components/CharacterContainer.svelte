<script lang="ts">
	import type { Character } from '../../types';

	let {
		viewBox = '0 0 1024 1024',
		animationDurationMs = 500,
		animationSpacingMs = 300,
		nbStrokeDelay = 0,
		character,
		id
	} = $props<{
		id: string;
		character: Character;
		viewBox?: string;
		animationDurationMs?: number;
		animationSpacingMs?: number;
		nbStrokeDelay?: number;
	}>();
</script>

<svg
	{viewBox}
	{id}
	width="100%"
	height="100%"
	class="svg-container"
	style:--anim-stroke-delay={nbStrokeDelay}
	style:--anim-dur={`${animationDurationMs}ms`}
	style:--anim-spacing={`${animationSpacingMs}ms`}
>
	<character.component {id} />
</svg>

<style>
	.svg-container {
		flex-basis: 1em;
		fill: light-dark(var(--color-surface-950), var(--color-surface-50));
	}

	.svg-container :global(mask > path) {
		fill: none;
		stroke: #fff;

		--initial-delay: calc(var(--anim-stroke-delay) * var(--anim-dur));
		--intra-delay: calc(var(--d) * var(--anim-dur) + var(--anim-spacing));
		--anim-delay: calc(var(--initial-delay) + var(--intra-delay));
		animation: strokeOffset var(--anim-dur) linear forwards var(--anim-delay);

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
