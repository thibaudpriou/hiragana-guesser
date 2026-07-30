<script lang="ts">
	import { hiragana } from '$lib/components/syllabaries/hiragana';
	import WordGuesser from '$lib/components/WordGuesser.svelte';
	import { getWordsN5 } from '$lib/jplt/jplt-word-series';
	import { pickRandomElement } from '$lib/math/pick-random-element';
	import { configStore } from '$lib/stores/config.svelte';
	import { superMemo } from '$lib/stores/super-memo.svelte';
	import { SvelteMap } from 'svelte/reactivity';
	import type { WordEntry } from '../../types/wordEntry';
	import type { Character, CharacterWhitelist } from '../../types/character';

	const charactersWhitelist = $derived.by(() => {
		const charactersIds = $configStore.selectedHiragana.keys().toArray();

		const whitelist = new SvelteMap<Character['id'], Character>();
		for (const id of charactersIds) {
			whitelist.set(id, hiragana[id]);
		}

		return whitelist;
	});

	const words = $derived(getWordsN5(charactersWhitelist));

	let wordToGuess = $derived(pickRandomElement(words));
	const onSuccess = (_whitelist: CharacterWhitelist, word: WordEntry) => {
		superMemo.guess.success(word.characterIds);

		// TODO prioritize getMostForgettedCharacter
		wordToGuess = pickRandomElement(words);
	};

	const onError = (_whitelist: CharacterWhitelist, word: WordEntry) => {
		superMemo.guess.error(word.characterIds);

		// TODO prioritize getMostForgettedCharacter
		wordToGuess = pickRandomElement(words);
	};
</script>

<WordGuesser characters={charactersWhitelist} {wordToGuess} {onSuccess} {onError} />
