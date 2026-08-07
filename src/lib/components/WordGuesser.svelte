<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import CharacterContainer from './CharacterContainer.svelte';
	import type { CharacterWhitelist } from '../../types';
	import type { WordEntry } from '../../types/wordEntry';
	import { getDelayedChars } from '$lib/caligraphy/get-delayed-characters';
	import { charactersToAsciiMap } from '$lib/conversions/characters-to-ascii-map';
	import { asciiToCharacters } from '$lib/conversions/ascii-to-characters';
	import { CheckCheck, X } from '@lucide/svelte';
	import { onToucheMove, onTouchEnd, onTouchStart } from '$lib/interactions/swipe';

	type Props = {
		characters: CharacterWhitelist;
		wordToGuess: WordEntry;
		onSuccess: (wordtoGuess: WordEntry) => void;
		onError: (wordtoGuess: WordEntry) => void;
	};

	let { wordToGuess, characters, onSuccess, onError }: Props = $props();

	const transitionRenderKey = $derived(`${wordToGuess.ascii.join('')}-${Math.random()}`); // also resets caligraphy animations

	const charactersMap = $derived(charactersToAsciiMap(characters));

	let chars = $derived(asciiToCharacters(charactersMap, wordToGuess.ascii));

	type DisplayMode = 'GUESS' | 'SOLUTION';
	let displayMode = $state<DisplayMode>('GUESS');
	let showControls = $derived(displayMode !== 'GUESS');
	let isError = $state(false); // is used for out animation direction
	let currentSwipe = $state<'RIGHT' | 'LEFT' | null>(null);

	const preventBubble = (cb: () => void) => (event: Event) => {
		event.preventDefault();
		event.stopPropagation();
		cb();
	};

	const handleSuccess = () => {
		isError = false;

		onSuccess(wordToGuess);
		displayMode = 'GUESS';
	};
	const handleError = () => {
		isError = true;

		// TODO @tpriou display other controls to input errors?
		onError(wordToGuess);
		displayMode = 'GUESS';
	};

	const handleContainerClick = () => {
		if (displayMode === 'GUESS') {
			displayMode = 'SOLUTION';
			return;
		}
		if (displayMode === 'SOLUTION') {
			// TODO redraw caligraphy
			return;
		}
	};

	const handleTouchStart = (event: TouchEvent) => {
		onTouchStart(event);
	};
	const handleTouchEnd = (event: TouchEvent) => {
		const swipe = onTouchEnd(event);

		if (displayMode !== 'SOLUTION') {
			return;
		}

		currentSwipe = null;

		switch (swipe) {
			case null: {
				// TODO @tpriou show error in console?
				break;
			}
			case 'RIGHT': {
				handleSuccess();
				break;
			}
			case 'LEFT': {
				handleError();
				break;
			}
		}
	};

	const handleTouchMove = (event: TouchEvent) => {
		currentSwipe = onToucheMove(event);
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
	ontouchmove={handleTouchMove}
	bind:clientWidth
>
	<section class="container">
		{#key transitionRenderKey}
			<div
				class="text-container"
				out:fly={{ x: isError ? -clientWidth / 2 : clientWidth / 2, duration: 250, opacity: 0 }}
				in:fade={{ delay: 250 }}
			>
				<div>
					{#each delayedChars as character, i (character.id + i)}
						<span class="item">
							<CharacterContainer
								id={`${character.id}-${i}`}
								nbStrokeDelay={character.nbStrokeDelay}
								{character}
							/>
						</span>
					{/each}
				</div>

				<p class:text-container-row-hidden={displayMode === 'GUESS'}>
					{#each delayedChars as char, i (char.name + i)}
						<span class="name" in:fade={{ duration: 300 }}>{char.name}</span>
					{/each}
				</p>

				{#if wordToGuess.meaning}
					<p
						class="translation text-sm"
						class:text-container-row-hidden={displayMode === 'GUESS'}
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
		<hr
			class="hr control-divider"
			class:swiping={!!currentSwipe}
			class:preset-tonal-error={currentSwipe === 'LEFT'}
			class:preset-tonal-success={currentSwipe === 'RIGHT'}
		/>
		<button
			type="button"
			class="btn btn-icon preset-tonal-success"
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
		position: relative;
	}

	.text-container {
		display: flex;
		width: 100%;
		position: absolute;
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
		align-items: center;
	}

	.controls-hidden {
		opacity: 0;
	}

	.control-divider {
		height: 0;
		border-width: 0;
	}
	.control-divider.swiping {
		height: 0.1em;
		margin: 0 0.1em;
	}
</style>
