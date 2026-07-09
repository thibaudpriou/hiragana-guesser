<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import CharacterContainer from './CharacterContainer.svelte';
	import type { Character } from '../../types';
	import type { WordEntry } from '../../types/wordEntry';
	import { getDelayedChars } from '$lib/caligraphy/get-delayed-characters';
	import { charactersToMap } from '$lib/conversions/characters-to-map';
	import { asciiToCharacters } from '$lib/conversions/ascii-to-characters';
	import { CheckCheck, X } from '@lucide/svelte';
	import { onTouchEnd, onTouchStart } from '$lib/interactions/swipe';

	const DEFAULT_ANIMATION_DURATION_MS = 150;
	const DEFAULT_ANIMATION_SPACING_MS = 250;

	type Props = {
		characters: Character[];
		wordToGuess: WordEntry;
		onSuccess: (wordtoGuess: WordEntry) => void;
		// onError: (wordtoGuess: WordEntry) => void;
	};

	let { wordToGuess, characters = [], onSuccess }: Props = $props();

	const renderKey = $derived(`${wordToGuess.reading}-${Math.random()}`); // is used to reset caligraphy animations

	const charactersMap = $derived(charactersToMap(characters));

	let chars = $derived(asciiToCharacters(charactersMap, wordToGuess.reading));

	type DisplayMode = 'guess' | 'show' | 'correct';
	let displayMode = $state<DisplayMode>('guess');
	let showControls = $derived(displayMode !== 'guess');

	const preventBubble = (cb: () => void) => (event: Event) => {
		event.preventDefault();
		event.stopPropagation();
		cb();
	};

	const handleSuccess = () => {
		onSuccess(wordToGuess);

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

	let clientWidth = $state(0);
</script>

<div
	class="word-guesser"
	onclick={handleContainerClick}
	onkeydown={handleContainerClick}
	tabindex="0"
	role="button"
	ontouchstart={handleTouchStart}
	ontouchend={handleTouchEnd}
	bind:clientWidth
>
	<section class="container">
		{#key renderKey}
			<div
				class="text-container"
				out:fly={{ x: -clientWidth / 2, duration: 250, opacity: 0 }}
				in:fade={{ delay: 250 }}
			>
				<div>
					{#each delayedChars as character, i (character.id + i)}
						<span class="item">
							<CharacterContainer
								id={`${character.id}-${i}`}
								nbStrokeDelay={character.nbStrokeDelay}
								animationDurationMs={displayMode !== 'guess' ? 0 : DEFAULT_ANIMATION_DURATION_MS}
								animationSpacingMs={displayMode !== 'guess' ? 0 : DEFAULT_ANIMATION_SPACING_MS}
								{character}
							/>
						</span>
					{/each}
				</div>

				<p class:text-container-row-hidden={displayMode === 'guess'}>
					{#each delayedChars as char, i (char.name + i)}
						<span class="name" in:fade={{ duration: 300 }}>{char.name}</span>
					{/each}
				</p>

				{#if wordToGuess.meaning}
					<p
						class="translation text-sm"
						class:text-container-row-hidden={displayMode === 'guess'}
						in:fade={{ duration: 300 }}
					>
						{wordToGuess.meaning}
					</p>
				{/if}
			</div>
		{/key}
	</section>

	<section class="controls" class:controls-hidden={!showControls}>
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
	</section>
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
		flex-grow: 1;
	}

	.text-container {
		display: flex;
		width: 100%;
		height: 100%;
		align-items: center;
		justify-content: center;
		box-sizing: content-box;
		flex-direction: column;
	}

	.text-container-row-hidden {
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
