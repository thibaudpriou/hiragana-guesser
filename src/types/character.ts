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
	type: 'regular';
};

export type SpecialCharacter =
	| {
			id: string;
			romanji: null;
			nbStrokes: number;
			component: Component<CharacterProps>;
			ascii: string;
			type: 'sokuon';
	  }
	| {
			id: string;
			romanji: string;
			nbStrokes: number;
			component: Component<CharacterProps>;
			ascii: string;
			type: 'yoon';
	  };

export type Character = RegularCharacter | SpecialCharacter;

export type CharacterWhitelist = Map<Character['id'], Character>;
