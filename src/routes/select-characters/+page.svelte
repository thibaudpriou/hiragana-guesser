<script lang="ts">
	import CharacterContainerWithRomanji from '$lib/components/CharacterContainerWithRomanji.svelte';
	import { hiragana } from '$lib/components/syllabaries/hiragana';
	import { configStore } from '$lib/stores/config.svelte';
	import type { Character } from '../../types';
	import { ListPlus, ListX, MoveRight } from '@lucide/svelte';
	import { page } from '$app/state';
	import { GOTO_SEARCH_PARAM_NAME } from '../../constants';
	import { resolve } from '$app/paths';
	import { validateSelectionNextPage } from '$lib/navigation/selection-next-page';
	import { onMount } from 'svelte';

	const isActive = (id: Character['id']) => $configStore.selectedHiragana.has(id);
	const handleCharacterClick = (id: Character['id']) => () => {
		if ($configStore.selectedHiragana.has(id)) {
			configStore.selectedHiragana.delete(id);
			return;
		}
		configStore.selectedHiragana.add(id);
	};

	const isGroupActive = (characters: Character[]) => {
		return characters.every((character) => !character || isActive(character.id));
	};
	const handleCharacterGroupClick = (characters: Character[]) => (event: UIEvent) => {
		if (event.detail > 1) {
			return; // already handled by double click listener
		}

		if (isGroupActive(characters)) {
			characters.forEach((item) => $configStore.selectedHiragana.delete(item.id));
			return;
		}
		characters.forEach((item) => $configStore.selectedHiragana.add(item.id));
	};

	const handleCharacterGroupDblClick = (isCurrentlyActive: boolean) => () => {
		const shouldSelectAll = isCurrentlyActive;
		configStore.selectedHiragana.reset(shouldSelectAll);
	};

	const getNextPageUrl = (searchParams: URLSearchParams) => {
		const goto = searchParams.get(GOTO_SEARCH_PARAM_NAME);
		if (!goto || !validateSelectionNextPage(goto)) {
			return null;
		}

		return resolve(goto);
	};

	let nextPageUrl = $state<null | string>(null);
	onMount(() => {
		nextPageUrl = getNextPageUrl(page.url.searchParams);
	});
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
				{:else if character.romanji === null}
					<!-- not supported -->
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
			class:preset-outlined-secondary-500={!active}
			onclick={handleCharacterGroupClick(definedCharacters)}
			ondblclick={handleCharacterGroupDblClick(active)}
		>
			{#if active}
				<ListPlus />
			{:else}
				<ListX />
			{/if}
		</button>
	</section>
{/snippet}

<div class="select-characters">
	<div class="form-container">
		<div class="form">
			{@render ControlledCharacterGroup([
				hiragana.A,
				hiragana.I,
				hiragana.U,
				hiragana.E,
				hiragana.O,
			])}
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
			{@render ControlledCharacterGroup([hiragana.WA, null, hiragana.WO, null, hiragana.N])}

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
			{@render ControlledCharacterGroup([
				hiragana.BA,
				hiragana.BI,
				hiragana.BU,
				hiragana.BE,
				hiragana.BO,
			])}
			{@render ControlledCharacterGroup([
				hiragana.PA,
				hiragana.PI,
				hiragana.PU,
				hiragana.PE,
				hiragana.PO,
			])}
		</div>
	</div>

	{#if nextPageUrl !== null}
		<div class="container-actions">
			<a href={nextPageUrl} class="action-link">
				<button class="btn preset-filled-surface-300-700 fill-surface-950-50 button-link">
					Play <MoveRight />
				</button>
			</a>
		</div>
	{/if}
</div>

<style>
	.select-characters {
		display: flex;
		flex-direction: column;
		height: 100%;
		font-size: 6vw;
		padding: 0.5em 1em;
		justify-content: space-between;
		gap: 0.5em;
	}

	.form-container {
		overflow: scroll;
		height: 100%;
		display: flex;
		align-items: center;
	}

	.form {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		justify-self: start;
		gap: 0.75em;
		overflow: scroll;
		flex-grow: 1;
		flex-shrink: 0;
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

	.container-actions {
		display: flex;
		justify-content: flex-end;
	}

	.action-link {
		display: inline-flex;
	}
</style>
