<script lang="ts">
	import { katakana } from '$lib/components/syllabaries/katakana';
	import { configStore } from '$lib/stores/config.svelte';
	import type { Character, KanaType } from '../../types/character';
	import { MoveLeft, MoveRight } from '@lucide/svelte';
	import { page } from '$app/state';
	import { GUESS_MODE_URL_SEARCH_PARAM_NAME } from '../../constants';
	import { resolve } from '$app/paths';
	import { validateGuessModeUrl } from '$lib/navigation/validate-guess-mode-url';
	import { onMount } from 'svelte';
	import CharacterFormGroup from '$lib/components/CharacterFormGroup.svelte';

	const isActive = (character: Character<KanaType>) =>
		$configStore.selectedKatakana.has(character.id);
	const selectCharacters = (characters: Character<KanaType>[]) => {
		characters.forEach((item) => configStore.selectedKatakana.add(item.id));
	};
	const deselectCharacters = (characters: Character<KanaType>[]) => {
		characters.forEach((item) => configStore.selectedKatakana.delete(item.id));
	};

	const getGuessModeUrl = (searchParams: URLSearchParams) => {
		const guessNodeUrl = searchParams.get(GUESS_MODE_URL_SEARCH_PARAM_NAME);
		if (!guessNodeUrl || !validateGuessModeUrl(guessNodeUrl)) {
			return null;
		}

		return guessNodeUrl;
	};

	let guessModeUrl = $state<ReturnType<typeof getGuessModeUrl>>(null);
	onMount(() => {
		guessModeUrl = getGuessModeUrl(page.url.searchParams);
	});

	const characterFormGroupProps = {
		selectCharacters,
		deselectCharacters,
		isActive,
		reset: (shouldSelectAll?: boolean) => {
			configStore.selectedKatakana.reset(shouldSelectAll);
		},
	};
</script>

<div class="select-characters-katakana">
	<h2 class="h2">Katakana ~ カタカナ</h2>
	<div class="form-container">
		<div class="form">
			<CharacterFormGroup
				{...characterFormGroupProps}
				characters={[katakana.A, katakana.I, katakana.U, katakana.E, katakana.O]}
			/>
			<CharacterFormGroup
				{...characterFormGroupProps}
				characters={[katakana.KA, katakana.KI, katakana.KU, katakana.KE, katakana.KO]}
			/>
			<CharacterFormGroup
				{...characterFormGroupProps}
				characters={[katakana.SA, katakana.SHI, katakana.SU, katakana.SE, katakana.SO]}
			/>
			<CharacterFormGroup
				{...characterFormGroupProps}
				characters={[katakana.TA, katakana.CHI, katakana.TSU, katakana.TE, katakana.TO]}
			/>
			<CharacterFormGroup
				{...characterFormGroupProps}
				characters={[katakana.NA, katakana.NI, katakana.NU, katakana.NE, katakana.NO]}
			/>
			<CharacterFormGroup
				{...characterFormGroupProps}
				characters={[katakana.HA, katakana.HI, katakana.FU, katakana.HE, katakana.HO]}
			/>
			<CharacterFormGroup
				{...characterFormGroupProps}
				characters={[katakana.MA, katakana.MI, katakana.MU, katakana.ME, katakana.MO]}
			/>
			<CharacterFormGroup
				{...characterFormGroupProps}
				characters={[katakana.YA, null, katakana.YU, null, katakana.YO]}
			/>
			<CharacterFormGroup
				{...characterFormGroupProps}
				characters={[katakana.RA, katakana.RI, katakana.RU, katakana.RE, katakana.RO]}
			/>
			<CharacterFormGroup
				{...characterFormGroupProps}
				characters={[katakana.WA, null, katakana.WO, null, katakana.N]}
			/>

			<span class="vr"></span>

			<CharacterFormGroup
				{...characterFormGroupProps}
				characters={[katakana.GA, katakana.GI, katakana.GU, katakana.GE, katakana.GO]}
			/>
			<CharacterFormGroup
				{...characterFormGroupProps}
				characters={[katakana.ZA, katakana.JI, katakana.ZU, katakana.ZE, katakana.ZO]}
			/>
			<CharacterFormGroup
				{...characterFormGroupProps}
				characters={[katakana.DA, katakana.JI2, katakana.ZU2, katakana.DE, katakana.DO]}
			/>
			<CharacterFormGroup
				{...characterFormGroupProps}
				characters={[katakana.BA, katakana.BI, katakana.BU, katakana.BE, katakana.BO]}
			/>
			<CharacterFormGroup
				{...characterFormGroupProps}
				characters={[katakana.PA, katakana.PI, katakana.PU, katakana.PE, katakana.PO]}
			/>
		</div>
	</div>

	{#if guessModeUrl !== null}
		<div class="container-actions">
			<a
				href={resolve(
					`/select-characters-hiragana?${GUESS_MODE_URL_SEARCH_PARAM_NAME}=${getGuessModeUrl(page.url.searchParams)}`
				)}
				class="action-link"
			>
				<button class="btn preset-filled-surface-300-700 fill-surface-950-50 button-link">
					<MoveLeft /> Prev
				</button>
			</a>
			<a href={resolve(guessModeUrl)} class="action-link">
				<button class="btn preset-filled-surface-300-700 fill-surface-950-50 button-link">
					Play <MoveRight />
				</button>
			</a>
		</div>
	{/if}
</div>

<style>
	.select-characters-katakana {
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
		justify-content: space-between;
	}

	.action-link {
		display: inline-flex;
	}
</style>
