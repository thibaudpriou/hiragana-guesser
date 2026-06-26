<script lang="ts">
	import type { Character } from '../../types';
	import CharacterContainer from './CharacterContainer.svelte';

	let { character } = $props<{
		character: Character;
	}>();
</script>

<div class="container">
	<CharacterContainer
		id={character.id}
		animationDurationMs={0}
		animationSpacingMs={0}
		{character}
	/>
	<p>{character.name}</p>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
