<script lang="ts">
	import {
		hiragana,
		hiraganaByAscii,
		hiraganaSpecials,
		isHiraganaKey,
	} from '$lib/components/syllabaries/hiragana';
	import WordGuesser from '$lib/components/WordGuesser.svelte';
	import { getJpltWords } from '$lib/jplt/jplt-word-series';
	import { pickRandomElement } from '$lib/math/pick-random-element';
	import { configStore } from '$lib/stores/config.svelte';
	import { superMemo } from '$lib/stores/super-memo.svelte';
	import { SvelteMap } from 'svelte/reactivity';
	import type { WordEntry } from '../../types/wordEntry';
	import type { Character, CharacterWhitelist, KanaType } from '../../types/character';
	import { getCaligraphyAnimationConfig } from '$lib/caligraphy/caligraphy-animation-config';
	import { animationSpeedStore } from '$lib/stores/animation-speed';
	import { jpltWordLevelStore } from '$lib/stores/jplt-word-level';
	import { wordList } from '$lib/jplt/word-list';
	import { isKatakanaKey, katakana, katakanaSpecials } from '$lib/components/syllabaries/katakana';

	const charactersWhitelist = $derived.by(() => {
		const hiraganaIds = $configStore.selectedHiragana.keys().toArray();
		const katakanaIds = $configStore.selectedKatakana.keys().toArray();

		const whitelist: CharacterWhitelist = {
			hiragana: new SvelteMap<Character<KanaType>['id'], Character<KanaType.HIRAGANA>>(),
			katakana: new SvelteMap<Character<KanaType>['id'], Character<KanaType.KATAKANA>>(),
		};

		// * hiragana
		for (const id of hiraganaIds) {
			if (!isHiraganaKey(id, hiragana)) {
				throw new Error(`Unknown character ID: ${id}`);
			}
			whitelist.hiragana.set(id, hiragana[id]);
		}

		if (whitelist.hiragana.has(hiragana.TSU.id)) {
			whitelist.hiragana.set(hiraganaSpecials.SOKUON.id, hiraganaSpecials.SOKUON);
		}
		if (whitelist.hiragana.has(hiragana.YA.id)) {
			whitelist.hiragana.set(hiraganaSpecials.YOON_YA.id, hiraganaSpecials.YOON_YA);
		}
		if (whitelist.hiragana.has(hiragana.YU.id)) {
			whitelist.hiragana.set(hiraganaSpecials.YOON_YU.id, hiraganaSpecials.YOON_YU);
		}
		if (whitelist.hiragana.has(hiragana.YO.id)) {
			whitelist.hiragana.set(hiraganaSpecials.YOON_YO.id, hiraganaSpecials.YOON_YO);
		}

		// * katakana
		for (const id of katakanaIds) {
			if (!isKatakanaKey(id, katakana)) {
				throw new Error(`Unknown katakana character ID: ${id}`);
			}
			whitelist.katakana.set(id, katakana[id]);
		}

		if (whitelist.katakana.has(katakana.TSU.id)) {
			whitelist.katakana.set(katakanaSpecials.SOKUON.id, katakanaSpecials.SOKUON);
		}
		if (whitelist.katakana.has(katakana.YA.id)) {
			whitelist.katakana.set(katakanaSpecials.YOON_YA.id, katakanaSpecials.YOON_YA);
		}
		if (whitelist.katakana.has(katakana.YU.id)) {
			whitelist.katakana.set(katakanaSpecials.YOON_YU.id, katakanaSpecials.YOON_YU);
		}
		if (whitelist.katakana.has(katakana.YO.id)) {
			whitelist.katakana.set(katakanaSpecials.YOON_YO.id, katakanaSpecials.YOON_YO);
		}

		return whitelist;
	});

	const asciiToCharacter = (k: string) => hiraganaByAscii.get(k);
	const words = $derived(
		getJpltWords(charactersWhitelist, $jpltWordLevelStore, wordList, asciiToCharacter)
	);

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
