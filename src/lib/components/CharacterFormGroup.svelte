<script lang="ts">
	import { ListPlus, ListX } from '@lucide/svelte';
	import type { Character } from '../../types/character';
	import CharacterContainerWithRomanji from './CharacterContainerWithRomanji.svelte';

	type Props = {
		characters: Array<null | Character>;
		isActive: (id: Character) => boolean;
		selectCharacters: (ids: Character[]) => void;
		deselectCharacters: (ids: Character[]) => void;
		reset: (shouldSelectAll: boolean) => void;
	};

	const { characters, isActive, selectCharacters, deselectCharacters, reset }: Props = $props();

	const definedCharacters = $derived(characters.filter(Boolean) as Character[]);
	const isGroupActive = $derived(definedCharacters.every(isActive));

	const handleCharacterClick = (character: Character) => {
		if (isActive(character)) {
			deselectCharacters([character]);
			return;
		}
		selectCharacters([character]);
	};

	const handleCharacterGroupClick = (event: UIEvent) => {
		if (event.detail > 1) {
			return; // already handled by double click listener
		}

		if (isGroupActive) {
			deselectCharacters(definedCharacters);
			return;
		}
		selectCharacters(definedCharacters);
	};

	const handleCharacterGroupDblClick = $derived(() => {
		const shouldSelectAll = isGroupActive;
		reset(shouldSelectAll);
	});
</script>

<section class="form-rows">
	<div class="grid grid-rows-5 container-character-button">
		{#each characters as character, idx (character?.id ?? idx)}
			{#if character === null}
				<!-- placeholder -->
				<span></span>
			{:else if character.romanji === null}
				<!-- not supported -->
				<span></span>
			{:else}
				<button
					type="button"
					class="btn character-button"
					onclick={() => handleCharacterClick(character)}
				>
					<CharacterContainerWithRomanji {character} active={isActive(character)} />
				</button>
			{/if}
		{/each}
	</div>

	<button
		type="button"
		class="btn-icon form-row-btn"
		class:preset-filled-secondary-500={isGroupActive}
		class:preset-outlined-secondary-500={!isGroupActive}
		onclick={handleCharacterGroupClick}
		ondblclick={handleCharacterGroupDblClick}
	>
		{#if isGroupActive}
			<ListPlus class="" />
		{:else}
			<ListX class="" />
		{/if}
	</button>
</section>

<style>
	.form-rows {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 3em;
	}

	.container-character-button {
		gap: 0.75em;
	}

	.character-button {
		padding: 0;
	}

	.form-row-btn {
		border: 1px transparent;
	}
</style>
