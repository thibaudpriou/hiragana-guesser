<script lang="ts">
	import { fade } from 'svelte/transition';
	import CharacterContainer from './CharacterContainer.svelte';
	import type { Character } from '../../types';
	import { SvelteMap } from 'svelte/reactivity';
	import type { WordEntry } from '../../types/wordEntry';
	import { getDelayedChars } from '$lib/caligraphy/get-delayed-characters';

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

	const charsToSet = (arr: Character[]): SvelteMap<string, Character> => {
		const set = new SvelteMap<string, Character>();
		for (const char of arr) {
			set.set(char.ascii, char);
		}
		return set;
	};

	const charactersSet = $derived(charsToSet(characters));

	/**
	 * Converts ASCII string to array of characters
	 */
	const wordToCharacters = (str: string[]): Character[] => {
		const converted = str.map((c) => {
			return charactersSet.get(c);
		});

		const defined = converted.filter(Boolean) as Character[];
		// TODO handle error / mismatch between length
		return defined;
	};

	let guess = $derived(getRandomEl(words));
	let chars = $derived(wordToCharacters(guess.reading));
	let displayName = $state(false);
	let displayTranslation = $state(false);

	const handleClick = () => {
		if (!displayName) {
			displayName = true;
			displayTranslation = true;
			return;
		}

		guess = getRandomEl(words);
		forceRerenderKey = getRandomKey();
		displayName = false;
		displayTranslation = false;
	};

	let delayedChars = $derived.by(() => getDelayedChars(chars));

	// TODO add Sokuon さって＝s
</script>

<div class="container" onclick={handleClick} onkeydown={handleClick} tabindex="0" role="button">
	<div>
		{#key forceRerenderKey}
			{#each delayedChars as character, i (character.id + i)}
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
		{/key}
	</div>

	<p class:container-row-hidden={!displayName}>
		{#each delayedChars as char, i (char.name + i)}
			<span class="name" in:fade={{ duration: 300 }}>{char.name}</span>
		{/each}
	</p>

	<p class="text-sm" class:container-row-hidden={!displayTranslation} in:fade={{ duration: 300 }}>
		({guess.meaning})
	</p>
</div>

<style>
	.container {
		--size: 1em;
		display: flex;
		width: 100%;
		height: 100%;
		align-items: center;
		justify-content: center;
		font-size: 10vw;
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
</style>
