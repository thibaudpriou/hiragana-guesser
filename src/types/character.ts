import type { Component } from 'svelte';

type CharacterProps = {
	id: string;
};

export type RegularCharacter = {
	id: string;
	romanji: string;
	nbStrokes: number;
	component: Component<CharacterProps>;
	ascii: string;
};

export type SpecialCharacter = {
	id: string;
	romanji: null;
	nbStrokes: number;
	component: Component<CharacterProps>;
	ascii: string;
	type: 'sokuon'; // TODO handle other "changing sound" characters
};

export type Character = RegularCharacter | SpecialCharacter;

export type CharacterWhitelist = Map<Character['id'], Character>;
