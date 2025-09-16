<script lang="ts">
	import { Switch, MultiSwitch } from '$lib';

	let basicChecked = $state(false);
	let featureIndex = $state(1);

	// Feature showcase styles
	const featureStyles = [
		{ backgroundColor: '#6366f1', thumbColor: '#4338ca', borderColor: '#5b21b6' }, // Purple
		{ backgroundColor: '#10b981', thumbColor: '#047857', borderColor: '#059669' }, // Green
		{ backgroundColor: '#f59e0b', thumbColor: '#d97706', borderColor: '#f59e0b' }, // Orange
	];
</script>

<div class="row">
	<div class="col-12">
		<div class="jumbotron bg-light p-5 rounded">
			<h1 class="display-4">🔄 Svelte Switch v1.0</h1>
			<p class="lead">
				A modern, customizable switch component library for Svelte 5
				with support for both binary and multi-step switches.
			</p>
			<hr class="my-4">
			<p>
				This showcase demonstrates all the key features and capabilities of the library.
				Use the navigation menu to explore different aspects of the components.
			</p>
		</div>
	</div>
</div>

<div class="row mt-4">
	<div class="col-lg-6">
		<div class="card h-100">
			<div class="card-body">
				<h5 class="card-title">🔘 Binary Switch</h5>
				<p class="card-text">
					Classic on/off toggle functionality with customizable sizing, orientation, and styling options.
				</p>
				<div class="text-center py-3">
					<Switch
						bind:checked={basicChecked}
						size={60}
					>
						{#snippet children({ checked })}
							<span class="thumb-content">
								{checked ? '✓' : '✗'}
							</span>
						{/snippet}
					</Switch>
				</div>
				<a href="/basic" class="btn btn-primary">Learn More</a>
			</div>
		</div>
	</div>

	<div class="col-lg-6">
		<div class="card h-100">
			<div class="card-body">
				<h5 class="card-title">🎚️ Multi-Step Switch</h5>
				<p class="card-text">
					Variable step switches perfect for volume controls, temperature settings, and multi-option selections.
				</p>
				<div class="text-center py-3">
					<MultiSwitch
						bind:selectedIndex={featureIndex}
						stepsCount={3}
						size={70}
						stepStyles={featureStyles}
					>
						{#snippet children({ selectedIndex })}
							<span class="thumb-content" style="color: white; font-weight: bold;">
								{['🚀', '⭐', '🔥'][selectedIndex]}
							</span>
						{/snippet}
					</MultiSwitch>
				</div>
				<a href="/multi-step" class="btn btn-outline-primary">Explore</a>
			</div>
		</div>
	</div>
</div>

<div class="row mt-4">
	<div class="col-md-4">
		<div class="card">
			<div class="card-body">
				<h5 class="card-title">🎨 Custom Styling</h5>
				<p class="card-text">
					Visual customization options, color theming, and CSS class configurations.
				</p>
				<a href="/custom-styling" class="btn btn-outline-primary">Customize</a>
			</div>
		</div>
	</div>

	<div class="col-md-4">
		<div class="card">
			<div class="card-body">
				<h5 class="card-title">📏 Sizes & Orientations</h5>
				<p class="card-text">
					Flexible sizing and both horizontal and vertical orientation support.
				</p>
				<a href="/sizes" class="btn btn-outline-primary">Resize</a>
			</div>
		</div>
	</div>

	<div class="col-md-4">
		<div class="card">
			<div class="card-body">
				<h5 class="card-title">⌨️ Accessibility</h5>
				<p class="card-text">
					Full keyboard navigation, ARIA support, and screen reader compatibility.
				</p>
				<a href="/basic" class="btn btn-outline-primary">Test</a>
			</div>
		</div>
	</div>
</div>

<div class="row mt-5">
	<div class="col-12">
		<div class="alert alert-info">
			<h6 class="alert-heading">🚀 Quick Start</h6>
			<div class="row">
				<div class="col-md-6">
					<strong>Installation:</strong>
					<pre class="bg-dark text-light p-2 rounded mt-2"><code>npm install @keenmate/svelte-switch</code></pre>
				</div>
				<div class="col-md-6">
					<strong>Basic Usage:</strong>
					<pre class="bg-dark text-light p-2 rounded mt-2"><code>&lt;Switch bind:checked={'{myValue}'} /&gt;</code></pre>
				</div>
			</div>
		</div>
	</div>
</div>

<div class="row mt-4">
	<div class="col-12">
		<div class="alert alert-success">
			<h6 class="alert-heading">✨ Key Features</h6>
			<div class="row">
				<div class="col-md-6">
					<ul class="mb-0">
						<li><strong>Zero Dependencies</strong> - Only peer dependency on Svelte 5</li>
						<li><strong>TypeScript Support</strong> - Complete type safety</li>
						<li><strong>Accessibility</strong> - Full keyboard and screen reader support</li>
					</ul>
				</div>
				<div class="col-md-6">
					<ul class="mb-0">
						<li><strong>Custom Content</strong> - Slot support for icons and text</li>
						<li><strong>Flexible Styling</strong> - SCSS variables and CSS custom properties</li>
						<li><strong>Modern Svelte 5</strong> - Built with latest Svelte features</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
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