<script lang="ts">
	import { AppBar, Menu, Portal, Slider } from '@skeletonlabs/skeleton-svelte';
	import { Gamepad2, SettingsIcon } from '@lucide/svelte';
	import { superMemo } from '$lib/stores/super-memo.svelte';
	import {
		maxAnimationSpeedLevel,
		minAnimationSpeedLevel,
		type AnimationSpeedLevel,
	} from '../../types/caligraphy';
	import { animationSpeedStore } from '$lib/stores/animation-speed';
	import { DEFAULT_JPLT_WORD_LEVEL, jpltWordLevelStore } from '$lib/stores/jplt-word-level';
	import { resolve } from '$app/paths';
	import type { JPLT_LEVEL } from '../../types/jplt';

	const onAnimationSpeedChange = (value: number[]) => {
		const level = value[0];
		if (level === undefined || level < minAnimationSpeedLevel || level > maxAnimationSpeedLevel) {
			throw new Error(`onAnimationSpeedChange: unexpected speed level ${level}`);
		}
		animationSpeedStore.set(level as AnimationSpeedLevel);
	};

	const onWordListChange = (value: number[]) => {
		const level = value[0] !== undefined ? value[0] * -1 : undefined;
		if (level === undefined || level < 1 || level > 5) {
			throw new Error(`onWordListChange: unexpected JPLT level ${level}`);
		}
		jpltWordLevelStore.set(level as JPLT_LEVEL);
	};

	const handleReset = () => {
		superMemo.guess.reset();
	};
</script>

<div>
	<AppBar>
		<AppBar.Toolbar class="grid-cols-[1fr_auto]">
			<AppBar.Headline>
				<a href={resolve('/guess')} class="headline-link">
					<Gamepad2 />
					<span>Alphabet</span>
				</a>
			</AppBar.Headline>
			<AppBar.Trail>
				<Menu>
					<Menu.Trigger>
						<button class="icon-btn hover:preset-tonal" aria-label="Configuration">
							<SettingsIcon />
						</button>
					</Menu.Trigger>

					<Portal>
						<Menu.Positioner>
							<Menu.Content>
								<Menu.Item value="animationSpeed">
									<Slider
										defaultValue={[1]}
										min={minAnimationSpeedLevel}
										max={maxAnimationSpeedLevel}
										step={1}
										onValueChange={(details) => onAnimationSpeedChange(details.value)}
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
									<Slider
										defaultValue={[DEFAULT_JPLT_WORD_LEVEL * -1]}
										min={-5}
										max={-1}
										step={1}
										onValueChange={(details) => onWordListChange(details.value)}
									>
										<Slider.Label>Word list: N{$jpltWordLevelStore}</Slider.Label>
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
									<button
										onclick={handleReset}
										aria-label="Reset adaptative selection"
										class="btn text-xs"
									>
										Reset adaptative selection
									</button>
								</Menu.Item>
							</Menu.Content>
						</Menu.Positioner>
					</Portal>
				</Menu>
			</AppBar.Trail>
		</AppBar.Toolbar>
	</AppBar>
</div>

<style>
	.headline-link {
		width: 100%;
		display: flex;
		justify-content: center;
		gap: 0.5em;
	}
</style>
