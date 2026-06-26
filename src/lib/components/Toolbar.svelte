<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton-svelte';
	import { Settings } from '@lucide/svelte';
	import { hiragana } from './syllabaries';
	import CharacterContainer from './CharacterContainer.svelte';
</script>

<AppBar>
	<AppBar.Toolbar class="grid-cols-[auto_1fr]">
		<AppBar.Headline class="flex justify-center">
			<p class="title">Hiragana guesser</p>
		</AppBar.Headline>
		<AppBar.Trail class="justify-end">
			<button type="button" class="btn-icon hover:preset-tonal">
				<!-- TODO @priou show every hiragana + user selection -->
				<CharacterContainer
					id="toolbar"
					strokeDelayMs={0}
					animationDurationMs={0}
					animationSpacingMs={0}
				>
					{#snippet svgContent()}
						<hiragana.A id="toolbar" />
					{/snippet}
				</CharacterContainer>
			</button>
			<button type="button" class="btn-icon hover:preset-tonal">
				<!-- TODO @priou allow changing mode or animation speeds -->
				<Settings class="size-6" />
			</button>
		</AppBar.Trail>
	</AppBar.Toolbar>
</AppBar>

<style>
	.title {
		user-select: none;
	}
</style>
