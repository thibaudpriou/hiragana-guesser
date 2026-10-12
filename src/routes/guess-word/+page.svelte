<script lang="ts">
	import { hiragana, hiraganaSpecials } from '$lib/components/syllabaries/hiragana';
	import WordGuesser from '$lib/components/WordGuesser.svelte';
	import { getWordsN5 } from '$lib/jplt/jplt-word-series';
	import { pickRandomElement } from '$lib/math/pick-random-element';
	import { configStore } from '$lib/stores/config.svelte';
	import { superMemo } from '$lib/stores/super-memo.svelte';
	import { SvelteMap } from 'svelte/reactivity';
	import type { WordEntry } from '../../types/wordEntry';
	import type { Character } from '../../types/character';
	import { getCaligraphyAnimationConfig } from '$lib/caligraphy/caligraphy-animation-config';
	import { animationSpeedStore } from '$lib/stores/animation-speed';

	function isHiraganaKey(key: string, obj: typeof hiragana): key is keyof typeof hiragana {
		return key in obj;
	}

	const charactersWhitelist = $derived.by(() => {
		const charactersIds = $configStore.selectedHiragana.keys().toArray();

		const whitelist = new SvelteMap<Character['id'], Character>();
		for (const id of charactersIds) {
			if (!isHiraganaKey(id, hiragana)) {
				throw new Error(`Unknown character ID: ${id}`);
			}
			whitelist.set(id, hiragana[id]);
		}

		// TODO handle other "changing sounds" characters
		if (whitelist.has(hiragana.TSU.id)) {
			whitelist.set(hiraganaSpecials.SOKUON.id, hiraganaSpecials.SOKUON);
		}

		return whitelist;
	});

	const words = $derived(getWordsN5(charactersWhitelist));

	let wordToGuess = $derived(pickRandomElement(words));
	const onSuccess = (word: WordEntry) => {
		superMemo.guess.success(word.characterIds);

		// TODO prioritize getMostForgettedCharacter
		wordToGuess = pickRandomElement(words);
	};

	const onError = (word: WordEntry) => {
		superMemo.guess.error(word.characterIds);

		// TODO prioritize getMostForgettedCharacter
		wordToGuess = pickRandomElement(words);
	};

	const caligraphyAnimationConfig = $derived.by(() => {
		const level = $animationSpeedStore;
		return getCaligraphyAnimationConfig(level);
	});
</script>

<WordGuesser
	characters={charactersWhitelist}
	{wordToGuess}
	{onSuccess}
	{onError}
	{caligraphyAnimationConfig}
/>
