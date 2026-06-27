<script lang="ts">
	import type { Character } from '../../types';
	import CharacterContainer from './CharacterContainer.svelte';

	let { character, active = false } = $props<{
		character: Character;
		active?: boolean;
	}>();
</script>

<div class="container" class:active>
	<CharacterContainer
		id={character.id}
		animationDurationMs={0}
		animationSpacingMs={0}
		{character}
		{active}
	/>
	<p>{character.name}</p>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.container.active {
		color: light-dark(var(--color-surface-50), var(--color-surface-950));
		background-color: light-dark(var(--color-surface-950), var(--color-surface-50));
	}
</style>
