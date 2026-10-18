<script lang="ts">
	import { getCaligraphyAnimationConfig } from '$lib/caligraphy/caligraphy-animation-config';
	import WordGuesser from '$lib/components/WordGuesser.svelte';
	import { animationSpeedStore } from '$lib/stores/animation-speed';
	import { charactersWhitelist } from '$lib/stores/characters-whistelist';
	import { superMemo } from '$lib/stores/super-memo.svelte';
	import { toaster } from '$lib/toaster/toaster';
	import type { Character, CharacterWhitelist } from '../../types/character';
	import type { WordEntry } from '../../types/wordEntry';

	const SUCCESS_STREAK_TOAST_THRESHOLD = 5;

	const getRandomCharacter = (
		whitelist: CharacterWhitelist,
		excludeCharacterId?: Character['id']
	): Character => {
		const character = superMemo.guess.getPseudoRandomCharacter(whitelist, excludeCharacterId);
		if (!character) {
			throw new Error('getPseudoRandomCharacter did not return any character');
		}
		return { ...character }; // clone for reactivity
	};

	const characterToWordEntry = (character: Character): WordEntry => {
		// single-letter word
		return {
			ascii: [character.ascii],
			characterIds: [character.id],
		};
	};

	let characterToGuess = $state(getRandomCharacter($charactersWhitelist));
	let toasterAlreadyShown = $state(false);

	// reactivity on: characterToGuess
	const onSuccess = $derived.by(() => {
		const prev = characterToGuess.id;

		return (word: WordEntry) => {
			superMemo.guess.success(word.characterIds);
			const minimumSuccessStreak = superMemo.guess.getMinimumSuccessStreak($charactersWhitelist);

			if (!toasterAlreadyShown && minimumSuccessStreak >= SUCCESS_STREAK_TOAST_THRESHOLD) {
				toasterAlreadyShown = true;
				toaster.success({
					title: `Each character has been successfully identified ${SUCCESS_STREAK_TOAST_THRESHOLD} times`,
				});
			}

			characterToGuess = getRandomCharacter($charactersWhitelist, prev);
		};
	});

	const onError = $derived.by(() => {
		const prev = characterToGuess.id;

		return (word: WordEntry) => {
			superMemo.guess.error(word.characterIds);
			toasterAlreadyShown = false;
			characterToGuess = getRandomCharacter($charactersWhitelist, prev);
		};
	});

	let wordToGuess = $derived(characterToWordEntry(characterToGuess));

	const caligraphyAnimationConfig = $derived.by(() => {
		const level = $animationSpeedStore;
		return getCaligraphyAnimationConfig(level);
	});
</script>

<WordGuesser
	characters={$charactersWhitelist}
	{wordToGuess}
	{onSuccess}
	{onError}
	{caligraphyAnimationConfig}
/>
