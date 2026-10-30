<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { shuffleArray } from '$lib/helpers/shuffleArray';
	import type { Character, CharacterIdObject, KanaType } from '../../types/character';
	import CharacterContainer from './CharacterContainer.svelte';

	type Props = {
		guessOptions: { character: Character<KanaType>; otherChoices: Character<KanaType>[] };
		onGuessSucess: (guessId: CharacterIdObject) => void;
		onGuessError: (guessId: CharacterIdObject, guessErrorId: CharacterIdObject) => void;
	};

	let { guessOptions, onGuessSucess, onGuessError }: Props = $props();

	const transitionRenderKey = $derived(`${guessOptions.character.id}-${Math.random()}`);

	type DisplayMode = 'GUESS' | 'SOLUTION';
	let displayMode = $state<DisplayMode>('GUESS');
	let guessErrorId = $state<CharacterIdObject | null>(null);
	const resetDisplayMode = () => {
		displayMode = 'GUESS';
	};

	const handleGuessContainerClick = () => {
		if (displayMode !== 'SOLUTION') {
			// only after a character has been chosen
			return;
		}

		if (guessErrorId) {
			onGuessError(guessOptions.character, guessErrorId);
		} else {
			onGuessSucess(guessOptions.character);
		}
		resetDisplayMode();
	};

	let choices = $derived.by(() => {
		return shuffleArray([guessOptions.character, ...guessOptions.otherChoices]);
	});

	const onChoiceClick = (id: Character<KanaType>['id'], kanaType: KanaType) => {
		displayMode = 'SOLUTION';
		if (guessOptions.character.id === id && guessOptions.character.kanaType === kanaType) {
			guessErrorId = null;
		} else {
			guessErrorId = { id, kanaType };
		}
	};

	const isItemViewDefault = (id: Character<KanaType>['id'], kanaType: KanaType) => {
		if (displayMode === 'GUESS') {
			return true;
		}

		return (
			(id !== guessOptions.character.id || kanaType !== guessOptions.character.kanaType) &&
			(id !== guessErrorId?.id || kanaType !== guessErrorId?.kanaType)
		);
	};
	const isItemViewError = (id: Character<KanaType>['id'], kanaType: KanaType) => {
		if (displayMode === 'GUESS') {
			return false;
		}

		return id === guessErrorId?.id && kanaType === guessErrorId?.kanaType;
	};
	const isItemViewSuccess = (id: Character<KanaType>['id'], kanaType: KanaType) => {
		if (displayMode === 'GUESS') {
			return false;
		}

		return id === guessOptions.character.id && kanaType === guessOptions.character.kanaType;
	};

	let clientWidth = $state(0);
</script>

<div class="romanji-guesser" bind:clientWidth>
	{#key transitionRenderKey}
		<!-- TODO in/out animation may not be relevant in this component  -->
		{const outDuration = 250}
		{const inDuration = 100}
		<div
			class="container-transition"
			out:fly={{
				x: guessErrorId !== null ? -clientWidth / 2 : clientWidth / 2,
				duration: outDuration,
				opacity: 0,
			}}
			in:fade={{ delay: outDuration, duration: inDuration }}
		>
			<div
				class="container-guess"
				onclick={handleGuessContainerClick}
				onkeydown={handleGuessContainerClick}
				tabindex="0"
				role="button"
			>
				<span class="romanji">{guessOptions.character.romanji}</span>
			</div>

			<div class="container-choices">
				{#each choices as character, i (character.kanaType + character.id + i)}
					{@const id = character.id}
					{@const kanaType = character.kanaType}
					<div
						class="character-item"
						class:preset-filled-surface-300-700={isItemViewDefault(id, kanaType)}
						class:fill-surface-950-50={isItemViewDefault(id, kanaType)}
						class:preset-filled-error-300-700={isItemViewError(id, kanaType)}
						class:fill-error-950-50={isItemViewError(id, kanaType)}
						class:preset-filled-success-300-700={isItemViewSuccess(id, kanaType)}
						class:fill-success-950-50={isItemViewSuccess(id, kanaType)}
						onclick={() => onChoiceClick(id, kanaType)}
						onkeydown={() => onChoiceClick(id, kanaType)}
						tabindex="0"
						role="button"
					>
						<CharacterContainer
							id={`${character.id}-${i}`}
							{character}
							inheritColors
							strokeDurationMs={0}
							characterSpacingMs={0}
							strokeSpacingMs={0}
						/>
					</div>
				{/each}
			</div>
		</div>
	{/key}
</div>

<style>
	.romanji-guesser {
		--size: 1em;
		width: 100%;
		height: 100%;
		font-size: 10vw;
		padding: 0 1em;
		user-select: none;
	}

	.container-transition {
		display: flex;
		min-height: 100%;
		flex-direction: column;
	}

	.container-choices {
		display: flex;
		justify-content: center;
		gap: 0.5em;
		margin: 1em 0;
	}

	.character-item {
		display: inline-flex;
		width: var(--size);
		height: var(--size);
		align-items: center;
		justify-content: center;

		border-radius: 0.2em;
		padding: 0.2em 0.1em;
	}

	.container-guess {
		flex-grow: 1;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.romanji {
		display: inline-flex;
		user-select: none;
		font-size: var(--size);
	}
</style>
