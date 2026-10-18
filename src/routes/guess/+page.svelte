<script lang="ts">
	import { resolve } from '$app/paths';
	import CharacterContainer from '$lib/components/CharacterContainer.svelte';
	import { hiragana } from '$lib/components/syllabaries/hiragana';
	import { ArrowRight } from '@lucide/svelte';
</script>

<div class="container">
	<a class="nav-link" href={resolve('/guess-character')}>
		<button class="btn preset-filled-surface-300-700 fill-surface-950-50 button-link">
			<span class="container-hiragana">
				<CharacterContainer
					id="ma0"
					character={hiragana.MA}
					strokeDurationMs={0}
					strokeSpacingMs={0}
					inheritColors
				/>
			</span>
			<span class="container-arrow text-success-700 dark:text-success-600">
				<ArrowRight class="size-full" />
			</span>
			<span class="container-romanji">{hiragana.MA.romanji}</span>
		</button>
	</a>

	<a class="nav-link" href={resolve('/guess-romanji')}>
		<button class="btn preset-filled-surface-300-700 fill-surface-950-50 button-link">
			<span class="container-romanji">{hiragana.NA.romanji}</span>
			<span class="container-arrow text-success-700 dark:text-success-600">
				<ArrowRight class="size-full" />
			</span>
			<span class="container-hiragana">
				<CharacterContainer
					id="na1"
					character={hiragana.NA}
					strokeDurationMs={0}
					strokeSpacingMs={0}
					inheritColors
				/>
			</span>
		</button>
	</a>
	<a class="nav-link" href={resolve('/guess-word')}>
		<button
			class="btn preset-filled-surface-300-700 fill-surface-950-50 button-link"
			style:--nb-characters={3}
		>
			<span class="container-hiragana">
				<CharacterContainer
					id="ma2"
					character={hiragana.MA}
					strokeDurationMs={0}
					strokeSpacingMs={0}
					inheritColors
				/>
				<CharacterContainer
					id="na2"
					character={hiragana.NA}
					strokeDurationMs={0}
					strokeSpacingMs={0}
					inheritColors
				/>
				<CharacterContainer
					id="bu1"
					character={hiragana.BU}
					strokeDurationMs={0}
					strokeSpacingMs={0}
					inheritColors
				/>
			</span>
			<span class="container-arrow text-success-700 dark:text-success-600">
				<ArrowRight class="size-full" />
			</span>
			<span class="container-romanji"
				>{hiragana.MA.romanji}{hiragana.NA.romanji}{hiragana.BU.romanji}</span
			>
		</button>
	</a>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-size: 6vw;
		gap: 0.75em;
		height: 100%;
		max-width: 100%;
	}

	.nav-link {
		display: flex;
		justify-content: center;
		border-radius: 0.2em;
		width: 50%;
	}

	.button-link {
		display: flex;
		height: 100%;
		font-size: 1em;
		padding: 0.2em 0.5em;
		width: 100%;

		--nb-characters: 1;
	}

	.container-hiragana {
		width: calc(var(--nb-characters) * 1em);
		height: 1em;
		display: flex;
	}

	.container-romanji {
		width: calc(var(--nb-characters) * 2em); /* 2em instead of 1em because font-size if halved */
		font-size: 0.5em;
		display: inline-flex;
	}
	.container-arrow {
		width: 1em;
		height: 0.5em;
	}
</style>
