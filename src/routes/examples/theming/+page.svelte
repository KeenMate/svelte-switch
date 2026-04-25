<script lang="ts">
	import { Switch, MultiSwitch } from '$lib';
	import ExampleHeader from '../ExampleHeader.svelte';

	let demoChecked = $state(false);
	let demoIndex = $state(1);
</script>

<svelte:head>
	<title>Theming - Svelte Switch</title>
</svelte:head>

<div class="container">
	<ExampleHeader
		title="🎨 Theming via --base-* variables"
		subtitle="Set --base-* on a parent element and svelte-switch picks them up automatically — same convention as @keenmate/web-multiselect and @keenmate/web-daterangepicker."
	/>

	<section class="card">
		<h2>How it works</h2>
		<p>
			Component-level <code>--switch-*</code> variables resolve through
			<code>var(--base-*, fallback)</code>. Wrap one or more switch components in an element that
			sets <code>--base-accent-color</code>,
			<code>--base-disabled-bg</code>, etc. — every nested switch picks up the theme.
		</p>
		<div class="code-block">
			<pre>{`.my-theme {
  --base-accent-color: #8b5cf6;     /* purple focus ring + accents */
  --base-disabled-bg: #1f2937;      /* off-state background */
  --base-input-bg: #f9fafb;         /* thumb */
  --base-border-color: #4b5563;
  --base-border-radius-sm: 12px;
  --base-text-color-3: #9ca3af;     /* inactive label */
  --base-text-color-1: #f9fafb;     /* active label */
}`}</pre>
		</div>
	</section>

	<section class="card">
		<h2>Default theme (no overrides)</h2>
		<div class="demo-area" style="display: flex; gap: 2rem; align-items: center; padding: 1.5rem;">
			<Switch bind:checked={demoChecked} size={60} />
			<MultiSwitch
				bind:selectedIndex={demoIndex}
				items={['Small', 'Medium', 'Large']}
				size={60}
				shouldDisplayLabels={true}
				labelPosition="bottom"
				labelRenderMode="block"
			/>
		</div>
	</section>

	<section class="card theme-violet">
		<h2>Violet theme</h2>
		<p class="description">
			Same components, different <code>--base-*</code> values on the section.
		</p>
		<div class="demo-area" style="display: flex; gap: 2rem; align-items: center; padding: 1.5rem;">
			<Switch checked={true} size={60} />
			<MultiSwitch
				selectedIndex={1}
				items={['Small', 'Medium', 'Large']}
				size={60}
				shouldDisplayLabels={true}
				labelPosition="bottom"
				labelRenderMode="block"
			/>
		</div>
	</section>

	<section class="card theme-emerald">
		<h2>Emerald + dark surface</h2>
		<div class="demo-area" style="display: flex; gap: 2rem; align-items: center; padding: 1.5rem;">
			<Switch checked={true} size={60} />
			<MultiSwitch
				selectedIndex={2}
				items={['Cold', 'Warm', 'Hot', 'Lava']}
				size={60}
				shouldDisplayLabels={true}
				labelPosition="bottom"
				labelRenderMode="block"
			/>
		</div>
	</section>

	<section class="card">
		<h2>Component variables</h2>
		<p>
			Skip <code>--base-*</code> entirely and target the component-level variables directly when you want
			per-instance overrides:
		</p>
		<div class="code-block">
			<pre>{`<Switch
  size={80}
  style="--switch-accent-color: #f43f5e; --switch-border-radius: 999px"
/>`}</pre>
		</div>
		<p class="description" style="margin-top: 1rem;">
			Full variable list: see <code>component-variables.manifest.json</code> at the package root.
		</p>
	</section>
</div>

<style>
	.theme-violet {
		--base-accent-color: #8b5cf6;
		--base-disabled-bg: #ede9fe;
		--base-border-color: #c4b5fd;
		--base-border-radius-sm: 12px;
		--base-text-color-3: #7c3aed;
		--base-text-color-1: #4c1d95;
	}

	.theme-emerald {
		--base-accent-color: #10b981;
		--base-disabled-bg: #1f2937;
		--base-input-bg: #f9fafb;
		--base-border-color: #4b5563;
		--base-border-radius-sm: 999px;
		--base-text-color-3: #9ca3af;
		--base-text-color-1: #f9fafb;
		background: #111827;
		color: #f9fafb;
	}

	.theme-emerald h2,
	.theme-emerald .description {
		color: inherit;
	}
</style>
