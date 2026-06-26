import type { Component } from 'svelte';

export type Character = {
	id: string;
	name: string;
	nbStrokes: number;
	component: Component;
};
