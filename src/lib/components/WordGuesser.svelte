<script lang="ts">
	import { fade } from 'svelte/transition';
	import CharacterContainer from './CharacterContainer.svelte';
	import type { Character } from '../../types';
	import type { WordEntry } from '../../types/wordEntry';
	import { getDelayedChars } from '$lib/caligraphy/get-delayed-characters';
	import { charactersToMap } from '$lib/conversions/characters-to-map';
	import { asciiToCharacters } from '$lib/conversions/ascii-to-characters';
	import { CheckCheck, X } from '@lucide/svelte';
	import { onTouchEnd, onTouchStart } from '$lib/interactions/swipe';

	const DEFAULT_ANIMATION_DELAY_MS = 300;
	const DEFAULT_ANIMATION_SPACING_MS = 100;

	type Props = {
		characters: Character[];
		words: WordEntry[];
	};

	let { words = [], characters = [] }: Props = $props();

	const randomInt = (max: number) => Math.floor(Math.random() * max);

	const getRandomKey = () => `${Math.random()}`;
	let forceRerenderKey = $state(getRandomKey());

	const getRandomEl = (arr: WordEntry[]) => {
		const index = randomInt(arr.length);

		return arr.at(index)!;
	};

	const charactersMap = $derived(charactersToMap(characters));

	let guess = $derived(getRandomEl(words));
	let chars = $derived(asciiToCharacters(charactersMap, guess.reading));

	type DisplayMode = 'guess' | 'show' | 'correct';
	let displayMode = $state<DisplayMode>('guess');
	let showControls = $derived(displayMode !== 'guess');

	const preventBubble = (cb: () => void) => (event: Event) => {
		event.preventDefault();
		event.stopPropagation();
		cb();
	};

	const handleSuccess = () => {
		guess = getRandomEl(words);
		forceRerenderKey = getRandomKey();

		// TODO upsert spaced repetition config
		displayMode = 'guess';
	};
	const handleError = () => {
		// TODO @tpriou display other controls to input errors
		// TODO then update spaced repetition config
	};

	const handleContainerClick = () => {
		if (displayMode !== 'guess') {
			return;
		}

		displayMode = 'show';
	};

	const handleTouchStart = (event: TouchEvent) => {
		onTouchStart(event);
	};
	const handleTouchEnd = (event: TouchEvent) => {
		const swipe = onTouchEnd(event);

		if (displayMode !== 'show') {
			return;
		}

		switch (swipe) {
			case null: {
				// TODO @tpriou show error in console?
				break;
			}
			case 'left': {
				handleSuccess();
				break;
			}
			case 'right': {
				handleError();
				break;
			}
		}
	};

	let delayedChars = $derived(getDelayedChars(chars));

	// TODO add Sokuon さって＝s
</script>

<div
	class="word-guesser"
	onclick={handleContainerClick}
	onkeydown={handleContainerClick}
	tabindex="0"
	role="button"
	ontouchstart={handleTouchStart}
	ontouchend={handleTouchEnd}
>
	<section class="container">
		<div>
			{#key forceRerenderKey}
				{#each delayedChars as character, i (character.id + i)}
					<span class="item">
						<CharacterContainer
							id={`${character.id}-${i}`}
							nbStrokeDelay={character.nbStrokeDelay}
							animationDurationMs={displayMode !== 'guess' ? 0 : DEFAULT_ANIMATION_DELAY_MS}
							animationSpacingMs={displayMode !== 'guess' ? 0 : DEFAULT_ANIMATION_SPACING_MS}
							{character}
						/>
					</span>
				{/each}
			{/key}
		</div>

		<p class:container-row-hidden={displayMode === 'guess'}>
			{#each delayedChars as char, i (char.name + i)}
				<span class="name" in:fade={{ duration: 300 }}>{char.name}</span>
			{/each}
		</p>

		<p
			class="translation text-sm"
			class:container-row-hidden={displayMode === 'guess'}
			in:fade={{ duration: 300 }}
		>
			{guess.meaning}
		</p>
	</section>

	<div class="controls" class:controls-hidden={!showControls}>
		<button
			type="button"
			class="btn btn-icon preset-tonal-error"
			onclick={showControls ? preventBubble(handleError) : undefined}
			onkeydown={showControls ? preventBubble(handleError) : undefined}
		>
			<X />
		</button>
		<button
			type="button"
			class="btn btn-icon preset-filled-success-500"
			onclick={showControls ? preventBubble(handleSuccess) : undefined}
			onkeydown={showControls ? preventBubble(handleSuccess) : undefined}
		>
			<CheckCheck />
		</button>
	</div>
</div>

<style>
	.word-guesser {
		--size: 1em;
		display: flex;
		width: 100%;
		height: 100%;
		font-size: 10vw;
		flex-direction: column;
		padding: 0 1em;
	}

	.container {
		display: flex;
		width: 100%;
		height: 100%;
		align-items: center;
		justify-content: center;
		box-sizing: content-box;
		flex-direction: column;
	}

	.container-row-hidden {
		opacity: 0;
	}

	.item {
		display: inline-flex;
		width: var(--size);
		height: var(--size);
		align-items: center;
		justify-content: center;
	}

	.name {
		display: inline-flex;
		user-select: none;
		font-size: var(--size);
	}

	.translation {
		font-style: italic;
	}

	.controls {
		display: flex;
		justify-content: space-between;
		margin: 0.5em 0;
	}

	.controls-hidden {
		opacity: 0;
	}
</style>
