<script lang="ts">
	import CharacterGuesser from '$lib/components/CharacterGuesser.svelte';
	import { hiragana } from '$lib/components/syllabaries/hiragana';
	import WordGuesser from '$lib/components/WordGuesser.svelte';
	import { getWordsN5 } from '$lib/jplt/jplt-word-series';

	import { getSelectedHiraganaState } from '$lib/states/selectedHiragana.svelte';

	const selected = getSelectedHiraganaState();
	const selectedCharacters = $derived(
		selected
			.keys()
			.toArray()
			.map((id) => hiragana[id])
	);

	const words = $derived(getWordsN5(selectedCharacters));
</script>

<!-- <CharacterGuesser characters={selectedCharacters} length={4} /> -->
<WordGuesser characters={selectedCharacters} {words} />
