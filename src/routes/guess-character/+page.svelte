<script lang="ts">
	import CharacterGuesser from '$lib/components/CharacterGuesser.svelte';
	import { hiragana } from '$lib/components/syllabaries/hiragana';
	import { configStore } from '$lib/stores/config.svelte';

	const selectedCharacters = $derived.by(() => {
		const selected = $configStore.selectedHiragana
			.keys()
			.toArray()
			.map((id) => hiragana[id]);

		return selected.length ? selected : Object.values(hiragana);
	});
</script>

<CharacterGuesser characters={selectedCharacters} />
