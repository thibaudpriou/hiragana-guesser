<script lang="ts">
	import { fade } from 'svelte/transition';
	import CharacterContainer from './CharacterContainer.svelte';
	import type { Character } from '../../types';
	import { pickRandomElement } from '$lib/math/pick-random-element';

	const DEFAULT_ANIMATION_DELAY_MS = 300;
	const DEFAULT_ANIMATION_SPACING_MS = 100;

	// TODO @tpriou mutualize w/ word-guesser

	type Props = {
		characters: Character[];
	};

	let { characters = [] }: Props = $props();

	const getRandomKey = () => `${Math.random()}`;
	let forceRerenderKey = $state(getRandomKey());

	const getRandomChar = (): Character => {
		return pickRandomElement(characters);
	};

	let character = $state(getRandomChar());
	let displayName = $state(false);

	const handleClick = () => {
		if (!displayName) {
			displayName = true;
			return;
		}

		character = getRandomChar();
		forceRerenderKey = getRandomKey();
		displayName = false;
	};
</script>

<div class="container" onclick={handleClick} onkeydown={handleClick} tabindex="0" role="button">
	<div>
		{#key forceRerenderKey}
			<span class="item">
				<CharacterContainer
					id={`${character.id}`}
					animationDurationMs={displayName ? 0 : DEFAULT_ANIMATION_DELAY_MS}
					animationSpacingMs={displayName ? 0 : DEFAULT_ANIMATION_SPACING_MS}
					{character}
				/>
			</span>
		{/key}
	</div>

	<div>
		{#if displayName}
			<span class="name" in:fade={{ duration: 300 }}>{character.name}</span>
		{/if}
	</div>
</div>

<style>
	.container {
		--size: 1em;
		display: flex;
		width: 100%;
		height: 100%;
		align-items: center;
		justify-content: start;
		font-size: 10vw;
		box-sizing: content-box;
		flex-direction: column;
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
