<script lang="ts">
	import { fade } from 'svelte/transition';
	import CharacterContainer from './CharacterContainer.svelte';
	import type { Character } from '../../types';

	const DEFAULT_ANIMATION_DELAY_MS = 300;
	const DEFAULT_ANIMATION_SPACING_MS = 100;

	type Props = {
		characters: Character[];
		length: number;
	};

	let { characters = [], length = 3 }: Props = $props();

	const randomInt = (max: number) => Math.floor(Math.random() * max);

	// TODO move to $lib/utils
	const getRandomEl = (arr: Character[]) => {
		const index = randomInt(arr.length);

		return arr.at(index)!;
	};

	// TODO move to $lib/utils
	const getRandomChars = (): Character[] => {
		const sentenceLength = randomInt(length) + 1;

		return Array.from({ length: sentenceLength }, () => getRandomEl(characters));
	};

	let chars = $state(getRandomChars());
	let displayName = $state(false);

	const handleClick = () => {
		if (!displayName) {
			displayName = true;
			return;
		}

		chars = getRandomChars();
		displayName = false;
	};

	type DelayedCharacter = Character & { nbStrokeDelay: number };

	// TODO move to $lib/utils
	const getDelayedChars = (arr: Character[]) =>
		arr.reduce((delayed, el) => {
			const nbStrokeDelay = delayed.reduce((nb, el) => nb + el.nbStrokes, 0);

			return [...delayed, { ...el, nbStrokeDelay }];
		}, [] as DelayedCharacter[]);

	let delayedChars = $derived.by(() => getDelayedChars(chars));
</script>

<div class="container" onclick={handleClick} onkeydown={handleClick} tabindex="0" role="button">
	<div>
		{#each delayedChars as character, i (character.name + i)}
			<span class="item">
				<CharacterContainer
					id={`${character.id}-${i}`}
					nbStrokeDelay={character.nbStrokeDelay}
					animationDurationMs={displayName ? 0 : DEFAULT_ANIMATION_DELAY_MS}
					animationSpacingMs={displayName ? 0 : DEFAULT_ANIMATION_SPACING_MS}
					{character}
				/>
			</span>
		{/each}
	</div>

	<div>
		{#each delayedChars as char, i (char.name + i)}
			{#if displayName}
				<span class="name" in:fade={{ duration: 300 }}>{char.name}</span>
			{/if}
		{/each}
	</div>
</div>

<style>
	.container {
		display: flex;
		font-size: 20vw;
		box-sizing: content-box;
		flex-direction: column;
	}

	.item {
		display: inline-flex;
		width: 0.5em;
		height: 0.5em;
		align-items: center;
		justify-content: center;
	}

	.name {
		display: inline-flex;
		user-select: none;
		font-size: 0.5em;
	}
</style>
