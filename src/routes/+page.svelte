<script lang="ts">
	import Guesser from '$lib/components/Guesser.svelte';
	import { hiragana } from '$lib/components/syllabaries/hiragana';

	import { getSelectedHiraganaState } from '$lib/states/selectedHiragana.svelte';

	const selected = getSelectedHiraganaState();
	const characters = $derived(
		selected
			.keys()
			.toArray()
			.map((id) => hiragana[id])
	);
</script>

<Guesser {characters} length={4} />
