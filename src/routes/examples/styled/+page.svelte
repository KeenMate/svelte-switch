<script lang="ts">
	import { MultiSwitch } from '$lib';
	import ExampleHeader from '../ExampleHeader.svelte';

	const perIndexStyles = [
		{ backgroundColor: '#6366f1', thumbColor: '#4338ca', thumbBorderColor: '#5b21b6' },
		{ backgroundColor: '#10b981', thumbColor: '#047857', thumbBorderColor: '#059669' },
		{ backgroundColor: '#f59e0b', thumbColor: '#d97706', thumbBorderColor: '#f59e0b' },
		{ backgroundColor: '#ef4444', thumbColor: '#b91c1c', thumbBorderColor: '#dc2626' }
	];

	const sharedStyle = {
		backgroundColor: '#0ea5e9',
		thumbColor: '#0369a1',
		thumbBorderColor: '#0284c7'
	};

	const priorityLevels = ['Low', 'Medium', 'High', 'Critical'];
	const priorityStyles = [
		{ backgroundColor: '#e8f5e8', thumbColor: '#4caf50', thumbBorderColor: '#388e3c' },
		{ backgroundColor: '#e3f2fd', thumbColor: '#2196f3', thumbBorderColor: '#1976d2' },
		{ backgroundColor: '#fff3e0', thumbColor: '#ff9800', thumbBorderColor: '#f57c00' },
		{ backgroundColor: '#ffebee', thumbColor: '#f44336', thumbBorderColor: '#d32f2f' }
	];

	let arrayIndex = $state(0);
	let objectIndex = $state(0);
	let priorityIndex = $state(1);
</script>

<svelte:head>
	<title>Item Styles - Svelte Switch</title>
</svelte:head>

<div class="container">
	<ExampleHeader
		title="🎨 Item Styles"
		subtitle="itemStyles accepts either an array (per-index) or a single object (shared across steps). The whole switch surface follows the selected step's backgroundColor — that's how you make the multi-switch reflect the active selection."
	/>

	<section class="card">
		<h2>Whole-switch background follows selected step</h2>
		<p class="description">
			Priority levels with semantic colors. Move the thumb — notice the entire switch background
			tints to match the selected step. Each step still keeps its own thumb color via
			<code>thumbColor</code>. This is the canonical pattern for "the switch should reflect what's
			selected".
		</p>
		<div
			class="demo-area"
			style="display: flex; justify-content: center; align-items: center; min-height: 200px;"
		>
			<MultiSwitch
				bind:selectedIndex={priorityIndex}
				items={priorityLevels}
				itemStyles={priorityStyles}
				shouldDisplayLabels={true}
				labelPosition="bottom"
				labelRenderMode="block"
				size={60}
			/>
		</div>
		<div class="code-block">
			<pre>{`const priorityLevels = ['Low', 'Medium', 'High', 'Critical'];

const priorityStyles = [
  { backgroundColor: '#e8f5e8', thumbColor: '#4caf50', thumbBorderColor: '#388e3c' },
  { backgroundColor: '#e3f2fd', thumbColor: '#2196f3', thumbBorderColor: '#1976d2' },
  { backgroundColor: '#fff3e0', thumbColor: '#ff9800', thumbBorderColor: '#f57c00' },
  { backgroundColor: '#ffebee', thumbColor: '#f44336', thumbBorderColor: '#d32f2f' }
];

<MultiSwitch
  bind:selectedIndex
  items={priorityLevels}
  itemStyles={priorityStyles}
  shouldDisplayLabels={true}
  labelPosition="bottom"
/>`}</pre>
		</div>
	</section>

	<div class="grid-2">
		<section class="card">
			<h2>Array mode — per-index colors</h2>
			<div
				class="demo-area"
				style="display: flex; justify-content: center; align-items: center; min-height: 160px;"
			>
				<MultiSwitch
					bind:selectedIndex={arrayIndex}
					itemsCount={4}
					size={60}
					itemStyles={perIndexStyles}
				/>
			</div>
			<div class="code-block">
				<pre>{JSON.stringify(perIndexStyles, null, 2)}</pre>
			</div>
		</section>

		<section class="card">
			<h2>Object mode — one style for all</h2>
			<div
				class="demo-area"
				style="display: flex; justify-content: center; align-items: center; min-height: 160px;"
			>
				<MultiSwitch
					bind:selectedIndex={objectIndex}
					itemsCount={4}
					size={60}
					itemStyles={sharedStyle}
				/>
			</div>
			<div class="code-block">
				<pre>{JSON.stringify(sharedStyle, null, 2)}</pre>
			</div>
		</section>
	</div>
</div>
