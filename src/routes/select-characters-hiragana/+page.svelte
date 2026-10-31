<script lang="ts">
	import { hiragana } from '$lib/components/syllabaries/hiragana';
	import { configStore } from '$lib/stores/config.svelte';
	import type { Character, KanaType } from '../../types';
	import { MoveRight } from '@lucide/svelte';
	import { page } from '$app/state';

	import { resolve } from '$app/paths';
	import { validateGuessModeUrl } from '$lib/navigation/validate-guess-mode-url';
	import { onMount } from 'svelte';
	import CharacterFormGroup from '$lib/components/CharacterFormGroup.svelte';
	import { GUESS_MODE_URL_SEARCH_PARAM_NAME } from '../../constants';

	const isActive = (character: Character<KanaType>) =>
		$configStore.selectedHiragana.has(character.id);
	const selectCharacters = (characters: Character<KanaType>[]) => {
		characters.forEach((item) => configStore.selectedHiragana.add(item.id));
	};
	const deselectCharacters = (characters: Character<KanaType>[]) => {
		characters.forEach((item) => configStore.selectedHiragana.delete(item.id));
	};

	const getGuessModeUrl = (searchParams: URLSearchParams) => {
		const guessNodeUrl = searchParams.get(GUESS_MODE_URL_SEARCH_PARAM_NAME);
		if (!guessNodeUrl || !validateGuessModeUrl(guessNodeUrl)) {
			return null;
		}

		return guessNodeUrl;
	};

	let guessModeUrl = $state<
		null | `/select-characters-katakana?${typeof GUESS_MODE_URL_SEARCH_PARAM_NAME}=${string}`
	>(null);
	onMount(() => {
		guessModeUrl = `/select-characters-katakana?${GUESS_MODE_URL_SEARCH_PARAM_NAME}=${getGuessModeUrl(page.url.searchParams)}`;
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

<div class="select-characters-hiragana">
	<h2 class="h2">Hiragana ~ ひらがな</h2>
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

	{#if guessModeUrl !== null}
		<div class="container-actions">
			<a href={resolve(guessModeUrl)} class="action-link">
				<button class="btn preset-filled-surface-300-700 fill-surface-950-50 button-link">
					Next <MoveRight />
				</button>
			</a>
		</div>
	{/if}
</div>

<style>
	.select-characters-hiragana {
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
