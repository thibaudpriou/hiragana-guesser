<script lang="ts">
	import { hiragana, hiraganaSpecials, isHiraganaKey } from '$lib/components/syllabaries/hiragana';
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

	const charactersWhitelist = $derived.by(() => {
		const charactersIds = $configStore.selectedHiragana.keys().toArray();

		const whitelist = new SvelteMap<Character['id'], Character>();
		for (const id of charactersIds) {
			if (!isHiraganaKey(id, hiragana)) {
				throw new Error(`Unknown character ID: ${id}`);
			}
			whitelist.set(id, hiragana[id]);
		}

		if (whitelist.has(hiragana.TSU.id)) {
			whitelist.set(hiraganaSpecials.SOKUON.id, hiraganaSpecials.SOKUON);
		}
		if (whitelist.has(hiragana.YA.id)) {
			whitelist.set(hiraganaSpecials.YOON_YA.id, hiraganaSpecials.YOON_YA);
		}
		if (whitelist.has(hiragana.YU.id)) {
			whitelist.set(hiraganaSpecials.YOON_YU.id, hiraganaSpecials.YOON_YU);
		}
		if (whitelist.has(hiragana.YO.id)) {
			whitelist.set(hiraganaSpecials.YOON_YO.id, hiraganaSpecials.YOON_YO);
		}

		return whitelist;
	});

	const words = $derived(getWordsN5(charactersWhitelist));

	let wordToGuess = $derived(pickRandomElement(words));
	const onGuessSucess = (word: WordEntry) => {
		superMemo.guess.success(word.characterIds);

		// TODO prioritize getMostForgettedCharacter
		wordToGuess = pickRandomElement(words);
	};

	const onGuessError = (word: WordEntry) => {
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
	{onGuessSucess}
	{onGuessError}
	{caligraphyAnimationConfig}
/>
