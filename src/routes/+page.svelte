<script lang="ts">
	import Guesser from '$lib/components/Guesser.svelte';
	import { hiraganaCharacters } from '$lib/components/syllabaries';
</script>

<Guesser characters={hiraganaCharacters} length={4} />
