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
	<main class="content">
		{@render children()}
	</main>
	<Toolbar />
</div>

<style>
	.container {
		height: 100vh;
		min-width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.content {
		width: 100%;
		height: 100%;
		overflow: auto;
	}
</style>
