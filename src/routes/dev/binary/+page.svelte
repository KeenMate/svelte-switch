<script lang="ts">
	import { Switch } from '$lib';
	import DevHeader from '../DevHeader.svelte';

	let checked = $state(false);
	let size = $state(50);
	let orientation: 'horizontal' | 'vertical' = $state('horizontal');
	let isDisabled = $state(false);
</script>

<div class="container py-4">
	<DevHeader title="Binary Switch" subtitle="Toggle state, size, orientation, disabled." />

	<div class="card mb-4">
		<div class="card-body">
			<div class="d-flex justify-content-center py-4" style="min-height: 180px;">
				<Switch bind:checked {size} {orientation} {isDisabled}>
					{#snippet children({ isSelected })}
						<span>{isSelected ? '✓' : '✗'}</span>
					{/snippet}
				</Switch>
			</div>
			<div class="text-center text-muted small">checked = {checked}</div>
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
					<label for="orientation" class="form-label">Orientation</label>
					<select id="orientation" class="form-select" bind:value={orientation}>
						<option value="horizontal">Horizontal</option>
						<option value="vertical">Vertical</option>
					</select>
				</div>
				<div class="col-md-3">
					<div class="form-check mt-4">
						<input id="checked" type="checkbox" class="form-check-input" bind:checked />
						<label for="checked" class="form-check-label">Checked</label>
					</div>
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
		</div>
	</div>
</div>
