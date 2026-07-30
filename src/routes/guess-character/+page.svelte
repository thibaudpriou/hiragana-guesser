<script lang="ts">
	import WordGuesser from '$lib/components/WordGuesser.svelte';
	import { charactersWhitelist } from '$lib/stores/characters-whistelist';
	import { superMemo } from '$lib/stores/super-memo.svelte';
	import type { Character, CharacterWhitelist } from '../../types/character';
	import type { WordEntry } from '../../types/wordEntry';

	const getRandomCharacter = (excludeCharacterId?: Character['id']): Character => {
		const character = superMemo.guess.getMostForgettedCharacter(
			$charactersWhitelist,
			excludeCharacterId
		);
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

	let characterToGuess = $state(getRandomCharacter());

	const onSuccess = $derived.by(() => {
		const prev = characterToGuess.id;

		return (word: WordEntry) => {
			superMemo.guess.success(word.characterIds);
			characterToGuess = getRandomCharacter(prev);
		};
	});

	const onError = $derived.by(() => {
		const prev = characterToGuess.id;

		return (word: WordEntry) => {
			superMemo.guess.error(word.characterIds);
			characterToGuess = getRandomCharacter(prev);
		};
	});

	let wordToGuess = $derived(characterToWordEntry(characterToGuess));
</script>

<WordGuesser characters={$charactersWhitelist} {wordToGuess} {onSuccess} {onError} />
