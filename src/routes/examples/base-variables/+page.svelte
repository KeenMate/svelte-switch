<script lang="ts">
	import { Switch, MultiSwitch } from '$lib';
	import ExampleHeader from '../ExampleHeader.svelte';

	type VarKind = 'color' | 'text' | 'number';

	interface VarDef {
		name: string;
		kind: VarKind;
		default: string;
		usage: string;
		// Optional separate default for the color input when the canonical default
		// isn't a `#rrggbb` hex (color inputs can't display rgba / named colors).
		colorDefault?: string;
	}

	// All --base-* variables that svelte-switch consumes, in display order.
	const varDefs: VarDef[] = [
		{
			name: '--base-accent-color',
			kind: 'color',
			default: '#3b82f6',
			usage: 'Focus ring + binary Switch on-state surface'
		},
		{
			name: '--base-primary-bg',
			kind: 'color',
			default: '#e5e7eb',
			usage: 'Off / unselected switch surface (whole container)'
		},
		{
			name: '--base-accent-color-light',
			kind: 'color',
			default: 'rgba(59, 130, 246, 0.1)',
			colorDefault: '#dbeafe',
			usage: 'Inactive MultiSwitch step segments. Picker = full-opacity tint; text input = rgba for alpha control'
		},
		{
			name: '--base-accent-color-light-hover',
			kind: 'color',
			default: 'rgba(59, 130, 246, 0.15)',
			colorDefault: '#bfdbfe',
			usage: 'Active step segment (under the thumb). Picker = full-opacity tint; text input = rgba'
		},
		{
			name: '--base-text-color-on-accent',
			kind: 'color',
			default: '#ffffff',
			usage: 'Thumb fill — must contrast with the surface'
		},
		{
			name: '--base-border-color',
			kind: 'color',
			default: '#d1d5db',
			usage: 'Default border color (used by some themes for thumb borders)'
		},
		{
			name: '--base-text-color-1',
			kind: 'color',
			default: '#111827',
			usage: 'Active label text'
		},
		{
			name: '--base-text-color-3',
			kind: 'color',
			default: '#6b7280',
			usage: 'Inactive label text'
		},
		{
			name: '--base-border-radius-sm',
			kind: 'text',
			default: '4px',
			usage: 'Corner radius for switch, thumb, segments'
		},
		{
			name: '--base-shadow-sm',
			kind: 'text',
			default: '0 2px 4px rgba(0, 0, 0, 0.2)',
			usage: 'Drop shadow under the thumb'
		},
		{
			name: '--base-font-size-sm',
			kind: 'text',
			default: '14px',
			usage: 'Base label font size (scales with switch size)'
		},
		{
			name: '--base-font-family',
			kind: 'text',
			default: 'inherit',
			usage: 'Label font family'
		}
	];

	// Live state — each variable's current value (null = inherit / use the
	// library's hardcoded fallback)
	let values = $state<Record<string, string | null>>(
		Object.fromEntries(varDefs.map((v) => [v.name, null]))
	);

	let multiIndex = $state(1);
	let switchOn = $state(false);

	// Resolved values — apply to the preview + CSS export. Skip null entries.
	const styleAttr = $derived(
		Object.entries(values)
			.filter(([, v]) => v !== null && v !== '')
			.map(([k, v]) => `${k}: ${v}`)
			.join('; ')
	);

	const cssExport = $derived(() => {
		const set = Object.entries(values).filter(([, v]) => v !== null && v !== '');
		if (set.length === 0) return '/* No overrides yet — defaults are in effect */';
		const body = set.map(([k, v]) => `  ${k}: ${v};`).join('\n');
		return `.my-app {\n${body}\n}`;
	});

	function reset() {
		for (const def of varDefs) values[def.name] = null;
	}

	function setAll() {
		for (const def of varDefs) values[def.name] = def.default;
	}
</script>

<svelte:head>
	<title>Base Variables Playground - Svelte Switch</title>
</svelte:head>

<div class="container">
	<ExampleHeader
		title="🎛️ Base Variables Playground"
		subtitle="Twiddle every --base-* variable the library consumes and watch the switches react in real time. Empty fields = no override (library default applies)."
	/>

	<section class="card">
		<div class="controls-header">
			<h2 style="margin: 0;">Controls</h2>
			<div class="controls-actions">
				<button type="button" class="btn-secondary" onclick={setAll}> Fill defaults </button>
				<button type="button" class="btn-secondary" onclick={reset}> Reset all </button>
			</div>
		</div>

		<div class="controls-grid">
			{#each varDefs as def}
				<div class="control-row" title={def.usage}>
					{#if def.kind === 'color'}
						<input
							type="color"
							value={values[def.name] ?? def.colorDefault ?? def.default}
							oninput={(e) => (values[def.name] = (e.target as HTMLInputElement).value)}
						/>
					{:else}
						<span class="swatch-placeholder" aria-hidden="true"></span>
					{/if}
					<code class="control-name">{def.name}</code>
					<input
						type="text"
						placeholder={def.default}
						value={values[def.name] ?? ''}
						oninput={(e) => {
							const v = (e.target as HTMLInputElement).value;
							values[def.name] = v === '' ? null : v;
						}}
					/>
					<button
						type="button"
						class="btn-clear"
						title="Clear override"
						onclick={() => (values[def.name] = null)}
						disabled={values[def.name] === null}
						aria-label="Clear {def.name}"
					>
						✕
					</button>
				</div>
			{/each}
		</div>
	</section>

	<section class="card">
		<h2>Live preview</h2>
		<div class="preview" style={styleAttr}>
			<div class="preview-row">
				<div class="preview-label">Binary, off</div>
				<Switch checked={false} size={60} />
			</div>
			<div class="preview-row">
				<div class="preview-label">Binary, on</div>
				<Switch checked={true} size={60} />
			</div>
			<div class="preview-row">
				<div class="preview-label">Binary, interactive</div>
				<Switch bind:checked={switchOn} size={60} />
			</div>
			<div class="preview-row">
				<div class="preview-label">Multi, no itemStyles</div>
				<MultiSwitch
					bind:selectedIndex={multiIndex}
					items={['Small', 'Medium', 'Large']}
					size={60}
					shouldDisplayLabels={true}
					labelPosition="bottom"
					labelRenderMode="block"
				/>
			</div>
			<div class="preview-row">
				<div class="preview-label">
					Multi, vertical<br /><small>active label = text-color-1, others = text-color-3</small>
				</div>
				<MultiSwitch
					bind:selectedIndex={multiIndex}
					items={['Quiet', 'Normal', 'Loud']}
					size={50}
					orientation="vertical"
					shouldDisplayLabels={true}
					labelPosition="right"
					labelRenderMode="block"
				/>
			</div>
		</div>
	</section>

	<section class="card">
		<h2>CSS export</h2>
		<p class="description">
			Copy this into your stylesheet to recreate the look you've configured. Apply the class to any
			ancestor of the switches you want themed.
		</p>
		<div class="code-block">
			<pre>{cssExport()}</pre>
		</div>
	</section>
</div>

<style>
	.preview {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		padding: 1.5rem;
		background: #fafafa;
		border-radius: 8px;
	}

	.preview-row {
		display: grid;
		grid-template-columns: 200px 1fr;
		align-items: center;
		gap: 1rem;
	}

	.preview-label {
		font-size: 0.875rem;
		color: #666;
		font-weight: 500;
	}

	.controls-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1.5rem;
	}

	.controls-actions {
		display: flex;
		gap: 0.5rem;
	}

	.controls-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
		gap: 0.25rem 1rem;
	}

	.control-row {
		display: grid;
		grid-template-columns: 24px minmax(0, 1fr) 140px 24px;
		align-items: center;
		gap: 0.5rem;
		padding: 0.25rem 0;
	}

	.control-name {
		font-size: 0.78rem;
		color: #374151;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		cursor: help;
	}

	.swatch-placeholder {
		display: block;
		width: 24px;
		height: 24px;
	}

	.control-row input[type='color'] {
		width: 24px;
		height: 24px;
		padding: 0;
		border: 1px solid #d1d5db;
		border-radius: 3px;
		cursor: pointer;
		background: transparent;
	}

	.control-row input[type='text'] {
		width: 100%;
		padding: 0.2rem 0.4rem;
		border: 1px solid #d1d5db;
		border-radius: 3px;
		font-family: inherit;
		font-size: 0.78rem;
	}

	.btn-clear {
		width: 22px;
		height: 22px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: transparent;
		border: 1px solid transparent;
		border-radius: 3px;
		cursor: pointer;
		color: #9ca3af;
		font-size: 0.75rem;
		padding: 0;
	}

	.btn-clear:hover:not(:disabled) {
		background: #fef2f2;
		color: #ef4444;
		border-color: #fecaca;
	}

	.btn-clear:disabled {
		cursor: default;
		opacity: 0.25;
	}
</style>
