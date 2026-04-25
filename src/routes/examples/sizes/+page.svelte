<script lang="ts">
	import { Switch, MultiSwitch } from '$lib';
	import ExampleHeader from '../ExampleHeader.svelte';

	const sizes = [
		{ name: 'xs' as const, height: '31px', coefficient: '3.1' },
		{ name: 'sm' as const, height: '33px', coefficient: '3.3' },
		{ name: 'md' as const, height: '35px', coefficient: '3.5', isDefault: true },
		{ name: 'lg' as const, height: '38px', coefficient: '3.8' },
		{ name: 'xl' as const, height: '41px', coefficient: '4.1' }
	];

	const states = $state(sizes.map(() => ({ checked: false, multi: 1 })));
</script>

<svelte:head>
	<title>Sizes - Svelte Switch</title>
</svelte:head>

<div class="container">
	<ExampleHeader
		title="📐 Sizes"
		subtitle="Named sizes (xs / sm / md / lg / xl) align switch heights with the pure-admin form-element table. Numeric size values still work for non-form sizing."
	/>

	<section class="card">
		<h2>Named sizes</h2>
		<p class="description">
			Each size resolves through <code>--base-input-size-{`{`}size{`}`}-height</code> ×
			<code>--sw-rem</code> (default 10px). Drop a switch in a pure-admin form-size context and it
			matches automatically; or pass <code>size="sm"</code> explicitly.
		</p>

		<table class="size-table">
			<thead>
				<tr>
					<th>Prop</th>
					<th>Coefficient</th>
					<th>Resolved height</th>
					<th>Switch</th>
					<th>MultiSwitch</th>
				</tr>
			</thead>
			<tbody>
				{#each sizes as s, i}
					<tr>
						<td>
							<code>size="{s.name}"</code>
							{#if s.isDefault}<span class="default-badge">default</span>{/if}
						</td>
						<td><code>{s.coefficient}</code></td>
						<td><code>{s.height}</code></td>
						<td>
							<Switch bind:checked={states[i].checked} size={s.name} />
						</td>
						<td>
							<MultiSwitch
								bind:selectedIndex={states[i].multi}
								items={['Lo', 'Md', 'Hi']}
								size={s.name}
							/>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</section>

	<section class="card">
		<h2>Numeric sizes (legacy / explicit)</h2>
		<p class="description">
			Pass a number to set the scale directly: <code>scale = size / 50</code>. Useful when you need
			a specific pixel size that doesn't match the form table.
		</p>

		<div class="numeric-grid">
			{#each [40, 60, 80, 100] as n}
				<div class="numeric-cell">
					<code>size={`{${n}}`}</code>
					<Switch checked={true} size={n} />
				</div>
			{/each}
		</div>
	</section>

	<section class="card">
		<h2>Pure-admin integration</h2>
		<p class="description">
			In a pure-admin app, set <code>--sw-rem: 1rem</code> on the root (where pure-admin sets
			<code>html {`{`} font-size: 10px {`}`}</code>) so switch sizes scale with the user's font-size
			preference, like the rest of the form chrome.
		</p>
		<div class="code-block">
			<pre>{`/* In your pure-admin app */
:root {
  --sw-rem: 1rem;  /* aligns with pure-admin's 10px font-size baseline */
}

/* Or override individual sizes */
:root {
  --base-input-size-md-height: 4.0;  /* 40px instead of 35px */
}`}</pre>
		</div>
	</section>
</div>

<style>
	.size-table {
		width: 100%;
		border-collapse: collapse;
	}

	.size-table th,
	.size-table td {
		padding: 0.75rem 1rem;
		text-align: left;
		border-bottom: 1px solid #e5e7eb;
	}

	.size-table th {
		background: #f7fafc;
		font-weight: 600;
		color: #4a5568;
	}

	.default-badge {
		display: inline-block;
		margin-left: 0.5rem;
		padding: 0.1rem 0.4rem;
		background: #ddd6fe;
		color: #5b21b6;
		font-size: 0.7rem;
		border-radius: 3px;
		font-weight: 600;
		text-transform: uppercase;
	}

	.numeric-grid {
		display: flex;
		gap: 2rem;
		align-items: center;
		flex-wrap: wrap;
	}

	.numeric-cell {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		align-items: center;
	}

	.numeric-cell code {
		font-size: 0.8rem;
	}
</style>
