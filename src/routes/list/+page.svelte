<script lang="ts">
	import CharacterContainerWithName from '$lib/components/CharacterContainerWithName.svelte';
	import { hiragana } from '$lib/components/syllabaries/hiragana';
	import { ToggleGroup } from '@skeletonlabs/skeleton-svelte';
	import type { Character } from '../../types';

	let value = $state(Object.values(hiragana).map((character) => character.id));
</script>

{#snippet ControlledCharacterGroup(characters: Character[])}
	{#each characters as character (character.id)}
		<span class="character-container">
			<ToggleGroup.Item value={character.id}>
				<CharacterContainerWithName {character} />
			</ToggleGroup.Item>
		</span>
	{/each}
{/snippet}

<!-- TODO @tpriou continue work -->
<ToggleGroup {value} onValueChange={(details) => (value = details.value)} multiple>
	<div class="form-container">
		<div class="form-row">
			{@render ControlledCharacterGroup([
				hiragana.A,
				hiragana.I,
				hiragana.U,
				hiragana.E,
				hiragana.O
			])}
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
</ToggleGroup>

<style>
	.form-row {
		display: flex;
		flex-direction: row;
	}
	.form-container {
		display: flex;
		flex-direction: column;
	}

	.character-container {
		padding: 1em;
	}
</style>
