import type { Component } from 'svelte';

export type Character = {
	name: string;
	nbStrokes: number;
	component: Component;
};
