<script lang="ts">
	import { hiragana } from '$lib/components/syllabaries/hiragana';
	import { configStore } from '$lib/stores/config.svelte';
	import type { Character } from '../../types';
	import { MoveRight } from '@lucide/svelte';
	import { page } from '$app/state';
	import { GOTO_SEARCH_PARAM_NAME } from '../../constants';
	import { resolve } from '$app/paths';
	import { validateSelectionNextPage } from '$lib/navigation/selection-next-page';
	import { onMount } from 'svelte';
	import CharacterFormGroup from '$lib/components/CharacterFormGroup.svelte';

	const isActive = (character: Character) => $configStore.selectedHiragana.has(character.id);
	const selectCharacters = (characters: Character[]) => {
		characters.forEach((item) => configStore.selectedHiragana.add(item.id));
	};
	const deselectCharacters = (characters: Character[]) => {
		characters.forEach((item) => configStore.selectedHiragana.delete(item.id));
	};

	const getNextPageUrl = (searchParams: URLSearchParams) => {
		const goto = searchParams.get(GOTO_SEARCH_PARAM_NAME);
		if (!goto || !validateSelectionNextPage(goto)) {
			return null;
		}

		return goto;
	};

	let nextPageUrl = $state<ReturnType<typeof getNextPageUrl>>(null);
	onMount(() => {
		nextPageUrl = getNextPageUrl(page.url.searchParams);
	});

	const characterFormGroupProps = {
		selectCharacters,
		deselectCharacters,
		isActive,
		reset: (shouldSelectAll?: boolean) => {
			configStore.selectedHiragana.reset(shouldSelectAll);
		},
	};
</script>

<div class="select-characters">
	<div class="form-container">
		<div class="form">
			<CharacterFormGroup
				{...characterFormGroupProps}
				characters={[hiragana.A, hiragana.I, hiragana.U, hiragana.E, hiragana.O]}
			/>
			<CharacterFormGroup
				{...characterFormGroupProps}
				characters={[hiragana.KA, hiragana.KI, hiragana.KU, hiragana.KE, hiragana.KO]}
			/>
			<CharacterFormGroup
				{...characterFormGroupProps}
				characters={[hiragana.SA, hiragana.SHI, hiragana.SU, hiragana.SE, hiragana.SO]}
			/>
			<CharacterFormGroup
				{...characterFormGroupProps}
				characters={[hiragana.TA, hiragana.CHI, hiragana.TSU, hiragana.TE, hiragana.TO]}
			/>
			<CharacterFormGroup
				{...characterFormGroupProps}
				characters={[hiragana.NA, hiragana.NI, hiragana.NU, hiragana.NE, hiragana.NO]}
			/>
			<CharacterFormGroup
				{...characterFormGroupProps}
				characters={[hiragana.HA, hiragana.HI, hiragana.FU, hiragana.HE, hiragana.HO]}
			/>
			<CharacterFormGroup
				{...characterFormGroupProps}
				characters={[hiragana.MA, hiragana.MI, hiragana.MU, hiragana.ME, hiragana.MO]}
			/>
			<CharacterFormGroup
				{...characterFormGroupProps}
				characters={[hiragana.YA, null, hiragana.YU, null, hiragana.YO]}
			/>
			<CharacterFormGroup
				{...characterFormGroupProps}
				characters={[hiragana.RA, hiragana.RI, hiragana.RU, hiragana.RE, hiragana.RO]}
			/>
			<CharacterFormGroup
				{...characterFormGroupProps}
				characters={[hiragana.WA, null, hiragana.WO, null, hiragana.N]}
			/>

			<span class="vr"></span>

			<CharacterFormGroup
				{...characterFormGroupProps}
				characters={[hiragana.GA, hiragana.GI, hiragana.GU, hiragana.GE, hiragana.GO]}
			/>
			<CharacterFormGroup
				{...characterFormGroupProps}
				characters={[hiragana.ZA, hiragana.JI, hiragana.ZU, hiragana.ZE, hiragana.ZO]}
			/>
			<CharacterFormGroup
				{...characterFormGroupProps}
				characters={[hiragana.DA, hiragana.JI2, hiragana.ZU2, hiragana.DE, hiragana.DO]}
			/>
			<CharacterFormGroup
				{...characterFormGroupProps}
				characters={[hiragana.BA, hiragana.BI, hiragana.BU, hiragana.BE, hiragana.BO]}
			/>
			<CharacterFormGroup
				{...characterFormGroupProps}
				characters={[hiragana.PA, hiragana.PI, hiragana.PU, hiragana.PE, hiragana.PO]}
			/>
		</div>
	</div>

	{#if nextPageUrl !== null}
		<div class="container-actions">
			<a href={resolve(nextPageUrl)} class="action-link">
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

	.container-actions {
		display: flex;
		justify-content: flex-end;
	}

	.action-link {
		display: inline-flex;
	}
</style>
