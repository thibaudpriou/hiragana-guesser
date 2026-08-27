<script lang="ts">
	import { getCaligraphyAnimationConfig } from '$lib/caligraphy/caligraphy-animation-config';
	import WordGuesser from '$lib/components/WordGuesser.svelte';
	import { charactersWhitelist } from '$lib/stores/characters-whistelist';
	import { configStore } from '$lib/stores/config.svelte';
	import { superMemo } from '$lib/stores/super-memo.svelte';
	import type { Character, CharacterWhitelist } from '../../types/character';
	import type { WordEntry } from '../../types/wordEntry';

	const getRandomCharacter = (
		whitelist: CharacterWhitelist,
		excludeCharacterId?: Character['id']
	): Character => {
		const character = superMemo.guess.getMostForgettedCharacter(whitelist, excludeCharacterId);
		if (!character) {
			throw new Error('MostForgettedCharacter not found');
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

	// reactivity on: characterToGuess
	const onSuccess = $derived.by(() => {
		const prev = characterToGuess.id;

		return (word: WordEntry) => {
			superMemo.guess.success(word.characterIds);
			characterToGuess = getRandomCharacter($charactersWhitelist, prev);
		};
	});

	const onError = $derived.by(() => {
		const prev = characterToGuess.id;

		return (word: WordEntry) => {
			superMemo.guess.error(word.characterIds);
			characterToGuess = getRandomCharacter($charactersWhitelist, prev);
		};
	});

	let wordToGuess = $derived(characterToWordEntry(characterToGuess));

	const caligraphyAnimationConfig = $derived.by(() => {
		const level = $configStore.animationSpeedLevel;
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
