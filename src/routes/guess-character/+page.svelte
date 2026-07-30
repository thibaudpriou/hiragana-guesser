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

	const getRandomCharacter = (
		whitelist: SvelteMap<Character['id'], Character>,
		excludeCharacter?: Character
	): Character => {
		const character = superMemo.guess.getMostForgettedCharacter(whitelist, excludeCharacter?.id);
		if (!character) {
			throw new Error('MostForgettedCharacter not found');
		}
		return character;
	};

	const characterToWordEntry = (character: Character): WordEntry => {
		const ascii = [character.ascii]; // single-letter word
		return {
			ascii,
			characterIds: asciiToCharacters(hiraganaByAscii, ascii).map((c) => c.id),
		};
	};

	let characterToGuess = $derived(getRandomCharacter(charactersWhitelist));

	const onSuccess = (word: WordEntry) => {
		superMemo.guess.success(word.characterIds);
		characterToGuess = getRandomCharacter(charactersWhitelist, characterToGuess);
	};

	const onError = (word: WordEntry) => {
		superMemo.guess.error(word.characterIds);
		characterToGuess = getRandomCharacter(charactersWhitelist, characterToGuess);
	};

	let wordToGuess = $derived(characterToWordEntry(characterToGuess));
</script>

<WordGuesser characters={charactersWhitelist} {wordToGuess} {onSuccess} {onError} />
