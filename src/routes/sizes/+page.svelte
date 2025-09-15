<script lang="ts">
	import { Switch, MultiSwitch } from '$lib';
	import ShowcaseSection from '../ShowcaseSection.svelte';

	// Size configurations
	let selectedSize = $state(50);
	let direction = $state<'horizontal' | 'vertical'>('horizontal');
	let checked = $state(false);
	let multiSelectedIndex = $state(1);

	// Size presets
	const sizePresets = [
		{ label: 'Extra Small', size: 30, description: 'Compact switches for tight spaces' },
		{ label: 'Small', size: 40, description: 'Small switches for minimal UI' },
		{ label: 'Medium', size: 50, description: 'Default size for most applications' },
		{ label: 'Large', size: 60, description: 'Larger switches for better accessibility' },
		{ label: 'Extra Large', size: 80, description: 'Maximum size for prominent controls' },
		{ label: 'Huge', size: 100, description: 'Oversized for special use cases' }
	];

	// Responsive breakpoint examples
	const responsiveSizes = {
		mobile: 40,
		tablet: 50,
		desktop: 60
	};

	let currentBreakpoint = $state('desktop');

	function onToggle(checked: boolean) {
		console.log('Size demo switch toggled:', checked);
	}

	function onStepChange(index: number) {
		console.log('Size demo multi-step changed:', index);
	}

	// Calculate scaled dimensions for display
	const scaledDimensions = $derived(() => {
		const baseWidth = 60; // Base switch width at size 50
		const baseHeight = 32; // Base switch height
		const scale = selectedSize / 50;
		return {
			width: Math.round(baseWidth * scale),
			height: Math.round(baseHeight * scale)
		};
	});
</script>

<div class="container-fluid">
	<div class="row mb-4">
		<div class="col-12">
			<h1>Sizes & Orientations</h1>
			<p class="lead">Explore flexible sizing options and horizontal/vertical orientations.</p>
		</div>
	</div>

	<ShowcaseSection
		title="Dynamic Sizing"
		subtitle="Interactive size adjustment with real-time preview">
		<div slot="demo" class="d-flex justify-content-center align-items-center" style="min-height: 250px;">
			<div class="text-center">
				<Switch
					bind:checked
					{direction}
					size={selectedSize}
					onToggle={onToggle}
				>
					{#snippet children({ checked })}
						<span class="thumb-content" style="font-size: {Math.max(0.5, selectedSize / 80)}rem; font-weight: bold;">
							{checked ? '✓' : '○'}
						</span>
					{/snippet}
				</Switch>
				<div class="mt-3">
					<div class="badge bg-info">
						{selectedSize}px • {scaledDimensions.width}×{scaledDimensions.height}
					</div>
					<div class="badge bg-secondary ms-2">
						{direction}
					</div>
				</div>
			</div>
		</div>

		<div slot="controls">
			<div class="form-group mb-3">
				<label class="form-label">Size: {selectedSize}px</label>
				<input
					type="range"
					class="form-range"
					bind:value={selectedSize}
					min="30"
					max="120"
					step="5"
				/>
				<div class="d-flex justify-content-between text-muted small mt-1">
					<span>30px</span>
					<span>120px</span>
				</div>
			</div>

			<div class="form-group mb-3">
				<label class="form-label">Orientation</label>
				<div class="btn-group w-100" role="group">
					<input type="radio" class="btn-check" bind:group={direction} value="horizontal" id="horizontal">
					<label class="btn btn-outline-primary" for="horizontal">🔄 Horizontal</label>

					<input type="radio" class="btn-check" bind:group={direction} value="vertical" id="vertical">
					<label class="btn btn-outline-primary" for="vertical">↕️ Vertical</label>
				</div>
			</div>

			<div class="form-group mb-3">
				<label class="form-label">Calculated Dimensions</label>
				<div class="bg-light p-2 rounded">
					<small class="text-muted">
						Width: <strong>{direction === 'horizontal' ? scaledDimensions.width : scaledDimensions.height}px</strong><br>
						Height: <strong>{direction === 'horizontal' ? scaledDimensions.height : scaledDimensions.width}px</strong><br>
						Scale: <strong>{(selectedSize / 50).toFixed(2)}×</strong>
					</small>
				</div>
			</div>

			<div class="form-group">
				<div class="form-check">
					<input
						class="form-check-input"
						type="checkbox"
						bind:checked
						id="sizeToggle"
					/>
					<label class="form-check-label" for="sizeToggle">
						Toggle switch state
					</label>
				</div>
			</div>
		</div>

		<div slot="description">
			<h6>Size Property</h6>
			<p><code>size</code> - Base height in pixels (default: 50px)</p>

			<h6>Scaling Behavior</h6>
			<p>All dimensions scale proportionally from the base size. Width scales automatically to maintain proper aspect ratio.</p>

			<h6>Direction Property</h6>
			<p><code>direction</code> - "horizontal" or "vertical" orientation</p>

			<h6>Responsive Design</h6>
			<p>Use different sizes for different screen sizes to ensure optimal touch targets and visual hierarchy.</p>

			<h6>Accessibility</h6>
			<p>Minimum recommended size is 40px for proper touch target accessibility on mobile devices.</p>
		</div>
	</ShowcaseSection>

	<ShowcaseSection
		title="Size Presets"
		subtitle="Common size configurations for different use cases">
		<div slot="demo" style="min-height: 300px; overflow-y: auto;">
			<div class="d-flex flex-column gap-4 align-items-center py-3">
				{#each sizePresets as preset}
					<div class="text-center">
						<div class="mb-2">
							<Switch
								checked={preset.size >= 50}
								size={preset.size}
							>
								{#snippet children({ checked })}
									<span class="thumb-content" style="font-size: {Math.max(0.4, preset.size / 100)}rem;">
										{preset.size >= 50 ? '✓' : '○'}
									</span>
								{/snippet}
							</Switch>
						</div>
						<div class="small">
							<strong>{preset.label}</strong><br>
							<span class="text-muted">{preset.size}px</span>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<div slot="controls">
			<div class="form-group mb-3">
				<label class="form-label">Size Presets</label>
				{#each sizePresets as preset}
					<div class="form-check">
						<input
							class="form-check-input"
							type="radio"
							bind:group={selectedSize}
							value={preset.size}
							id="preset-{preset.size}"
						/>
						<label class="form-check-label" for="preset-{preset.size}">
							<strong>{preset.label}</strong> ({preset.size}px)<br>
							<small class="text-muted">{preset.description}</small>
						</label>
					</div>
				{/each}
			</div>
		</div>

		<div slot="description">
			<h6>Size Guidelines</h6>
			<p><strong>30-40px:</strong> Compact interfaces, secondary controls</p>
			<p><strong>50-60px:</strong> Standard sizes for primary controls</p>
			<p><strong>70-100px:</strong> Prominent features, accessibility-focused</p>

			<h6>Touch Targets</h6>
			<p>Mobile interfaces should use minimum 40px for proper touch accessibility</p>

			<h6>Visual Hierarchy</h6>
			<p>Use different sizes to establish importance and visual hierarchy in your interface</p>

			<h6>Performance</h6>
			<p>All sizes render efficiently using CSS scaling rather than different assets</p>
		</div>
	</ShowcaseSection>

	<ShowcaseSection
		title="Orientation Comparison"
		subtitle="Side-by-side horizontal and vertical switches">
		<div slot="demo" class="d-flex justify-content-center align-items-center" style="min-height: 250px;">
			<div class="row w-100">
				<div class="col-6 text-center">
					<h6 class="text-primary mb-3">Horizontal</h6>
					<Switch
						checked={true}
						direction="horizontal"
						size={60}
					>
						{#snippet children({ checked })}
							<span class="thumb-content">→</span>
						{/snippet}
					</Switch>
					<div class="mt-3">
						<MultiSwitch
							selectedIndex={2}
							steps={4}
							direction="horizontal"
							size={50}
						>
							{#snippet children({ selectedIndex })}
								<span class="thumb-content">{selectedIndex + 1}</span>
							{/snippet}
						</MultiSwitch>
					</div>
				</div>
				<div class="col-6 text-center">
					<h6 class="text-success mb-3">Vertical</h6>
					<Switch
						checked={true}
						direction="vertical"
						size={60}
					>
						{#snippet children({ checked })}
							<span class="thumb-content">↑</span>
						{/snippet}
					</Switch>
					<div class="mt-3">
						<MultiSwitch
							selectedIndex={2}
							steps={4}
							direction="vertical"
							size={50}
						>
							{#snippet children({ selectedIndex })}
								<span class="thumb-content">{selectedIndex + 1}</span>
							{/snippet}
						</MultiSwitch>
					</div>
				</div>
			</div>
		</div>

		<div slot="controls">
			<div class="form-group mb-3">
				<label class="form-label">Responsive Breakpoints</label>
				<select class="form-select" bind:value={currentBreakpoint}>
					<option value="mobile">Mobile (40px)</option>
					<option value="tablet">Tablet (50px)</option>
					<option value="desktop">Desktop (60px)</option>
				</select>
			</div>

			<div class="form-group mb-3">
				<label class="form-label">Current Size</label>
				<div class="bg-light p-2 rounded">
					<strong>{responsiveSizes[currentBreakpoint as keyof typeof responsiveSizes]}px</strong>
					for {currentBreakpoint} devices
				</div>
			</div>

			<div class="form-group mb-3">
				<label class="form-label">Layout Considerations</label>
				<div class="small text-muted">
					<strong>Horizontal:</strong> Best for most interfaces<br>
					<strong>Vertical:</strong> Space-saving, unique layouts
				</div>
			</div>
		</div>

		<div slot="description">
			<h6>Horizontal Orientation</h6>
			<p>Default orientation, familiar to users, works well in most layouts</p>

			<h6>Vertical Orientation</h6>
			<p>Space-efficient for narrow layouts, creates visual interest</p>

			<h6>Responsive Sizing</h6>
			<pre><code>// CSS media queries
@media (max-width: 768px) {'{'}
  .switch {'{ size: 40px; }'}
{'}'}</code></pre>

			<h6>Layout Integration</h6>
			<p>Both orientations maintain consistent behavior and styling while adapting to different space constraints</p>

			<h6>Multi-Step Support</h6>
			<p>Both Switch and MultiSwitch components support horizontal and vertical orientations</p>
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

	.form-check-label strong {
		color: #374151;
	}

	.btn-group .btn {
		flex: 1;
	}
</style>