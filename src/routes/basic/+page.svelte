<script lang="ts">
	import { Switch } from '$lib';
	import ShowcaseSection from '../ShowcaseSection.svelte';

	// Basic switch configuration
	let checked = $state(false);
	let disabled = $state(false);
	let direction = $state<'horizontal' | 'vertical'>('horizontal');
	let size = $state(50);

	function onToggle(checked: boolean) {
		console.log('Switch toggled:', checked);
	}
</script>

<div class="container-fluid">
	<div class="row mb-4">
		<div class="col-12">
			<h1>Basic Switch Usage</h1>
			<p class="lead">Learn the fundamental properties and behavior of the Svelte Switch component.</p>
		</div>
	</div>

	<ShowcaseSection
		title="Essential Properties"
		subtitle="The basic configuration options for a binary switch">
		<div slot="demo" class="d-flex justify-content-center align-items-center" style="min-height: 120px;">
			<div class="text-center">
				<Switch
					bind:checked
					{disabled}
					{direction}
					{size}
					{onToggle}
				/>
				<div class="mt-3">
					<span class="badge {checked ? 'bg-success' : 'bg-secondary'}">
						{checked ? 'ON' : 'OFF'}
					</span>
				</div>
			</div>
		</div>

		<div slot="controls">
			<div class="form-group mb-3">
				<label class="form-label">Checked State</label>
				<div class="form-check">
					<input
						class="form-check-input"
						type="checkbox"
						bind:checked
						id="checkedControl"
					/>
					<label class="form-check-label" for="checkedControl">
						Switch is {checked ? 'ON' : 'OFF'}
					</label>
				</div>
			</div>

			<div class="form-group mb-3">
				<label class="form-label">Disabled State</label>
				<div class="form-check">
					<input
						class="form-check-input"
						type="checkbox"
						bind:checked={disabled}
						id="disabledControl"
					/>
					<label class="form-check-label" for="disabledControl">
						Disable switch
					</label>
				</div>
			</div>

			<div class="form-group mb-3">
				<label class="form-label">Direction</label>
				<select class="form-select form-select-sm" bind:value={direction}>
					<option value="horizontal">Horizontal</option>
					<option value="vertical">Vertical</option>
				</select>
			</div>

			<div class="form-group mb-3">
				<label class="form-label">Size ({size}px)</label>
				<input
					type="range"
					class="form-range"
					bind:value={size}
					min="30"
					max="100"
					step="5"
				/>
			</div>
		</div>

		<div slot="description">
			<h6>Required Properties</h6>
			<p><code>checked</code> - Boolean state of the switch (bindable)</p>

			<h6>Optional Properties</h6>
			<p><code>disabled</code> - Disable switch interaction (default: false)</p>
			<p><code>direction</code> - "horizontal" or "vertical" orientation (default: "horizontal")</p>
			<p><code>size</code> - Switch size in pixels (default: 50)</p>
			<p><code>onToggle</code> - Callback function when switch state changes</p>

			<h6>Usage Example</h6>
			<pre><code>&lt;Switch
  bind:checked={'{isEnabled}'}
  disabled={'{isFormDisabled}'}
  direction="horizontal"
  size={'{60}'}
  onToggle={'{handleToggle}'}
/&gt;</code></pre>

			<h6>Keyboard Support</h6>
			<p>• <kbd>Space</kbd> or <kbd>Enter</kbd> - Toggle switch state</p>
			<p>• <kbd>Tab</kbd> - Focus management</p>
		</div>
	</ShowcaseSection>
</div>