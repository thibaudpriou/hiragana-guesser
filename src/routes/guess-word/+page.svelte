<script lang="ts">
	import { hiragana } from '$lib/components/syllabaries/hiragana';
	import WordGuesser from '$lib/components/WordGuesser.svelte';
	import { getWordsN5 } from '$lib/jplt/jplt-word-series';
	import { pickRandomElement } from '$lib/math/pick-random-element';
	import { configStore } from '$lib/stores/config.svelte';
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
		wordToGuess = pickRandomElement(words);

		// TODO @tpriou do something useful with guess (spaced repetition)
		console.log('Success', word);
	};
</script>

<WordGuesser characters={selectedCharacters ?? []} {wordToGuess} {onSuccess} />
