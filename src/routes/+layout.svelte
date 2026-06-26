<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import Toolbar from '$lib/components/Toolbar.svelte';
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="container">
	<div>
		{@render children()}
	</div>
	<Toolbar />
</div>

<style>
	.container {
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
</style>
