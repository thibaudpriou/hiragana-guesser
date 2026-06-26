import type { Component } from 'svelte';

export type Character = {
	name: string;
	strokes: number;
	component: Component;
};
