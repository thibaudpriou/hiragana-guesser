import type { Component } from 'svelte';

type CharacterProps = {
	id: string;
};

export enum KanaType {
	HIRAGANA = 'HIRAGANA',
	KATAKANA = 'KATAKANA',
}

export type RegularCharacter<T extends KanaType> = {
	id: string;
	romanji: string;
	nbStrokes: number;
	component: Component<CharacterProps>;
	ascii: string;
	type: 'regular';
	kanaType: T;
};

export type SpecialCharacter<T extends KanaType> =
	| {
			id: string;
			romanji: null;
			nbStrokes: number;
			component: Component<CharacterProps>;
			ascii: string;
			type: 'sokuon';
			kanaType: T;
	  }
	| {
			id: string;
			romanji: string;
			nbStrokes: number;
			component: Component<CharacterProps>;
			ascii: string;
			type: 'yoon';
			kanaType: T;
	  };

export type Character<T extends KanaType> = RegularCharacter<T> | SpecialCharacter<T>;

export type CharacterMapById<T extends KanaType> = Map<Character<T>['id'], Character<T>>;

export type CharacterWhitelist = {
	hiragana: CharacterMapById<KanaType.HIRAGANA>;
	katakana: CharacterMapById<KanaType.KATAKANA>;
};

export type CharacterIdObject = Pick<Character<KanaType>, 'id' | 'kanaType'>;
