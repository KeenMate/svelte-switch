<script lang="ts">
	import { Switch, MultiSwitch } from '$lib';
	import ExampleHeader from '../ExampleHeader.svelte';

	type StepStyle = { backgroundColor?: string; thumbColor?: string; thumbBorderColor?: string };
	type Theme = {
		id: string;
		class: string;
		name: string;
		description: string;
		items: string[];
		itemStyles: StepStyle[];
	};

	const themes: Theme[] = [
		{
			id: 'default',
			class: '',
			name: 'Default',
			description: 'Hardcoded fallbacks — no --base-* set. Multi has no itemStyles.',
			items: ['Small', 'Medium', 'Large'],
			itemStyles: []
		},
		{
			id: 'dark',
			class: 'dark-theme',
			name: 'Dark',
			description: 'Dark surfaces, blue accent. Multi steps follow blue intensity.',
			items: ['Low', 'Med', 'High'],
			itemStyles: [
				{ backgroundColor: '#3a3a3a', thumbColor: '#cbd5ff', thumbBorderColor: '#667eea' },
				{ backgroundColor: '#3949ab', thumbColor: '#e8eaf6', thumbBorderColor: '#5c6bc0' },
				{ backgroundColor: '#667eea', thumbColor: '#ffffff', thumbBorderColor: '#1a237e' }
			]
		},
		{
			id: 'neon',
			class: 'neon-theme',
			name: 'Neon / Cyberpunk',
			description: 'Magenta + cyan on near-black. Multi steps cycle the palette.',
			items: ['Off', 'Pulse', 'Strobe'],
			itemStyles: [
				{ backgroundColor: '#1a0a1a', thumbColor: '#00ffff', thumbBorderColor: '#00aaaa' },
				{ backgroundColor: '#660066', thumbColor: '#00ffff', thumbBorderColor: '#ff00ff' },
				{ backgroundColor: '#ff00ff', thumbColor: '#00ffff', thumbBorderColor: '#ffffff' }
			]
		},
		{
			id: 'audi',
			class: 'audi-theme',
			name: 'Audi Sport',
			description: 'Brand red on light gray. Multi steps escalate from eco to dynamic.',
			items: ['Eco', 'Comfort', 'Dynamic'],
			itemStyles: [
				{ backgroundColor: '#e8f5e9', thumbColor: '#ffffff', thumbBorderColor: '#bbbbbb' },
				{ backgroundColor: '#f5f5f5', thumbColor: '#ffffff', thumbBorderColor: '#bbbbbb' },
				{ backgroundColor: '#bb0a30', thumbColor: '#ffffff', thumbBorderColor: '#7a071f' }
			]
		},
		{
			id: 'rounded',
			class: 'rounded-theme',
			name: 'Rounded Pink',
			description: 'Pillow corners, soft pink palette. Multi steps walk pink shades.',
			items: ['Soft', 'Cozy', 'Hugs'],
			itemStyles: [
				{ backgroundColor: '#fff5f0', thumbColor: '#ffd6e3', thumbBorderColor: '#f8bbd0' },
				{ backgroundColor: '#ffd6e3', thumbColor: '#ff6b9d', thumbBorderColor: '#ff4081' },
				{ backgroundColor: '#ff6b9d', thumbColor: '#ffffff', thumbBorderColor: '#c2185b' }
			]
		},
		{
			id: 'sharp',
			class: 'sharp-theme',
			name: 'Sharp Brutalist',
			description: 'Pure black/white, no shadows, zero radius. Multi steps invert.',
			items: ['Mute', 'Soft', 'Loud'],
			itemStyles: [
				{ backgroundColor: '#ffffff', thumbColor: '#ffffff', thumbBorderColor: '#000000' },
				{ backgroundColor: '#888888', thumbColor: '#ffffff', thumbBorderColor: '#000000' },
				{ backgroundColor: '#000000', thumbColor: '#ffffff', thumbBorderColor: '#000000' }
			]
		},
		{
			id: 'material',
			class: 'material-theme',
			name: 'Material',
			description: 'Google Material Design blues. Multi steps escalate elevation.',
			items: ['100', '300', '500'],
			itemStyles: [
				{ backgroundColor: '#bbdefb', thumbColor: '#ffffff', thumbBorderColor: '#90caf9' },
				{ backgroundColor: '#64b5f6', thumbColor: '#ffffff', thumbBorderColor: '#42a5f5' },
				{ backgroundColor: '#1976d2', thumbColor: '#ffffff', thumbBorderColor: '#0d47a1' }
			]
		},
		{
			id: 'glass',
			class: 'glass-theme',
			name: 'Glassmorphism',
			description: 'Translucent surfaces over a gradient. Multi steps stack opacity.',
			items: ['Mist', 'Veil', 'Pane'],
			itemStyles: [
				{
					backgroundColor: 'rgba(255,255,255,0.15)',
					thumbColor: '#ffffff',
					thumbBorderColor: 'rgba(255,255,255,0.4)'
				},
				{
					backgroundColor: 'rgba(255,255,255,0.3)',
					thumbColor: '#ffffff',
					thumbBorderColor: 'rgba(255,255,255,0.6)'
				},
				{
					backgroundColor: 'rgba(255,255,255,0.55)',
					thumbColor: '#667eea',
					thumbBorderColor: '#ffffff'
				}
			]
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
			Component-level <code>--sw-*</code> variables resolve through
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
  --base-border-radius-sm: 1.2;     /* coefficient × --sw-rem (default 10px) → 12px */
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
						items={theme.items}
						itemStyles={theme.itemStyles.length ? theme.itemStyles : undefined}
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
  style="--sw-accent-color: #f43f5e; --sw-border-radius: 999px"
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
		/* Segment hints — lighten on dark surface */
		--sw-step-bg: rgba(255, 255, 255, 0.06);
		--sw-step-bg-active: rgba(255, 255, 255, 0.12);
	}
	.dark-theme h3,
	.dark-theme p {
		color: #e5e5e5;
	}

	/* Neon / Cyberpunk — magenta surface with cyan thumb to honor the
	   "magenta + cyan on near-black" identity */
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
		--sw-thumb-bg: #00ffff;
		--sw-thumb-border-color: #ff00ff;
		/* Segment hints — cyan-tinted on the magenta surface */
		--sw-step-bg: rgba(0, 255, 255, 0.12);
		--sw-step-bg-active: rgba(0, 255, 255, 0.22);
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
		--base-border-radius-sm: 0.2;
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
		--base-border-radius-sm: 2.4;
	}
	.rounded-theme h3,
	.rounded-theme p {
		color: #5a3e36;
	}

	/* Sharp Brutalist — explicitly opts back into a thumb border (the brutalist look
	   needs the hard outline; the default theme-var layer keeps thumb-border transparent) */
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
		--sw-thumb-border-color: #000000;
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
		--base-border-radius-sm: 0.4;
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
		--base-border-radius-sm: 1.2;
		/* Segment hints — white-tinted on the translucent gradient */
		--sw-step-bg: rgba(255, 255, 255, 0.15);
		--sw-step-bg-active: rgba(255, 255, 255, 0.3);
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
