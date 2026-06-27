<script lang="ts">
	import type { Character } from '../../types';
	import CharacterContainer from './CharacterContainer.svelte';

	let { character, active = false } = $props<{
		character: Character;
		active?: boolean;
	}>();
</script>

<span class="container" class:active>
	<CharacterContainer
		id={character.id}
		animationDurationMs={0}
		animationSpacingMs={0}
		{character}
		{active}
	/>
	<p class="romanji">{character.name}</p>
</span>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		max-width: 2em;
		padding: 0.2em 0.1em;
		border-radius: 0.2em;
		gap: 0.2em;
	}

	.container.active {
		color: light-dark(var(--color-secondary-50), var(--color-secondary-950));
		background-color: light-dark(var(--color-secondary-950), var(--color-secondary-50));
	}

	.romanji {
		font-size: 0.5em;
	}
</style>
