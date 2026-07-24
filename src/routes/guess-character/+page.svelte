<script lang="ts">
	import { hiragana, hiraganaByAscii } from '$lib/components/syllabaries/hiragana';
	import WordGuesser from '$lib/components/WordGuesser.svelte';
	import { asciiToCharacters } from '$lib/conversions/ascii-to-characters';
	import { pickRandomElement } from '$lib/math/pick-random-element';
	import { configStore } from '$lib/stores/config.svelte';
	import { superMemo } from '$lib/stores/super-memo.svelte';
	import type { Character } from '../../types/character';
	import type { WordEntry } from '../../types/wordEntry';

	const selectedCharacters = $derived.by(() => {
		const selected = $configStore.selectedHiragana
			.keys()
			.toArray()
			.map((id) => hiragana[id]);

		return selected.length ? selected : Object.values(hiragana);
	});

	const getRandomWord = (characters: Character[]): WordEntry => {
		const randomCharacter = pickRandomElement(characters);
		const ascii = [randomCharacter.ascii]; // single-letter word
		return {
			ascii,
			characterIds: asciiToCharacters(hiraganaByAscii, ascii).map((c) => c.id),
		};
	};

	let wordToGuess = $derived(getRandomWord(selectedCharacters));

	const onSuccess = (word: WordEntry) => {
		superMemo.guess.success(word.characterIds);

		// TODO prioritize getMostForgettedCharacter
		wordToGuess = getRandomWord(selectedCharacters);
	};
	const onError = (word: WordEntry) => {
		superMemo.guess.error(word.characterIds);

		// TODO prioritize getMostForgettedCharacter
		wordToGuess = getRandomWord(selectedCharacters);
	};
</script>

<WordGuesser characters={selectedCharacters ?? []} {wordToGuess} {onSuccess} {onError} />
