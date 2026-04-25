<script lang="ts">
	// Trigger the lib's side-effect imports (window.components registration)
	// even on routes that don't directly render Switch / MultiSwitch.
	import '$lib';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="stylesheet" href="/examples-shared.css" />
</svelte:head>

{@render children?.()}
