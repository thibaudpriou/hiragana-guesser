<script lang="ts">
	import { hiragana, hiraganaByAscii } from '$lib/components/syllabaries/hiragana';
	import WordGuesser from '$lib/components/WordGuesser.svelte';
	import { asciiToCharacters } from '$lib/conversions/ascii-to-characters';
	import { configStore } from '$lib/stores/config.svelte';
	import { superMemo } from '$lib/stores/super-memo.svelte';
	import { SvelteMap } from 'svelte/reactivity';
	import type { Character } from '../../types/character';
	import type { WordEntry } from '../../types/wordEntry';

	const charactersWhitelist = $derived.by(() => {
		const charactersIds = $configStore.selectedHiragana.keys().toArray();

		const whitelist = new SvelteMap<Character['id'], Character>();
		for (const id of charactersIds) {
			whitelist.set(id, hiragana[id]);
		}

		return whitelist;
	});

	const getRandomWord = (whitelist: SvelteMap<string, Character>): WordEntry => {
		const character = superMemo.guess.getMostForgettedCharacter(whitelist);
		if (!character) {
			throw new Error('MostForgettedCharacter not found');
		}
		const ascii = [character.ascii]; // single-letter word
		return {
			ascii,
			characterIds: asciiToCharacters(hiraganaByAscii, ascii).map((c) => c.id),
		};
	};

	let wordToGuess = $derived(getRandomWord(charactersWhitelist));

	const onSuccess = (word: WordEntry) => {
		superMemo.guess.success(word.characterIds);

		wordToGuess = getRandomWord(charactersWhitelist);
	};
	const onError = (word: WordEntry) => {
		superMemo.guess.error(word.characterIds);

		wordToGuess = getRandomWord(charactersWhitelist);
	};
</script>

<WordGuesser characters={charactersWhitelist} {wordToGuess} {onSuccess} {onError} />
