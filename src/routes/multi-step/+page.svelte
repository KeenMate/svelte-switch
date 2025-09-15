<script lang="ts">
	import { MultiSwitch } from '$lib';
	import ShowcaseSection from '../ShowcaseSection.svelte';

	// Multi-step configuration
	let selectedIndex = $state(0);
	let disabled = $state(false);
	let direction = $state<'horizontal' | 'vertical'>('horizontal');
	let size = $state(60);
	let steps = $state(3);

	// Temperature step styles
	const temperatureStyles = [
		{ backgroundColor: '#3b82f6', thumbColor: '#1e40af', borderColor: '#2563eb' }, // Cold
		{ backgroundColor: '#10b981', thumbColor: '#047857', borderColor: '#059669' }, // Warm
		{ backgroundColor: '#f59e0b', thumbColor: '#d97706', borderColor: '#f59e0b' }, // Hot
		{ backgroundColor: '#ef4444', thumbColor: '#dc2626', borderColor: '#ef4444' }  // Very Hot
	];

	function onStepChange(index: number) {
		console.log('Step changed to:', index);
	}

	// Dynamic labels
	const stepLabels = $derived(() => {
		switch (steps) {
			case 3: return ['Low', 'Med', 'High'];
			case 4: return ['Off', 'Low', 'Med', 'High'];
			case 5: return ['Off', 'Low', 'Med', 'High', 'Max'];
			default: return Array.from({ length: steps }, (_, i) => (i + 1).toString());
		}
	});
</script>

<div class="container-fluid">
	<div class="row mb-4">
		<div class="col-12">
			<h1>Multi-Step Switch</h1>
			<p class="lead">Explore the multi-step switch with customizable steps and styling.</p>
		</div>
	</div>

	<ShowcaseSection
		title="Basic Multi-Step Switch"
		subtitle="Switch between multiple states with customizable steps">
		<div slot="demo" class="d-flex justify-content-center align-items-center" style="min-height: 120px;">
			<div class="text-center">
				<MultiSwitch
					bind:selectedIndex
					{disabled}
					{direction}
					{size}
					{steps}
					{onStepChange}
				>
					{#snippet children({ selectedIndex })}
						<span class="thumb-content">
							{stepLabels[selectedIndex]}
						</span>
					{/snippet}
				</MultiSwitch>
				<div class="mt-3">
					<span class="badge bg-primary">
						Step {selectedIndex + 1}: {stepLabels[selectedIndex]}
					</span>
				</div>
			</div>
		</div>

		<div slot="controls">
			<div class="form-group mb-3">
				<label class="form-label">Selected Step</label>
				<select class="form-select form-select-sm" bind:value={selectedIndex}>
					{#each Array(steps) as _, index}
						<option value={index}>Step {index + 1}: {stepLabels[index]}</option>
					{/each}
				</select>
			</div>

			<div class="form-group mb-3">
				<label class="form-label">Number of Steps</label>
				<input
					type="range"
					class="form-range"
					bind:value={steps}
					min="3"
					max="6"
					step="1"
				/>
				<small class="text-muted">{steps} steps</small>
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
					min="40"
					max="100"
					step="5"
				/>
			</div>
		</div>

		<div slot="description">
			<h6>Required Properties</h6>
			<p><code>selectedIndex</code> - Currently selected step index (bindable)</p>
			<p><code>steps</code> - Number of steps (default: 3)</p>

			<h6>Optional Properties</h6>
			<p><code>disabled</code> - Disable switch interaction (default: false)</p>
			<p><code>direction</code> - "horizontal" or "vertical" orientation (default: "horizontal")</p>
			<p><code>size</code> - Switch size in pixels (default: 50)</p>
			<p><code>onStepChange</code> - Callback function when step changes</p>
			<p><code>stepStyles</code> - Array of style objects for each step</p>

			<h6>Usage Example</h6>
			<pre><code>&lt;MultiSwitch
  bind:selectedIndex={'{currentStep}'}
  steps={'{4}'}
  size={'{70}'}
  onStepChange={'{handleStepChange}'}
&gt;
  {'{#snippet children({ selectedIndex })'}
    &lt;span&gt;{'{stepLabels[selectedIndex]}'}&lt;/span&gt;
  {'{/snippet}'}
&lt;/MultiSwitch&gt;</code></pre>

			<h6>Keyboard Support</h6>
			<p>• <kbd>←</kbd>/<kbd>↑</kbd> - Move to previous step</p>
			<p>• <kbd>→</kbd>/<kbd>↓</kbd> - Move to next step</p>
			<p>• <kbd>Tab</kbd> - Focus management</p>
		</div>
	</ShowcaseSection>

	<ShowcaseSection
		title="Styled Multi-Step Switch"
		subtitle="Custom styling for each step with colors and borders">
		<div slot="demo" class="d-flex justify-content-center align-items-center" style="min-height: 120px;">
			<div class="text-center">
				<MultiSwitch
					selectedIndex={1}
					steps={4}
					size={70}
					stepStyles={temperatureStyles}
				>
					{#snippet children({ selectedIndex })}
						<span class="thumb-content" style="color: white; font-weight: bold;">
							{['❄️', '🌡️', '🔥', '🌋'][selectedIndex]}
						</span>
					{/snippet}
				</MultiSwitch>
				<div class="mt-3">
					<span class="badge bg-info">
						Temperature: {['Cold', 'Warm', 'Hot', 'Very Hot'][1]}
					</span>
				</div>
			</div>
		</div>

		<div slot="controls">
			<div class="form-group mb-3">
				<label class="form-label">Step Styles Configuration</label>
				<div class="bg-dark text-light p-3 rounded" style="font-family: 'Courier New', monospace; font-size: 0.85rem;">
					<pre>{JSON.stringify(temperatureStyles, null, 2)}</pre>
				</div>
			</div>
		</div>

		<div slot="description">
			<h6>Step Styling</h6>
			<p><code>stepStyles</code> - Array of style objects for customizing each step</p>

			<h6>Style Properties</h6>
			<p><code>backgroundColor</code> - Background color for the step and switch</p>
			<p><code>thumbColor</code> - Color of the thumb when on this step</p>
			<p><code>borderColor</code> - Border color for the thumb and step</p>

			<h6>Dynamic Styling</h6>
			<p>The switch automatically applies the styles for the currently selected step, creating smooth color transitions.</p>

			<h6>Usage Example</h6>
			<pre><code>const stepStyles = [
  {'{backgroundColor: "#3b82f6", thumbColor: "#1e40af"}'},
  {'{backgroundColor: "#ef4444", thumbColor: "#dc2626"}'}
];</code></pre>
		</div>
	</ShowcaseSection>
</div>

<style>
	:global(.thumb-content) {
		font-size: 0.75rem;
		font-weight: 600;
		color: #666;
		line-height: 1;
		user-select: none;
		pointer-events: none;
	}
</style>