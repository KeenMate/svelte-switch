<script lang="ts">
	import { Switch } from '$lib';
	import ExampleHeader from '../ExampleHeader.svelte';

	let checked = $state(false);
	let size = $state(50);
	let orientation: 'horizontal' | 'vertical' = $state('horizontal');
	let isDisabled = $state(false);
</script>

<svelte:head>
	<title>Binary Switch - Svelte Switch</title>
</svelte:head>

<div class="container">
	<ExampleHeader title="🔘 Binary Switch" subtitle="Toggle state, size, orientation, disabled." />

	<section class="card">
		<h2>Demo</h2>
		<div class="demo-area" style="display: flex; justify-content: center; min-height: 160px;">
			<Switch bind:checked {size} {orientation} {isDisabled}>
				{#snippet thumb({ isSelected })}
					<span>{isSelected ? '✓' : '✗'}</span>
				{/snippet}
			</Switch>
		</div>
		<p class="description" style="text-align: center;">
			checked = <code>{checked}</code>
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
				Orientation
				<select bind:value={orientation}>
					<option value="horizontal">Horizontal</option>
					<option value="vertical">Vertical</option>
				</select>
			</label>
			<label>
				<input type="checkbox" bind:checked />
				Checked
			</label>
			<label>
				<input type="checkbox" bind:checked={isDisabled} />
				Disabled
			</label>
		</div>
	</section>
</div>
