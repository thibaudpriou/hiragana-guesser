<script lang="ts">
	import CharacterContainerWithName from '$lib/components/CharacterContainerWithName.svelte';
	import { hiragana } from '$lib/components/syllabaries/hiragana';
	import type { Character } from '../../types';
	import { getSelectedHiraganaState } from '$lib/states/selectedHiragana.svelte';

	const selected = getSelectedHiraganaState();

	const isActive = (id: Character['id']) => selected.has(id);
	const handleCharacterClick = (id: Character['id']) => () => {
		if (selected.has(id)) {
			selected.delete(id);
			return;
		}
		selected.add(id);
	};
</script>

{#snippet ControlledCharacterGroup(characters: Character[])}
	{#each characters as character (character.id)}
		<span class="character-checkbox-container">
			<button type="button" class="btn" onclick={handleCharacterClick(character.id)}>
				<CharacterContainerWithName {character} active={isActive(character.id)} />
			</button>
		</span>
	{/each}
{/snippet}

<div class="form-container">
	<div class="form-row">
		{@render ControlledCharacterGroup([hiragana.A, hiragana.I, hiragana.U, hiragana.E, hiragana.O])}
	</div>
	<hr class="hr" />
	<div class="form-row">
		{@render ControlledCharacterGroup([
			hiragana.KA,
			hiragana.KI,
			hiragana.KU,
			hiragana.KE,
			hiragana.KO
		])}
	</div>
	<hr class="hr" />
	<div class="form-row">
		{@render ControlledCharacterGroup([
			hiragana.SA,
			hiragana.SHI,
			hiragana.SU,
			hiragana.SE,
			hiragana.SO
		])}
	</div>
	<hr class="hr" />
	<div class="form-row">
		{@render ControlledCharacterGroup([
			hiragana.TA,
			hiragana.CHI,
			hiragana.TSU,
			hiragana.TE,
			hiragana.TO
		])}
	</div>
	<hr class="hr" />
	<div class="form-row">
		{@render ControlledCharacterGroup([
			hiragana.NA,
			hiragana.NE,
			hiragana.NU,
			hiragana.NI,
			hiragana.NO
		])}
	</div>
	<hr class="hr" />
	<div class="form-row">
		{@render ControlledCharacterGroup([
			hiragana.GA,
			hiragana.GI,
			hiragana.GU,
			hiragana.GE,
			hiragana.GO
		])}
	</div>
	<hr class="hr" />
	<div class="form-row">
		{@render ControlledCharacterGroup([
			hiragana.ZA,
			hiragana.JI,
			hiragana.ZU,
			hiragana.ZE,
			hiragana.ZO
		])}
	</div>
	<hr class="hr" />
	<div class="form-row">
		{@render ControlledCharacterGroup([
			hiragana.DA,
			hiragana.JI2,
			hiragana.ZU2,
			hiragana.DE,
			hiragana.DO
		])}
	</div>
</div>

<style>
	.form-row {
		display: flex;
		flex-direction: row;
	}
	.form-container {
		display: flex;
		flex-direction: column;
	}

	.character-checkbox-container {
		padding: 1em;
	}
</style>
