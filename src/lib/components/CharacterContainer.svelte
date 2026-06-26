<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		id,
		viewBox = '0 0 1024 1024',
		animationDurationMs = 500,
		animationSpacingMs = 300,
		strokeDelayMs = 0,
		svgContent
	} = $props<{
		id?: string;
		viewBox?: string;
		animationDurationMs: number;
		animationSpacingMs: number;
		strokeDelayMs: number;
		svgContent: Snippet;
	}>();
</script>

<svg
	{viewBox}
	{id}
	width="100%"
	height="100%"
	class="svg-container"
	style:--anim-stroke-delay={strokeDelayMs}
	style:--anim-dur={`${animationDurationMs}ms`}
	style:--anim-spacing={`${animationSpacingMs}ms`}
>
	{@render svgContent()}
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
