<script lang="ts">
	import { hiragana } from '$lib/components/syllabaries/hiragana';
	import WordGuesser from '$lib/components/WordGuesser.svelte';
	import { getWordsN5 } from '$lib/jplt/jplt-word-series';
	import { pickRandomElement } from '$lib/math/pick-random-element';
	import { configStore } from '$lib/stores/config.svelte';
	import { superMemo } from '$lib/stores/super-memo.svelte';
	import type { WordEntry } from '../../types/wordEntry';

	const selectedCharacters = $derived.by(() => {
		const selected = $configStore.selectedHiragana
			.keys()
			.toArray()
			.map((id) => hiragana[id]);

		return selected.length ? selected : Object.values(hiragana);
	});

	const words = $derived(getWordsN5(selectedCharacters));

	let wordToGuess = $derived(pickRandomElement(words));
	const onSuccess = (word: WordEntry) => {
		superMemo.guess.success(word.characterIds);

		// TODO prioritize getMostForgettedCharacter
		wordToGuess = pickRandomElement(words);
	};

	const onError = (word: WordEntry) => {
		superMemo.guess.error(word.characterIds);

		// TODO prioritize getMostForgettedCharacter
		wordToGuess = pickRandomElement(words);
	};
</script>

<WordGuesser characters={selectedCharacters ?? []} {wordToGuess} {onSuccess} {onError} />
