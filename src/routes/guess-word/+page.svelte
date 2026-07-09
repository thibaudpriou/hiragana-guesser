<script lang="ts">
	import { hiragana } from '$lib/components/syllabaries/hiragana';
	import WordGuesser from '$lib/components/WordGuesser.svelte';
	import { getWordsN5 } from '$lib/jplt/jplt-word-series';
	import { configStore } from '$lib/stores/config.svelte';

	const selectedCharacters = $derived.by(() => {
		const selected = $configStore.selectedHiragana
			.keys()
			.toArray()
			.map((id) => hiragana[id]);

		return selected.length ? selected : Object.values(hiragana);
	});

	const words = $derived(getWordsN5(selectedCharacters));
</script>

<WordGuesser characters={selectedCharacters ?? []} {words} />
