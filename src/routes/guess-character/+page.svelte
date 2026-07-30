<script lang="ts">
	import { hiragana } from '$lib/components/syllabaries/hiragana';
	import WordGuesser from '$lib/components/WordGuesser.svelte';
	import { configStore } from '$lib/stores/config.svelte';
	import { superMemo } from '$lib/stores/super-memo.svelte';
	import { SvelteMap } from 'svelte/reactivity';
	import type { Character, CharacterWhitelist } from '../../types/character';
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
		whitelist: CharacterWhitelist,
		excludeCharacterId?: Character['id']
	): Character => {
		const character = superMemo.guess.getMostForgettedCharacter(whitelist, excludeCharacterId);
		if (!character) {
			throw new Error('MostForgettedCharacter not found');
		}
		return { ...character }; // clone for reactivity
	};

	const characterToWordEntry = (character: Character): WordEntry => {
		// single-letter word
		return {
			ascii: [character.ascii],
			characterIds: [character.id],
		};
	};

	let characterToGuess = $derived(getRandomCharacter(charactersWhitelist));

	const onSuccess = $derived.by(() => {
		const prev = characterToGuess.id;

		return (whitelist: CharacterWhitelist, word: WordEntry) => {
			superMemo.guess.success(word.characterIds);
			characterToGuess = getRandomCharacter(whitelist, prev);
		};
	});

	const onError = $derived.by(() => {
		const prev = characterToGuess.id;

		return (whitelist: CharacterWhitelist, word: WordEntry) => {
			superMemo.guess.error(word.characterIds);
			characterToGuess = getRandomCharacter(whitelist, prev);
		};
	});

	let wordToGuess = $derived(characterToWordEntry(characterToGuess));
</script>

<WordGuesser characters={charactersWhitelist} {wordToGuess} {onSuccess} {onError} />
