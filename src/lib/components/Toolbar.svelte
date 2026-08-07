<script lang="ts">
	import { Menu, Navigation, Portal, Slider } from '@skeletonlabs/skeleton-svelte';
	import { ChessPawn, ChessQueen, SettingsIcon } from '@lucide/svelte';
	import { ListCheck } from '@lucide/svelte';
	import { configStore } from '$lib/stores/config.svelte';
	import { superMemo } from '$lib/stores/super-memo.svelte';

	const onAnimationSpeedChange = () => {
		// TODO @tpriou save config in store then use it everywhere
		throw new Error('not yet implemented');
	};

	const wordList = $state(-5);
	const onWordListChange = () => {
		// TODO @tpriou save config in store then use it everywhere
		throw new Error('not yet implemented');
	};

	const handleReset = () => {
		configStore.selectedHiragana.reset();
		superMemo.guess.reset();
	};
</script>

<div>
	<Navigation layout="bar">
		<Navigation.Menu class="grid grid-cols-4 gap-2">
			<Navigation.TriggerAnchor
				href="/guess-character"
				aria-label="Train single hiragana characters"
			>
				<ChessPawn />
				<Navigation.TriggerText>Individual</Navigation.TriggerText>
			</Navigation.TriggerAnchor>
			<Navigation.TriggerAnchor href="/guess-word" aria-label="Train hiragana words">
				<ChessQueen />
				<Navigation.TriggerText>Words</Navigation.TriggerText>
			</Navigation.TriggerAnchor>
			<Navigation.TriggerAnchor href="/list" aria-label="View character selection">
				<ListCheck />
				<Navigation.TriggerText>Selection</Navigation.TriggerText>
			</Navigation.TriggerAnchor>

			<Menu>
				<Menu.Trigger>
					<Navigation.TriggerAnchor>
						<SettingsIcon />
						<Navigation.TriggerText>Configuration</Navigation.TriggerText>
					</Navigation.TriggerAnchor>
				</Menu.Trigger>

				<Portal>
					<Menu.Positioner>
						<Menu.Content>
							<Menu.Item value="list">
								<ListCheck />
								<Navigation.TriggerAnchor
									dir="horizontal"
									href="/list"
									aria-label="View character selection"
								>
									<Navigation.TriggerText>View Hiragana selection</Navigation.TriggerText>
								</Navigation.TriggerAnchor>
							</Menu.Item>

							<Menu.Separator />

							<Menu.Item value="animationSpeed">
								<!-- TODO @tpriou remove disabled once implemented -->
								<Slider
									defaultValue={[3]}
									min={0}
									max={5}
									step={1}
									onValueChange={onAnimationSpeedChange}
									disabled
								>
									<Slider.Label>Animation speed</Slider.Label>
									<Slider.Control>
										<Slider.Track>
											<Slider.Range />
										</Slider.Track>
										<Slider.Thumb index={0}>
											<Slider.HiddenInput />
										</Slider.Thumb>
									</Slider.Control>
								</Slider>
							</Menu.Item>

							<Menu.Item value="wordList">
								<!-- TODO @tpriou remove disabled once implemented -->
								<Slider
									defaultValue={[-5]}
									min={-5}
									max={-1}
									step={1}
									onValueChange={onWordListChange}
									disabled
								>
									<Slider.Label>Word list: N{wordList * -1}</Slider.Label>
									<Slider.Control>
										<Slider.Track>
											<Slider.Range />
										</Slider.Track>
										<Slider.Thumb index={0}>
											<Slider.HiddenInput />
										</Slider.Thumb>
									</Slider.Control>
									<!-- <Slider.MarkerGroup>
									<Slider.Marker value={-5}>N5</Slider.Marker>
									<Slider.Marker value={-3}>N3</Slider.Marker>
									<Slider.Marker value={-1}>N1</Slider.Marker>
								</Slider.MarkerGroup> -->
								</Slider>
							</Menu.Item>

							<Menu.Separator />

							<Menu.Item value="reset">
								<Navigation.TriggerAnchor
									dir="horizontal"
									onclick={handleReset}
									aria-label="View character selection"
								>
									<Navigation.TriggerText>Reset configuration</Navigation.TriggerText>
								</Navigation.TriggerAnchor>
							</Menu.Item>
						</Menu.Content>
					</Menu.Positioner>
				</Portal>
			</Menu>
		</Navigation.Menu>
	</Navigation>
</div>
