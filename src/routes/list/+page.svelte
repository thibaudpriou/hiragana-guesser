<script lang="ts">
	import CharacterContainerWithRomanji from '$lib/components/CharacterContainerWithRomanji.svelte';
	import { hiragana } from '$lib/components/syllabaries/hiragana';
	import type { Character } from '../../types';
	import { getSelectedHiraganaState } from '$lib/states/selectedHiragana.svelte';
	import { Group } from '@lucide/svelte';

	const selected = getSelectedHiraganaState();

	const isActive = (id: Character['id']) => selected.has(id);
	const handleCharacterClick = (id: Character['id']) => () => {
		if (selected.has(id)) {
			selected.delete(id);
			return;
		}
		selected.add(id);
	};

	const isGroupActive = (characters: Character[]) => {
		return characters.every((character) => isActive(character.id));
	};
	const handleCharacterGroupClick = (characters: Character[]) => () => {
		if (isGroupActive(characters)) {
			characters.forEach((item) => selected.delete(item.id));
			return;
		}
		characters.forEach((item) => selected.add(item.id));
	};
</script>

{#snippet ControlledCharacterGroup(characters: Character[])}
	{@const active = isGroupActive(characters)}
	<section class="form-row">
		<div>
			{#each characters as character (character.id)}
				<button type="button" class="btn" onclick={handleCharacterClick(character.id)}>
					<CharacterContainerWithRomanji {character} active={isActive(character.id)} />
				</button>
			{/each}
		</div>

		<button
			type="button"
			class="btn"
			class:preset-filled-secondary-500={active}
			class:preset-outlined-secondary-500={!active}
			onclick={handleCharacterGroupClick(characters)}
		>
			<Group />
		</button>
	</section>
{/snippet}

<div class="form-container">
	{@render ControlledCharacterGroup([hiragana.A, hiragana.I, hiragana.U, hiragana.E, hiragana.O])}
	<hr class="hr" />
	{@render ControlledCharacterGroup([
		hiragana.KA,
		hiragana.KI,
		hiragana.KU,
		hiragana.KE,
		hiragana.KO
	])}
	<hr class="hr" />
	{@render ControlledCharacterGroup([
		hiragana.SA,
		hiragana.SHI,
		hiragana.SU,
		hiragana.SE,
		hiragana.SO
	])}
	<hr class="hr" />
	{@render ControlledCharacterGroup([
		hiragana.TA,
		hiragana.CHI,
		hiragana.TSU,
		hiragana.TE,
		hiragana.TO
	])}
	<hr class="hr" />
	{@render ControlledCharacterGroup([
		hiragana.NA,
		hiragana.NE,
		hiragana.NU,
		hiragana.NI,
		hiragana.NO
	])}
	<!-- <hr class="hr" />
	{@render ControlledCharacterGroup([
		hiragana.GA,
		hiragana.GI,
		hiragana.GU,
		hiragana.GE,
		hiragana.GO
	])}
	<hr class="hr" />
	{@render ControlledCharacterGroup([
		hiragana.ZA,
		hiragana.JI,
		hiragana.ZU,
		hiragana.ZE,
		hiragana.ZO
	])}
	<hr class="hr" />
	{@render ControlledCharacterGroup([
		hiragana.DA,
		hiragana.JI2,
		hiragana.ZU2,
		hiragana.DE,
		hiragana.DO
	])} -->
	<hr class="hr" />
	{@render ControlledCharacterGroup([
		hiragana.HA,
		hiragana.HI,
		hiragana.FU,
		hiragana.HE,
		hiragana.HO
	])}
</div>

<style>
	.form-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;
		width: fit-content;
		justify-self: center;
		gap: 0.5em;
	}

	.form-row {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 3em;
		margin-right: -6em;
	}
</style>
