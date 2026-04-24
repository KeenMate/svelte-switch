<script lang="ts">
	import { MultiSwitch } from '$lib';
	import DevHeader from '../DevHeader.svelte';

	const items = ['Small', 'Medium', 'Large', 'X-Large'];
	const positions = ['top', 'bottom', 'left', 'right'] as const;
	const modes = ['absolute', 'block'] as const;

	let controlIndex = $state(1);
	let controlPosition: (typeof positions)[number] = $state('bottom');
	let controlMode: (typeof modes)[number] = $state('absolute');
	let controlOrientation: 'horizontal' | 'vertical' = $state('horizontal');
</script>

<div class="container py-4">
	<DevHeader
		title="Labels"
		subtitle="Label positions × render modes × orientations. Absolute overlaps borders; block takes space in the flow."
	/>

	<div class="card mb-4">
		<div class="card-header">Interactive</div>
		<div class="card-body">
			<div class="d-flex justify-content-center align-items-center py-5" style="min-height: 260px;">
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
			<div class="row g-3">
				<div class="col-md-3">
					<label for="orientation" class="form-label">Orientation</label>
					<select id="orientation" class="form-select" bind:value={controlOrientation}>
						<option value="horizontal">Horizontal</option>
						<option value="vertical">Vertical</option>
					</select>
				</div>
				<div class="col-md-3">
					<label for="position" class="form-label">Label Position</label>
					<select id="position" class="form-select" bind:value={controlPosition}>
						{#each positions as p}
							<option value={p}>{p}</option>
						{/each}
					</select>
				</div>
				<div class="col-md-3">
					<label for="mode" class="form-label">Render Mode</label>
					<select id="mode" class="form-select" bind:value={controlMode}>
						{#each modes as m}
							<option value={m}>{m}</option>
						{/each}
					</select>
				</div>
			</div>
		</div>
	</div>

	<h4 class="mt-5 mb-3">Side-by-side matrix</h4>
	<p class="text-muted small">
		Rows = label position, columns = render mode. Switch variant at a fixed size for comparison.
	</p>

	<div class="row g-4">
		{#each ['horizontal', 'vertical'] as const as matrixOrientation}
			<div class="col-12">
				<h5 class="text-capitalize">{matrixOrientation}</h5>
				<div class="row g-3">
					{#each positions as pos}
						{#each modes as mode}
							<div class="col-md-6 col-lg-3">
								<div class="card h-100">
									<div class="card-body">
										<div class="small text-muted mb-3">
											<code>{pos}</code> / <code>{mode}</code>
										</div>
										<div
											class="d-flex justify-content-center align-items-center"
											style="min-height: 160px;"
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
								</div>
							</div>
						{/each}
					{/each}
				</div>
			</div>
		{/each}
	</div>
</div>
