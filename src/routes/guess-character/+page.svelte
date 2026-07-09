<script lang="ts">
	import { hiragana } from '$lib/components/syllabaries/hiragana';
	import WordGuesser from '$lib/components/WordGuesser.svelte';
	import { pickRandomElement } from '$lib/math/pick-random-element';
	import { configStore } from '$lib/stores/config.svelte';
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
		return {
			reading: [randomCharacter.ascii],
		};
	};

	let wordToGuess = $derived(getRandomWord(selectedCharacters));

	const onSuccess = (word: WordEntry) => {
		wordToGuess = getRandomWord(selectedCharacters);

		// TODO @tpriou do something useful with guess (spaced repetition)
		console.log('Success', word);
	};
</script>

<WordGuesser characters={selectedCharacters ?? []} {wordToGuess} {onSuccess} />
