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

	let arrayIndex = $state(0);
	let objectIndex = $state(0);
</script>

<svelte:head>
	<title>Item Styles - Svelte Switch</title>
</svelte:head>

<div class="container">
	<ExampleHeader
		title="🎨 Item Styles"
		subtitle="itemStyles accepts either an array (per-index) or a single object (shared across steps)."
	/>

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
