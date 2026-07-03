<script lang="ts">
	import CharacterContainerWithRomanji from '$lib/components/CharacterContainerWithRomanji.svelte';
	import { hiragana } from '$lib/components/syllabaries/hiragana';
	import { configStore } from '$lib/stores/config.svelte';
	import type { Character } from '../../types';
	import { ListPlus, ListX } from '@lucide/svelte';

	const selected = $configStore.selectedHiragana;

	const isActive = (id: Character['id']) => selected.has(id);
	const handleCharacterClick = (id: Character['id']) => () => {
		if (selected.has(id)) {
			configStore.selectedHiragana.delete(id);
			return;
		}
		configStore.selectedHiragana.add(id);
	};

	const isGroupActive = (characters: Character[]) => {
		return characters.every((character) => !character || isActive(character.id));
	};
	const handleCharacterGroupClick = (characters: Character[]) => () => {
		if (isGroupActive(characters)) {
			characters.forEach((item) => selected.delete(item.id));
			return;
		}
		characters.forEach((item) => selected.add(item.id));
	};
</script>

{#snippet ControlledCharacterGroup(characters: Array<null | Character>)}
	{@const definedCharacters = characters.filter(Boolean) as Character[]}
	{@const active = isGroupActive(definedCharacters)}
	<section class="form-row">
		<div class="grid grid-rows-5 container-character-button">
			{#each characters as character, idx (character?.id ?? idx)}
				{#if character === null}
					<!-- placeholder -->
					<span></span>
				{:else}
					<button
						type="button"
						class="btn character-button"
						onclick={handleCharacterClick(character.id)}
					>
						<CharacterContainerWithRomanji {character} active={isActive(character.id)} />
					</button>
				{/if}
			{/each}
		</div>

		<button
			type="button"
			class="btn-icon"
			class:preset-filled-secondary-500={active}
			onclick={handleCharacterGroupClick(definedCharacters)}
		>
			{#if active}
				<ListPlus />
			{:else}
				<ListX />
			{/if}
		</button>
	</section>
{/snippet}

<div class="form-container">
	{@render ControlledCharacterGroup([hiragana.A, hiragana.I, hiragana.U, hiragana.E, hiragana.O])}
	{@render ControlledCharacterGroup([
		hiragana.KA,
		hiragana.KI,
		hiragana.KU,
		hiragana.KE,
		hiragana.KO,
	])}
	{@render ControlledCharacterGroup([
		hiragana.SA,
		hiragana.SHI,
		hiragana.SU,
		hiragana.SE,
		hiragana.SO,
	])}
	{@render ControlledCharacterGroup([
		hiragana.TA,
		hiragana.CHI,
		hiragana.TSU,
		hiragana.TE,
		hiragana.TO,
	])}
	{@render ControlledCharacterGroup([
		hiragana.NA,
		hiragana.NE,
		hiragana.NU,
		hiragana.NI,
		hiragana.NO,
	])}
	{@render ControlledCharacterGroup([
		hiragana.HA,
		hiragana.HI,
		hiragana.FU,
		hiragana.HE,
		hiragana.HO,
	])}
	{@render ControlledCharacterGroup([
		hiragana.MA,
		hiragana.ME,
		hiragana.MU,
		hiragana.MI,
		hiragana.MO,
	])}
	{@render ControlledCharacterGroup([hiragana.YA, null, hiragana.YU, null, hiragana.YO])}
	{@render ControlledCharacterGroup([
		hiragana.RA,
		hiragana.RE,
		hiragana.RU,
		hiragana.RI,
		hiragana.RO,
	])}

	<span class="vr"></span>

	{@render ControlledCharacterGroup([
		hiragana.GA,
		hiragana.GI,
		hiragana.GU,
		hiragana.GE,
		hiragana.GO,
	])}
	{@render ControlledCharacterGroup([
		hiragana.ZA,
		hiragana.JI,
		hiragana.ZU,
		hiragana.ZE,
		hiragana.ZO,
	])}
	{@render ControlledCharacterGroup([
		hiragana.DA,
		hiragana.JI2,
		hiragana.ZU2,
		hiragana.DE,
		hiragana.DO,
	])}
</div>

<style>
	.form-container {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: fit-content;
		justify-self: start;
		font-size: 6vw;
		gap: 0.75em;
		padding: 2em 1em;
		height: 100%;
	}

	.form-row {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 3em;
	}

	.character-button {
		padding: 0;
	}

	.container-character-button {
		gap: 0.75em;
	}
</style>
