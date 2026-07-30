import type { Component } from 'svelte';

type CharacterProps = {
	id: string;
};

export type Character = {
	id: string;
	name: string;
	nbStrokes: number;
	component: Component<CharacterProps>;
	ascii: string;
};

export type CharacterWhitelist = Map<Character['id'], Character>;
