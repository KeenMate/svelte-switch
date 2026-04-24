<script lang="ts">
	import { MultiSwitch } from '$lib';
	import ExampleHeader from '../ExampleHeader.svelte';

	let selectedIndex = $state(0);
	let size = $state(50);
	let itemsCount = $state(4);
	let orientation: 'horizontal' | 'vertical' = $state('horizontal');
	let isDisabled = $state(false);
</script>

<svelte:head>
	<title>Multi Switch - Svelte Switch</title>
</svelte:head>

<div class="container">
	<ExampleHeader
		title="🎚️ Multi Switch"
		subtitle="Step count, orientation, disabled, keyboard navigation."
	/>

	<section class="card">
		<h2>Demo</h2>
		<div class="demo-area" style="display: flex; justify-content: center; min-height: 220px;">
			<MultiSwitch bind:selectedIndex {itemsCount} {size} {orientation} {isDisabled} />
		</div>
		<p class="description" style="text-align: center;">
			selectedIndex = <code>{selectedIndex}</code> / {itemsCount - 1}
		</p>
	</section>

	<section class="card">
		<h2>Controls</h2>
		<div class="controls">
			<label>
				Size: {size}px
				<input type="range" min="30" max="120" bind:value={size} />
			</label>
			<label>
				Steps: {itemsCount}
				<input type="range" min="2" max="8" bind:value={itemsCount} />
			</label>
			<label>
				Orientation
				<select bind:value={orientation}>
					<option value="horizontal">Horizontal</option>
					<option value="vertical">Vertical</option>
				</select>
			</label>
			<label>
				<input type="checkbox" bind:checked={isDisabled} />
				Disabled
			</label>
		</div>
		<div class="note">
			<div class="note-title">Keyboard</div>
			Focus the switch, then arrow keys move the selection.
		</div>
	</section>
</div>
