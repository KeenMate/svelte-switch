<script lang="ts">
	import { MultiSwitch } from '$lib';
	import DevHeader from '../DevHeader.svelte';

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

<div class="container py-4">
	<DevHeader
		title="Item Styles"
		subtitle="itemStyles accepts either an array (per-index) or a single object (shared across steps)."
	/>

	<div class="row g-4">
		<div class="col-lg-6">
			<div class="card h-100">
				<div class="card-header">Array mode — per-index colors</div>
				<div class="card-body">
					<div
						class="d-flex justify-content-center align-items-center py-4"
						style="min-height: 160px;"
					>
						<MultiSwitch
							bind:selectedIndex={arrayIndex}
							itemsCount={4}
							size={60}
							itemStyles={perIndexStyles}
						/>
					</div>
					<pre class="small bg-light p-2 rounded mb-0">{JSON.stringify(
							perIndexStyles,
							null,
							2
						)}</pre>
				</div>
			</div>
		</div>

		<div class="col-lg-6">
			<div class="card h-100">
				<div class="card-header">Object mode — one style for all</div>
				<div class="card-body">
					<div
						class="d-flex justify-content-center align-items-center py-4"
						style="min-height: 160px;"
					>
						<MultiSwitch
							bind:selectedIndex={objectIndex}
							itemsCount={4}
							size={60}
							itemStyles={sharedStyle}
						/>
					</div>
					<pre class="small bg-light p-2 rounded mb-0">{JSON.stringify(sharedStyle, null, 2)}</pre>
				</div>
			</div>
		</div>
	</div>
</div>
