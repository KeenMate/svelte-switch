<script lang="ts">
	import { Switch } from '$lib';

	let horizontalChecked = $state(false);
	let verticalChecked = $state(true);
	let disabledChecked = $state(false);

	function onToggle(checked: boolean, type: string) {
		console.log(`${type} switch toggled:`, checked);
	}
</script>

<h1>Svelte Switch Component Demo</h1>

<div class="demo-container">
	<section>
		<h2>Horizontal Switch (Default)</h2>
		<div class="switch-demo">
			<Switch
				bind:checked={horizontalChecked}
				onToggle={(checked) => onToggle(checked, 'Horizontal')}
			/>
			<span>Status: {horizontalChecked ? 'ON' : 'OFF'}</span>
		</div>
	</section>

	<section>
		<h2>Vertical Switch</h2>
		<div class="switch-demo vertical">
			<Switch
				bind:checked={verticalChecked}
				direction="vertical"
				onToggle={(checked) => onToggle(checked, 'Vertical')}
			/>
			<span>Status: {verticalChecked ? 'ON' : 'OFF'}</span>
		</div>
	</section>

	<section>
		<h2>Different Sizes</h2>
		<div class="size-demo">
			<div class="size-item">
				<Switch size={30} />
				<span>Small (30px)</span>
			</div>
			<div class="size-item">
				<Switch size={50} checked />
				<span>Medium (50px)</span>
			</div>
			<div class="size-item">
				<Switch size={70} />
				<span>Large (70px)</span>
			</div>
		</div>
	</section>

	<section>
		<h2>Disabled State</h2>
		<div class="switch-demo">
			<Switch
				bind:checked={disabledChecked}
				disabled
			/>
			<span>Disabled Switch</span>
		</div>
	</section>

	<section>
		<h2>Custom Content (Slot)</h2>
		<div class="switch-demo">
			<Switch size={60}>
				{#snippet children({ checked })}
					<span class="thumb-content">
						{checked ? '✓' : '✗'}
					</span>
				{/snippet}
			</Switch>
			<span>Switch with Icons</span>
		</div>
		<div class="switch-demo">
			<Switch size={80}>
				{#snippet children({ checked })}
					<span class="thumb-content">
						{checked ? 'ON' : 'OFF'}
					</span>
				{/snippet}
			</Switch>
			<span>Switch with Text</span>
		</div>
	</section>

	<section>
		<h2>Vertical Different Sizes</h2>
		<div class="size-demo vertical-sizes">
			<div class="size-item">
				<Switch size={40} direction="vertical" />
				<span>Small Vertical</span>
			</div>
			<div class="size-item">
				<Switch size={60} direction="vertical" checked />
				<span>Medium Vertical</span>
			</div>
			<div class="size-item">
				<Switch size={80} direction="vertical" />
				<span>Large Vertical</span>
			</div>
		</div>
	</section>
</div>

<style lang="scss">
	// Sass variables for demo styling
	$max-width: 800px;
	$section-bg: #f8fafc;
	$section-border: #e2e8f0;
	$section-radius: 8px;
	$primary-text: #2d3748;
	$secondary-text: #4a5568;
	$muted-text: #718096;
	$font-stack: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

	.demo-container {
		max-width: $max-width;
		margin: 0 auto;
		padding: 2rem;
		font-family: $font-stack;
	}

	section {
		margin-bottom: 3rem;
		padding: 1.5rem;
		border: 1px solid $section-border;
		border-radius: $section-radius;
		background-color: $section-bg;
	}

	h1 {
		text-align: center;
		color: $primary-text;
		margin-bottom: 2rem;
	}

	h2 {
		color: $secondary-text;
		margin-bottom: 1rem;
		font-size: 1.25rem;
	}

	.switch-demo {
		display: flex;
		align-items: center;
		gap: 1rem;

		&.vertical {
			flex-direction: column;
			align-items: center;
			gap: 1rem;
		}
	}

	.size-demo {
		display: flex;
		gap: 2rem;
		flex-wrap: wrap;
		align-items: center;

		&.vertical-sizes {
			align-items: flex-start;
		}
	}

	.size-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
	}

	.vertical-sizes .size-item {
		flex-direction: row;
		align-items: center;
		gap: 1rem;
	}

	span {
		font-size: 0.875rem;
		color: $muted-text;
		font-weight: 500;
	}

	:global(.thumb-content) {
		font-size: 0.75rem;
		font-weight: 600;
		color: #666;
		line-height: 1;
		user-select: none;
		pointer-events: none;
	}
</style>
