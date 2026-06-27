<script lang="ts">
	import { Navigation } from '@skeletonlabs/skeleton-svelte';
	import { Gamepad2 } from '@lucide/svelte';
	import { ListCheck } from '@lucide/svelte';
</script>

<Navigation layout="bar">
	<Navigation.Menu class="grid grid-cols-2 gap-2">
		<Navigation.TriggerAnchor href="/#" aria-label="Train">
			<Gamepad2 />
			<Navigation.TriggerText>Train</Navigation.TriggerText>
		</Navigation.TriggerAnchor>
		<Navigation.TriggerAnchor href="/list" aria-label="View hiragana list">
			<ListCheck />
			<Navigation.TriggerText>Hiragana</Navigation.TriggerText>
		</Navigation.TriggerAnchor>
	</Navigation.Menu>
</Navigation>
