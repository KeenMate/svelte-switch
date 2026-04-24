<script lang="ts">
	import { MultiSwitch } from '$lib';
	import ExampleHeader from '../ExampleHeader.svelte';

	const items = ['Small', 'Medium', 'Large', 'X-Large'];
	const positions = ['top', 'bottom', 'left', 'right'] as const;
	const modes = ['absolute', 'block'] as const;

	let controlIndex = $state(1);
	let controlPosition: (typeof positions)[number] = $state('bottom');
	let controlMode: (typeof modes)[number] = $state('absolute');
	let controlOrientation: 'horizontal' | 'vertical' = $state('horizontal');
</script>

<svelte:head>
	<title>Labels - Svelte Switch</title>
</svelte:head>

<div class="container">
	<ExampleHeader
		title="🏷️ Labels"
		subtitle="Label positions × render modes × orientations. Absolute overlaps borders; block takes space in the flow."
	/>

	<section class="card">
		<h2>Interactive</h2>
		<div
			class="demo-area"
			style="display: flex; justify-content: center; align-items: center; min-height: 260px;"
		>
			<MultiSwitch
				bind:selectedIndex={controlIndex}
				{items}
				size={60}
				orientation={controlOrientation}
				shouldDisplayLabels={true}
				labelPosition={controlPosition}
				labelRenderMode={controlMode}
			/>
		</div>
		<div class="controls">
			<label>
				Orientation
				<select bind:value={controlOrientation}>
					<option value="horizontal">Horizontal</option>
					<option value="vertical">Vertical</option>
				</select>
			</label>
			<label>
				Label Position
				<select bind:value={controlPosition}>
					{#each positions as p}
						<option value={p}>{p}</option>
					{/each}
				</select>
			</label>
			<label>
				Render Mode
				<select bind:value={controlMode}>
					{#each modes as m}
						<option value={m}>{m}</option>
					{/each}
				</select>
			</label>
		</div>
	</section>

	{#each ['horizontal', 'vertical'] as const as matrixOrientation}
		<section class="card">
			<h2 style="text-transform: capitalize;">{matrixOrientation} matrix</h2>
			<p class="description">Rows = label position, columns = render mode.</p>
			<div class="grid">
				{#each positions as pos}
					{#each modes as mode}
						<div class="example-section" style="margin: 0; padding: 1.25rem;">
							<p class="demo-label">
								<code>{pos}</code> / <code>{mode}</code>
							</p>
							<div
								class="demo-area"
								style="display: flex; justify-content: center; align-items: center; min-height: 160px;"
							>
								<MultiSwitch
									selectedIndex={1}
									{items}
									size={40}
									orientation={matrixOrientation}
									shouldDisplayLabels={true}
									labelPosition={pos}
									labelRenderMode={mode}
								/>
							</div>
						</div>
					{/each}
				{/each}
			</div>
		</section>
	{/each}
</div>
