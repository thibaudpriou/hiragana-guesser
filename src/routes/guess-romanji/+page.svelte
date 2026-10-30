<script lang="ts">
	import RomanjiGuesser from '$lib/components/RomanjiGuesser.svelte';
	import { charactersWhitelist } from '$lib/stores/characters-whistelist';
	import { superMemo } from '$lib/stores/super-memo.svelte';
	import { toaster } from '$lib/toaster/toaster';
	import type {
		Character,
		CharacterIdObject,
		CharacterWhitelist,
		KanaType,
	} from '../../types/character';

	const SUCCESS_STREAK_TOAST_THRESHOLD = 5;

	/** number of choices */
	const NB_OPTIONS = 4;

	const getRandomGuessOptions = (
		whitelist: CharacterWhitelist,
		excludeCharacterId?: CharacterIdObject
	): { character: Character<KanaType>; otherChoices: Character<KanaType>[] } => {
		const character = superMemo.guess.getPseudoRandomCharacter(whitelist, excludeCharacterId);
		if (!character) {
			throw new Error('getPseudoRandomCharacter did not return any character');
		}

		const otherChoiceCharacters = superMemo.guess.getRandomCharacters(
			whitelist,
			NB_OPTIONS - 1,
			character
		);

		return {
			character,
			otherChoices: otherChoiceCharacters,
		};
	};

	let guessOptions = $state(getRandomGuessOptions($charactersWhitelist));
	let toasterAlreadyShown = $state(false);

	const onGuessSucess = (guessId: CharacterIdObject) => {
		superMemo.guess.success([guessId]);
		const minimumSuccessStreak = superMemo.guess.getMinimumSuccessStreak($charactersWhitelist);

		if (!toasterAlreadyShown && minimumSuccessStreak >= SUCCESS_STREAK_TOAST_THRESHOLD) {
			toasterAlreadyShown = true;
			toaster.success({
				title: `Each character has been successfully identified ${SUCCESS_STREAK_TOAST_THRESHOLD} times`,
			});
		}
		guessOptions = getRandomGuessOptions($charactersWhitelist, guessId);
	};

	const onGuessError = (guessId: CharacterIdObject, guessErrorId: CharacterIdObject) => {
		superMemo.guess.error([guessId, guessErrorId]);
		toasterAlreadyShown = false;
		guessOptions = getRandomGuessOptions($charactersWhitelist, guessId);
	};
</script>

<RomanjiGuesser {guessOptions} {onGuessSucess} {onGuessError} />
