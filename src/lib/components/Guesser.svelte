<script lang="ts">
	import { fade } from 'svelte/transition';
	import CharacterContainer from './CharacterContainer.svelte';
	import type { Character } from '../../types';

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

	let chars = getRandomChars();
	let displayName = $state(false);

	const handleClick = () => {
		if (!displayName) {
			displayName = true;
			return;
		}

		chars = getRandomChars();
		displayName = false;
	};

	type DelayedCharacter = Character & { strokeDelay: number };

	// TODO move to $lib/utils
	const getDelayedChars = (arr: Character[]) =>
		arr.reduce((delayed, el) => {
			const strokeDelay = delayed.reduce((nb, el) => nb + el.strokes, 0);

			return [...delayed, { ...el, strokeDelay }];
		}, [] as DelayedCharacter[]);

	let delayedChars = $derived.by(() => getDelayedChars(chars));
</script>

<div class="container" onclick={handleClick} onkeydown={handleClick} tabindex="0" role="button">
	{#each delayedChars as char, i (char.name + i)}
		{@const uniqueId = '' + i}
		<span class="item">
			{#if displayName}
				<span class="name" in:fade={{ duration: 300 }}>{char.name}</span>
			{:else}
				<CharacterContainer
					id={char.name}
					strokeDelayMs={char.strokeDelay}
					animationDurationMs={300}
					animationSpacingMs={100}
				>
					{#snippet svgContent()}
						<char.component id={uniqueId} />
					{/snippet}
				</CharacterContainer>
			{/if}
		</span>
	{/each}
</div>

<style>
	.container {
		display: flex;
		font-size: 20vw;
		box-sizing: content-box;
	}

	.item {
		display: inline-flex;
		width: 1em;
		height: 1em;
		align-items: center;
		justify-content: center;
	}

	.name {
		user-select: none;
		font-size: 0.5em;
	}
</style>
