<script lang="ts">
	import { shuffleArray } from '$lib/helpers/shuffleArray';
	import type { Character } from '../../types';
	import CharacterContainer from './CharacterContainer.svelte';

	type Props = {
		guessOptions: { character: Character; otherChoices: Character[] };
		onSuccess: (guessId: Character['id']) => void;
		onError: (guessId: Character['id'], guessErrorId: Character['id']) => void;
	};

	let { guessOptions, onSuccess, onError }: Props = $props();

	type DisplayMode = 'GUESS' | 'SOLUTION';
	let displayMode = $state<DisplayMode>('GUESS');
	let guessErrorId = $state<Character['id'] | null>(null);
	const resetDisplayMode = () => {
		displayMode = 'GUESS';
	};

	const handleGuessContainerClick = () => {
		if (displayMode !== 'SOLUTION') {
			// only after a character has been chosen
			return;
		}

		if (guessErrorId) {
			onError(guessOptions.character.id, guessErrorId);
		} else {
			onSuccess(guessOptions.character.id);
		}
		resetDisplayMode();
		guessErrorId = null;
	};

	let choices = $derived.by(() => {
		return shuffleArray([guessOptions.character, ...guessOptions.otherChoices]);
	});

	const onChoiceClick = (id: Character['id']) => {
		displayMode = 'SOLUTION';
		if (guessOptions.character.id === id) {
			// TODO display success mode
		} else {
			// TODO display success mode + error
			guessErrorId = id;
		}
	};

	const isItemViewDefault = (id: Character['id']) => {
		if (displayMode === 'GUESS') {
			return true;
		}

		return id !== guessOptions.character.id && id !== guessErrorId;
	};
	const isItemViewError = (id: Character['id']) => {
		if (displayMode === 'GUESS') {
			return false;
		}

		return id === guessErrorId;
	};
	const isItemViewSuccess = (id: Character['id']) => {
		if (displayMode === 'GUESS') {
			return false;
		}

		return id === guessOptions.character.id;
	};
</script>

<div class="romanji-guesser">
	<div
		class="guess-container"
		onclick={handleGuessContainerClick}
		onkeydown={handleGuessContainerClick}
		tabindex="0"
		role="button"
	>
		<span class="romanji">{guessOptions.character.romanji}</span>
	</div>

	<div class="container-choices">
		{#each choices as character, i (character.id + i)}
			{@const id = character.id}
			<div
				class="character-item"
				class:preset-filled-surface-300-700={isItemViewDefault(id)}
				class:fill-surface-950-50={isItemViewDefault(id)}
				class:preset-filled-error-300-700={isItemViewError(id)}
				class:fill-error-950-50={isItemViewError(id)}
				class:preset-filled-success-300-700={isItemViewSuccess(id)}
				class:fill-success-950-50={isItemViewSuccess(id)}
				onclick={() => onChoiceClick(id)}
				onkeydown={() => onChoiceClick(id)}
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

<style>
	.romanji-guesser {
		--size: 1em;
		display: flex;
		width: 100%;
		height: 100%;
		font-size: 10vw;
		flex-direction: column;
		padding: 0 1em;
		user-select: none;
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

	.guess-container {
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
