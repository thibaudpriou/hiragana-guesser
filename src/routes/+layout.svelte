<script lang="ts">
	import { toaster } from '$lib/toaster/toaster';
	import { Toast } from '@skeletonlabs/skeleton-svelte';

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

<Toast.Group {toaster}>
	{#snippet children(toast)}
		<Toast {toast}>
			<Toast.Message>
				<Toast.Title>{toast.title}</Toast.Title>
				<Toast.Description>{toast.description}</Toast.Description>
			</Toast.Message>
			<Toast.CloseTrigger />
		</Toast>
	{/snippet}
</Toast.Group>

<style>
	.container {
		height: 100%;
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
