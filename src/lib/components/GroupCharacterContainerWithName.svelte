<script lang="ts">
	import type { Character } from '../../types';
	import CharacterContainerWithName from './CharacterContainerWithName.svelte';

	let { characters } = $props<{
		characters: Character[];
	}>();
</script>

<section class="hiragana-group">
	{#each characters as character (character.id)}
		<CharacterContainerWithName {character} />
	{/each}
</section>

<style>
	.hiragana-group {
		display: flex;
	}
</style>
