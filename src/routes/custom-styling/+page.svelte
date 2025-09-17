<script lang="ts">
	import { Switch, MultiSwitch } from '$lib';
	import ShowcaseSection from '../ShowcaseSection.svelte';

	// Custom styling configuration
	let checked = $state(false);
	let selectedIndex = $state(1);

	// Theme configurations
	const themes = {
		default: { backgroundColor: '#4299e1', thumbColor: 'white', thumbBorderColor: 'transparent' },
		success: { backgroundColor: '#10b981', thumbColor: '#065f46', thumbBorderColor: '#047857' },
		warning: { backgroundColor: '#f59e0b', thumbColor: '#92400e', thumbBorderColor: '#d97706' },
		danger: { backgroundColor: '#ef4444', thumbColor: '#991b1b', thumbBorderColor: '#dc2626' },
		purple: { backgroundColor: '#8b5cf6', thumbColor: '#5b21b6', thumbBorderColor: '#7c3aed' },
		dark: { backgroundColor: '#374151', thumbColor: '#111827', thumbBorderColor: '#4b5563' }
	};

	let selectedTheme = $state('success');

	// Custom color configuration
	let customBg = $state('#ff6b6b');
	let customThumb = $state('#ffffff');
	let customThumbBorder = $state('#ff5252');

	// Multi-step gradient themes
	const gradientStyles = [
		{ backgroundColor: '#667eea', thumbColor: '#764ba2', thumbBorderColor: '#5a67d8' },
		{ backgroundColor: '#f093fb', thumbColor: '#f5576c', thumbBorderColor: '#ed64a6' },
		{ backgroundColor: '#4facfe', thumbColor: '#00f2fe', thumbBorderColor: '#4299e1' },
		{ backgroundColor: '#43e97b', thumbColor: '#38f9d7', thumbBorderColor: '#48bb78' }
	];

	const currentTheme = $derived(themes[selectedTheme as keyof typeof themes]);
	const customStyle = $derived({
		backgroundColor: customBg,
		thumbColor: customThumb,
		thumbBorderColor: customThumbBorder
	});

	function onToggle(checked: boolean) {
		console.log('Custom styled switch toggled:', checked);
	}

	function onItemChange(index: number) {
		console.log('Custom styled multi-step changed:', index);
	}
</script>

<div class="container-fluid">
	<div class="row mb-4">
		<div class="col-12">
			<h1>Custom Styling</h1>
			<p class="lead">Explore theming, custom colors, and visual customization options.</p>
		</div>
	</div>

	<ShowcaseSection
		title="Predefined Themes"
		subtitle="Choose from built-in color themes for quick styling">
		{#snippet demo()}
			<div class="d-flex justify-content-center align-items-center" style="min-height: 200px;">
				<div class="text-center">
					<Switch
						bind:checked
						size={70}
						itemStyles={currentTheme}
						onToggle={onToggle}
					>
						{#snippet children({ currentIndex, item, isSelected })}
							<span class="thumb-content" style="color: {currentTheme.thumbColor}; font-weight: bold;">
								{isSelected ? '✓' : '○'}
							</span>
						{/snippet}
					</Switch>
					<div class="mt-3">
						<span class="badge" style="background-color: {currentTheme.backgroundColor};">
							{selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)} Theme
						</span>
					</div>
				</div>
			</div>
		{/snippet}

		{#snippet controls()}
			<div class="form-group mb-3">
				<label class="form-label">Theme Selection</label>
				<select class="form-select" bind:value={selectedTheme}>
					{#each Object.keys(themes) as theme}
						<option value={theme}>{theme.charAt(0).toUpperCase() + theme.slice(1)}</option>
					{/each}
				</select>
			</div>

			<div class="form-group mb-3">
				<label class="form-label">Current Theme Colors</label>
				<div class="d-flex gap-2 mt-2">
					<div class="color-preview" style="background-color: {currentTheme.backgroundColor};" title="Background"></div>
					<div class="color-preview" style="background-color: {currentTheme.thumbColor};" title="Thumb"></div>
					<div class="color-preview" style="background-color: {currentTheme.thumbBorderColor};" title="Thumb border"></div>
				</div>
				<small class="text-muted">Background • Thumb • Thumb border</small>
			</div>

			<div class="form-group mb-3">
				<div class="form-check">
					<input
						class="form-check-input"
						type="checkbox"
						bind:checked
						id="themedToggle"
					/>
					<label class="form-check-label" for="themedToggle">
						Toggle to see theme change
					</label>
				</div>
			</div>
		{/snippet}

		{#snippet description()}
			<h6>Predefined Themes</h6>
			<p>Six built-in themes: <code>default</code>, <code>success</code>, <code>warning</code>, <code>danger</code>, <code>purple</code>, <code>dark</code></p>

			<h6>Theme Structure</h6>
			<p>Each theme defines <code>backgroundColor</code>, <code>thumbColor</code>, and <code>thumbBorderColor</code></p>

			<h6>Usage</h6>
			<pre><code>const theme = {'{backgroundColor: "#10b981", thumbColor: "#065f46"}'};
&lt;Switch itemStyles={'{[theme]}'} /&gt;</code></pre>

			<h6>Dynamic Theming</h6>
			<p>Themes can be switched dynamically and work with both Switch and MultiSwitch components.</p>
		{/snippet}
	</ShowcaseSection>

	<ShowcaseSection
		title="Custom Color Picker"
		subtitle="Create your own color combinations with live preview">
		{#snippet demo()}
			<div class="d-flex justify-content-center align-items-center" style="min-height: 200px;">
				<div class="text-center">
					<Switch
						checked={true}
						size={70}
						itemStyles={customStyle}
					>
						{#snippet children({ currentIndex, item, isSelected })}
							<span class="thumb-content" style="color: {customThumb === '#ffffff' ? '#333' : '#fff'}; font-weight: bold;">
								{isSelected ? '★' : '☆'}
							</span>
						{/snippet}
					</Switch>
					<div class="mt-3">
						<span class="badge" style="background-color: {customBg}; color: white;">
							Custom Colors
						</span>
					</div>
				</div>
			</div>
		{/snippet}

		{#snippet controls()}
			<div class="form-group mb-3">
				<label class="form-label">Background Color</label>
				<div class="d-flex gap-2 align-items-center">
					<input
						type="color"
						class="form-control form-control-color"
						bind:value={customBg}
						style="width: 60px; height: 40px;"
					/>
					<input
						type="text"
						class="form-control form-control-sm"
						bind:value={customBg}
						placeholder="#ff6b6b"
					/>
				</div>
			</div>

			<div class="form-group mb-3">
				<label class="form-label">Thumb Color</label>
				<div class="d-flex gap-2 align-items-center">
					<input
						type="color"
						class="form-control form-control-color"
						bind:value={customThumb}
						style="width: 60px; height: 40px;"
					/>
					<input
						type="text"
						class="form-control form-control-sm"
						bind:value={customThumb}
						placeholder="#ffffff"
					/>
				</div>
			</div>

			<div class="form-group mb-3">
				<label class="form-label">Thumb border color</label>
				<div class="d-flex gap-2 align-items-center">
					<input
						type="color"
						class="form-control form-control-color"
						bind:value={customThumbBorder}
						style="width: 60px; height: 40px;"
					/>
					<input
						type="text"
						class="form-control form-control-sm"
						bind:value={customThumbBorder}
						placeholder="#ff5252"
					/>
				</div>
			</div>
		{/snippet}

		{#snippet description()}
			<h6>Custom Styling</h6>
			<p>Use color pickers or hex values to create unique color combinations</p>

			<h6>Color Properties</h6>
			<p><code>backgroundColor</code> - Switch background when active</p>
			<p><code>thumbColor</code> - Color of the thumb element</p>
			<p><code>thumbBorderColor</code> - Thumb border color for the thumb element</p>

			<h6>Live Preview</h6>
			<p>Colors update immediately as you adjust them, providing instant visual feedback</p>

			<h6>Hex Format</h6>
			<p>All colors accept standard hex format: <code>#ff6b6b</code>, <code>#ffffff</code>, etc.</p>
		{/snippet}
	</ShowcaseSection>

	<ShowcaseSection
		title="Multi-Step Gradient Themes"
		subtitle="Advanced styling with different colors for each step">
		{#snippet demo()}
			<div class="d-flex justify-content-center align-items-center" style="min-height: 200px;">
				<div class="text-center">
					<MultiSwitch
						bind:selectedIndex
						itemsCount={4}
						size={80}
						itemStyles={gradientStyles}
						onItemChange={onItemChange}
					>
						{#snippet children({ currentIndex, item, isSelected })}
							<span class="thumb-content" style="color: white; font-weight: bold; font-size: 1rem;">
								{['🌅', '🌸', '🌊', '🌿'][currentIndex]}
							</span>
						{/snippet}
					</MultiSwitch>
					<div class="mt-3">
						<span class="badge bg-primary">
							{['Sunset', 'Blossom', 'Ocean', 'Nature'][selectedIndex]} Theme
						</span>
					</div>
				</div>
			</div>
		{/snippet}

		{#snippet controls()}
			<div class="form-group mb-3">
				<label class="form-label">Step Themes</label>
				<div class="row g-2">
					{#each gradientStyles as style, index}
						<div class="col-6">
							<div
								class="card p-2 theme-card {selectedIndex === index ? 'border-primary' : ''}"
								onclick={() => selectedIndex = index}
							>
								<div class="d-flex gap-2">
									<div class="color-preview-small" style="background-color: {style.backgroundColor};"></div>
									<div class="color-preview-small" style="background-color: {style.thumbColor};"></div>
									<div class="color-preview-small" style="background-color: {style.thumbBorderColor};"></div>
								</div>
								<small class="text-muted mt-1">{['Sunset', 'Blossom', 'Ocean', 'Nature'][index]}</small>
							</div>
						</div>
					{/each}
				</div>
			</div>

			<div class="form-group mb-3">
				<label class="form-label">Selected Step</label>
				<select class="form-select" bind:value={selectedIndex}>
					{#each ['Sunset', 'Blossom', 'Ocean', 'Nature'] as theme, index}
						<option value={index}>{theme}</option>
					{/each}
				</select>
			</div>
		{/snippet}

		{#snippet description()}
			<h6>Multi-Step Styling</h6>
			<p>Each step can have its own unique color scheme for rich visual experiences</p>

			<h6>Gradient Themes</h6>
			<p>Create cohesive color progressions that guide users through different states</p>

			<h6>Step Array</h6>
			<pre><code>const itemStyles = [
  {'{backgroundColor: "#667eea", thumbColor: "#764ba2"}'},
  {'{backgroundColor: "#f093fb", thumbColor: "#f5576c"}'},
  // ... more steps
];</code></pre>

			<h6>Dynamic Updates</h6>
			<p>Colors transition smoothly as users navigate between steps, creating engaging interactions</p>
		{/snippet}
	</ShowcaseSection>

	<!-- thumbTemplate vs children example -->
	<ShowcaseSection title="thumbTemplate vs children">
		{#snippet demo()}
			<Switch
				bind:checked={checked}
				size={70}
				itemStyles={[
					{ backgroundColor: '#e74c3c', thumbColor: '#fff' },
					{ backgroundColor: '#27ae60', thumbColor: '#fff' }
				]}
			>
				{#snippet thumbTemplate({ currentIndex, currentItem, itemsCount })}
					<div class="text-center" style="color: #333; font-weight: bold; font-size: 0.8rem;">
						Step {currentIndex + 1}/{itemsCount}
					</div>
				{/snippet}
			</Switch>

			<div class="mt-4">
				<MultiSwitch
					bind:selectedIndex={selectedIndex}
					itemsCount={4}
					size={60}
					itemStyles={[
						{ backgroundColor: '#3b82f6', thumbColor: '#fff' },
						{ backgroundColor: '#10b981', thumbColor: '#fff' },
						{ backgroundColor: '#f59e0b', thumbColor: '#fff' },
						{ backgroundColor: '#ef4444', thumbColor: '#fff' }
					]}
				>
					{#snippet thumbTemplate({ currentIndex, currentItem, itemsCount })}
						<div class="text-center" style="color: #333; font-weight: bold; font-size: 0.7rem;">
							{currentIndex + 1}/{itemsCount}
						</div>
					{/snippet}
				</MultiSwitch>
			</div>
		{/snippet}

		{#snippet controls()}
			<div class="form-group mb-3">
				<label class="form-label">Switch State</label>
				<div class="form-check">
					<input
						type="checkbox"
						class="form-check-input"
						bind:checked={checked}
						id="thumbTemplateChecked"
					/>
					<label class="form-check-label" for="thumbTemplateChecked">
						Toggle Switch
					</label>
				</div>
			</div>

			<div class="form-group mb-3">
				<label class="form-label">MultiSwitch Step</label>
				<select class="form-select" bind:value={selectedIndex}>
					<option value={0}>Step 1</option>
					<option value={1}>Step 2</option>
					<option value={2}>Step 3</option>
					<option value={3}>Step 4</option>
				</select>
			</div>
		{/snippet}

		{#snippet description()}
			<h6>thumbTemplate Feature</h6>
			<p>Use <code>thumbTemplate</code> when you need access to additional context like step count and current item data.</p>

			<h6>thumbTemplate vs children</h6>
			<ul>
				<li><strong>children:</strong> Basic content rendering with <code>{'{ currentIndex, item, isSelected }'}</code></li>
				<li><strong>thumbTemplate:</strong> Enhanced context with <code>{'{ currentIndex, currentItem, itemsCount }'}</code></li>
			</ul>

			<h6>When to use thumbTemplate</h6>
			<p>Perfect for displaying step counters, progress indicators, or when you need to know the total number of items.</p>

			<h6>Example Usage</h6>
			<pre><code>&lt;Switch&gt;
  {'{#snippet thumbTemplate({ currentIndex, currentItem, itemsCount })'}
    &lt;div&gt;Step {'{ currentIndex + 1 }'}/{'{ itemsCount }'}&lt;/div&gt;
  {'{/snippet}'}
&lt;/Switch&gt;</code></pre>
		{/snippet}
	</ShowcaseSection>
</div>

<style>
	.color-preview {
		width: 40px;
		height: 30px;
		border-radius: 4px;
		border: 2px solid #e5e7eb;
		cursor: pointer;
	}

	.color-preview-small {
		width: 20px;
		height: 20px;
		border-radius: 3px;
		border: 1px solid #e5e7eb;
		flex-shrink: 0;
	}

	:global(.thumb-content) {
		font-size: 0.75rem;
		font-weight: 600;
		color: #666;
		line-height: 1;
		user-select: none;
		pointer-events: none;
	}

	.card {
		transition: border-color 0.2s ease;
	}

	.theme-card {
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.theme-card:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	}

	.theme-card.border-primary {
		box-shadow: 0 2px 8px rgba(13, 110, 253, 0.3);
	}
</style>