<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import CharacterContainer from './CharacterContainer.svelte';
	import type { CharacterWhitelist } from '../../types';
	import type { WordEntry } from '../../types/wordEntry';
	import { getDelayedChars } from '$lib/caligraphy/get-delayed-characters';
	import { charactersToAsciiMap } from '$lib/conversions/characters-to-ascii-map';
	import { convertAsciiToCharacters } from '$lib/conversions/convert-ascii-to-characters';
	import { CheckCheck, X } from '@lucide/svelte';
	import { onToucheMove, onTouchEnd, onTouchStart } from '$lib/interactions/swipe';
	import type { CaligraphyAnimationConfig } from '../../types/caligraphy';
	import { charactersToRomanji } from '$lib/conversions/characters-to-romanji';

	type Props = {
		characters: CharacterWhitelist;
		wordToGuess: WordEntry;
		onGuessSucess: (wordtoGuess: WordEntry) => void;
		onGuessError: (wordtoGuess: WordEntry) => void;
		caligraphyAnimationConfig: CaligraphyAnimationConfig;
	};

	let { wordToGuess, characters, onGuessSucess, onGuessError, caligraphyAnimationConfig }: Props =
		$props();

	const transitionRenderKey = $derived(`${wordToGuess.ascii.join('')}-${Math.random()}`); // also resets caligraphy animations

	let caligraphyForceRedrawKey = $state<string | undefined>();
	const caligraphyRedrawKey = $derived(
		`${caligraphyAnimationConfig.speedLevel}-${caligraphyForceRedrawKey}`
	);

	const asciiToCharacter = $derived.by(() => {
		const characterMap = charactersToAsciiMap([
			...characters.hiragana.values(),
			...characters.katakana.values(),
		]);
		return (k: string) => characterMap.get(k);
	});
	let chars = $derived(convertAsciiToCharacters(asciiToCharacter, wordToGuess.ascii));

	type DisplayMode = 'GUESS' | 'SOLUTION';
	let displayMode = $state<DisplayMode>('GUESS');
	let showControls = $derived(displayMode !== 'GUESS');
	let isError = $state(false); // is used for out animation direction
	let currentSwipe = $state<'RIGHT' | 'LEFT' | null>(null);

	const resetDisplayMode = () => {
		displayMode = 'GUESS';
	};
	const preventBubble = (cb: () => void) => (event: Event) => {
		event.preventDefault();
		event.stopPropagation();
		cb();
	};

	const handleSuccess = () => {
		isError = false;

		onGuessSucess(wordToGuess);
		resetDisplayMode();
	};
	const handleError = () => {
		isError = true;

		// TODO @tpriou display other controls to input errors?
		onGuessError(wordToGuess);
		resetDisplayMode();
	};

	const handleContainerClick = () => {
		if (displayMode === 'GUESS') {
			displayMode = 'SOLUTION';
			return;
		}
		if (displayMode === 'SOLUTION') {
			caligraphyForceRedrawKey = `${Math.random()}`;
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
		if (displayMode !== 'SOLUTION') {
			return;
		}
		currentSwipe = onToucheMove(event);
	};

	let delayedChars = $derived(getDelayedChars(chars));

	let clientWidth = $state(0);

	const romanji = $derived(charactersToRomanji(chars));
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
			<!-- TODO in/out animation may not be relevant in this component  -->
			{const outDuration = 250}
			{const inDuration = 100}
			<div
				class="text-container"
				out:fly={{
					x: isError ? -clientWidth / 2 : clientWidth / 2,
					duration: outDuration,
					opacity: 0,
				}}
				in:fade={{ delay: outDuration, duration: inDuration }}
				class:swiping-left={currentSwipe === 'LEFT'}
				class:swiping-right={currentSwipe === 'RIGHT'}
			>
				<div>
					{#key caligraphyRedrawKey}
						{#each delayedChars as character, i (character.kanaType + character.id + i)}
							<span class="character-item">
								<CharacterContainer
									id={`${character.kanaType}-${character.id}-${i}`}
									delay={character.delay}
									{...caligraphyAnimationConfig}
									extraDelay={caligraphyForceRedrawKey ? 0 : outDuration + inDuration}
									{character}
								/>
							</span>
						{/each}
					{/key}
				</div>

				<p class:text-container-row-hidden={displayMode === 'GUESS'}>
					{#each romanji as romanjiItem, i (romanjiItem + i)}
						<span class="romanji" in:fade={{ duration: 300 }}>{romanjiItem}</span>
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
		user-select: none;
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

		--tranform-rotate: 0;
		transform: rotateZ(var(--tranform-rotate));
		transform-origin: bottom;
	}

	.text-container.swiping-left {
		--tranform-rotate: -5deg;
	}
	.text-container.swiping-right {
		--tranform-rotate: 5deg;
	}

	.text-container-row-hidden {
		opacity: 0;
	}

	.character-item {
		display: inline-flex;
		width: var(--size);
		height: var(--size);
		align-items: center;
		justify-content: center;
	}

	.romanji {
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
