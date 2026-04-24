<script lang="ts">
	import { MultiSwitch } from '$lib';
	import DevHeader from '../DevHeader.svelte';

	let selectedIndex = $state(0);
	let size = $state(50);
	let itemsCount = $state(4);
	let orientation: 'horizontal' | 'vertical' = $state('horizontal');
	let isDisabled = $state(false);
</script>

<div class="container py-4">
	<DevHeader
		title="Multi Switch"
		subtitle="Step count, orientation, disabled, keyboard navigation."
	/>

	<div class="card mb-4">
		<div class="card-body">
			<div class="d-flex justify-content-center py-4" style="min-height: 220px;">
				<MultiSwitch bind:selectedIndex {itemsCount} {size} {orientation} {isDisabled} />
			</div>
			<div class="text-center text-muted small">
				selectedIndex = {selectedIndex} / {itemsCount - 1}
			</div>
		</div>
	</div>

	<div class="card">
		<div class="card-header">Controls</div>
		<div class="card-body">
			<div class="row g-3">
				<div class="col-md-3">
					<label for="size-range" class="form-label">Size: {size}px</label>
					<input
						id="size-range"
						type="range"
						class="form-range"
						min="30"
						max="120"
						bind:value={size}
					/>
				</div>
				<div class="col-md-3">
					<label for="steps-range" class="form-label">Steps: {itemsCount}</label>
					<input
						id="steps-range"
						type="range"
						class="form-range"
						min="2"
						max="8"
						bind:value={itemsCount}
					/>
				</div>
				<div class="col-md-3">
					<label for="orientation" class="form-label">Orientation</label>
					<select id="orientation" class="form-select" bind:value={orientation}>
						<option value="horizontal">Horizontal</option>
						<option value="vertical">Vertical</option>
					</select>
				</div>
				<div class="col-md-3">
					<div class="form-check mt-4">
						<input
							id="disabled"
							type="checkbox"
							class="form-check-input"
							bind:checked={isDisabled}
						/>
						<label for="disabled" class="form-check-label">Disabled</label>
					</div>
				</div>
			</div>
			<p class="text-muted small mt-3 mb-0">
				Keyboard: arrow keys move the selection when focused.
			</p>
		</div>
	</div>
</div>
