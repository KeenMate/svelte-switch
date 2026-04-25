<script lang="ts">
	import { Switch, MultiSwitch } from '$lib';
	import ExampleHeader from '../ExampleHeader.svelte';

	const themes = [
		{
			id: 'default',
			class: '',
			name: 'Default',
			description: 'Hardcoded fallbacks — no --base-* set.'
		},
		{ id: 'dark', class: 'dark-theme', name: 'Dark', description: 'Dark surfaces, blue accent.' },
		{
			id: 'neon',
			class: 'neon-theme',
			name: 'Neon / Cyberpunk',
			description: 'Magenta + cyan on near-black.'
		},
		{
			id: 'audi',
			class: 'audi-theme',
			name: 'Audi Sport',
			description: 'Sharp corners, dark red accent on light gray.'
		},
		{
			id: 'rounded',
			class: 'rounded-theme',
			name: 'Rounded Pink',
			description: 'Pillow corners, soft pink palette.'
		},
		{
			id: 'sharp',
			class: 'sharp-theme',
			name: 'Sharp Brutalist',
			description: 'Pure black/white, no shadows, zero radius.'
		},
		{
			id: 'material',
			class: 'material-theme',
			name: 'Material',
			description: 'Google Material Design blues.'
		},
		{
			id: 'glass',
			class: 'glass-theme',
			name: 'Glassmorphism',
			description: 'Translucent surfaces over a gradient.'
		}
	];

	const swStates = $state(themes.map(() => ({ checked: false, multi: 1 })));
</script>

<svelte:head>
	<title>Theming - Svelte Switch</title>
</svelte:head>

<div class="container">
	<ExampleHeader
		title="🎨 Theming via --base-* variables"
		subtitle="Set --base-* on a parent element and svelte-switch picks them up automatically — same convention as @keenmate/web-multiselect and @keenmate/web-daterangepicker. Theme presets below are ported verbatim from the multiselect library."
	/>

	<section class="card">
		<h2>How it works</h2>
		<p>
			Component-level <code>--switch-*</code> variables resolve through
			<code>var(--base-*, fallback)</code>. Wrap one or more switch components in an element that
			sets <code>--base-accent-color</code>, <code>--base-primary-bg</code>, etc. — every nested
			switch picks up the theme.
		</p>
		<div class="code-block">
			<pre>{`.my-theme {
  --base-accent-color: #8b5cf6;
  --base-primary-bg: #1f2937;       /* off-state surface */
  --base-input-bg: #f9fafb;         /* thumb */
  --base-border-color: #4b5563;
  --base-border-radius-sm: 12px;
  --base-text-color-3: #9ca3af;     /* inactive label */
  --base-text-color-1: #f9fafb;     /* active label */
}`}</pre>
		</div>
	</section>

	<h2 style="margin-top: 2rem;">Theme presets</h2>
	<p class="description">
		Same components, just different <code>--base-*</code> values on each theme container.
	</p>

	<div class="theme-grid">
		{#each themes as theme, i}
			<section class="card theme-card {theme.class}">
				<h3>{theme.name}</h3>
				<p class="theme-description">{theme.description}</p>
				<div class="demo-row">
					<Switch bind:checked={swStates[i].checked} size={60} />
					<MultiSwitch
						bind:selectedIndex={swStates[i].multi}
						items={['Small', 'Medium', 'Large']}
						size={60}
						shouldDisplayLabels={true}
						labelPosition="bottom"
						labelRenderMode="block"
					/>
				</div>
			</section>
		{/each}
	</div>

	<section class="card" style="margin-top: 2rem;">
		<h2>Per-instance overrides</h2>
		<p>
			Skip <code>--base-*</code> entirely and target the component-level variables directly when you want
			one-off styling:
		</p>
		<div class="code-block">
			<pre>{`<Switch
  size={80}
  style="--switch-accent-color: #f43f5e; --switch-border-radius: 999px"
/>`}</pre>
		</div>
		<p class="description" style="margin-top: 1rem;">
			Full variable list: <code>component-variables.manifest.json</code> at the package root.
		</p>
	</section>
</div>

<style>
	.theme-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
		gap: 1.5rem;
		margin-bottom: 2rem;
	}

	.theme-card {
		padding: 1.5rem;
		margin: 0;
	}

	.theme-card h3 {
		margin: 0 0 0.5rem 0;
		font-size: 1.1rem;
	}

	.theme-description {
		font-size: 0.875rem;
		opacity: 0.85;
		margin-bottom: 1.25rem;
	}

	.demo-row {
		display: flex;
		gap: 1.5rem;
		align-items: center;
		justify-content: center;
		min-height: 120px;
	}

	/* ============================================================================
	   THEME PRESETS — ported verbatim from @keenmate/web-multiselect
	   examples-theming.html. Only the --base-* variables that svelte-switch
	   actually consumes are needed; multiselect-specific --ms-* overrides are
	   omitted because they don't apply here.
	   ============================================================================ */

	/* Dark Mode */
	.dark-theme {
		background: #1a1a1a;
		--base-accent-color: #667eea;
		--base-text-color-1: #e5e5e5;
		--base-text-color-3: #808080;
		--base-border-color: #404040;
		--base-input-bg: #2a2a2a;
		--base-primary-bg: #3a3a3a;
	}
	.dark-theme h3,
	.dark-theme p {
		color: #e5e5e5;
	}

	/* Neon / Cyberpunk */
	.neon-theme {
		background: #0a0a0a;
		position: relative;
		overflow: hidden;
		--base-accent-color: #ff00ff;
		--base-text-color-1: #00ffff;
		--base-text-color-3: rgba(0, 255, 255, 0.6);
		--base-border-color: #ff00ff;
		--base-input-bg: #1a0a1a;
		--base-primary-bg: rgba(255, 0, 255, 0.3);
	}
	.neon-theme::before {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(45deg, rgba(255, 0, 255, 0.1), rgba(0, 255, 255, 0.1));
		pointer-events: none;
	}
	.neon-theme h3,
	.neon-theme p {
		color: #00ffff;
		text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
		position: relative;
	}
	.neon-theme .demo-row {
		position: relative;
	}

	/* Audi Sport */
	.audi-theme {
		background: #ffffff;
		--base-text-color-1: #333333;
		--base-text-color-3: #666666;
		--base-border-color: #d0d0d0;
		--base-primary-bg: #f5f5f5;
		--base-accent-color: #bb0a30;
		--base-border-radius-sm: 2px;
	}
	.audi-theme h3 {
		color: #bb0a30;
		font-weight: 700;
		letter-spacing: 0.05em;
	}

	/* Rounded Pink */
	.rounded-theme {
		background: #fff5f0;
		--base-text-color-1: #5a3e36;
		--base-text-color-3: #b08070;
		--base-border-color: #f0d0c0;
		--base-primary-bg: #ffe5dc;
		--base-accent-color: #ff6b9d;
		--base-border-radius-sm: 24px;
	}
	.rounded-theme h3,
	.rounded-theme p {
		color: #5a3e36;
	}

	/* Sharp Brutalist */
	.sharp-theme {
		background: #ffffff;
		border: 2px solid #000000 !important;
		--base-text-color-1: #000000;
		--base-text-color-3: #555555;
		--base-border-color: #000000;
		--base-primary-bg: #f0f0f0;
		--base-accent-color: #000000;
		--base-border-radius-sm: 0;
		--base-shadow-sm: none;
	}
	.sharp-theme h3 {
		color: #000;
		text-transform: uppercase;
		letter-spacing: 0.1em;
	}

	/* Material */
	.material-theme {
		background: #ffffff;
		--base-text-color-1: #212121;
		--base-text-color-3: #757575;
		--base-border-color: #e0e0e0;
		--base-primary-bg: #f5f5f5;
		--base-accent-color: #1976d2;
		--base-border-radius-sm: 4px;
	}

	/* Glassmorphism */
	.glass-theme {
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		position: relative;
		overflow: hidden;
		--base-accent-color: #ffffff;
		--base-text-color-1: #ffffff;
		--base-text-color-3: rgba(255, 255, 255, 0.7);
		--base-border-color: rgba(255, 255, 255, 0.3);
		--base-input-bg: rgba(255, 255, 255, 0.15);
		--base-primary-bg: rgba(255, 255, 255, 0.25);
		--base-border-radius-sm: 12px;
	}
	.glass-theme::before {
		content: '';
		position: absolute;
		inset: 0;
		backdrop-filter: blur(10px);
		pointer-events: none;
	}
	.glass-theme h3,
	.glass-theme p {
		color: #ffffff;
		position: relative;
	}
	.glass-theme .demo-row {
		position: relative;
	}
</style>
