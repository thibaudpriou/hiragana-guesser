<script lang="ts">
	import type { Character } from '../../types';
	import CharacterContainer from './CharacterContainer.svelte';

	let { character } = $props<{
		character: Character;
	}>();
</script>

<div class="container">
	<CharacterContainer strokeDelayMs={0} animationDurationMs={0} animationSpacingMs={0}>
		{#snippet svgContent()}
			<character.component id={character.name} />
		{/snippet}
	</CharacterContainer>
	<p>{character.name}</p>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
