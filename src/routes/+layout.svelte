<script lang="ts">
	let { children } = $props();
</script>

<svelte:head>
	<link rel="stylesheet" href="/examples-shared.css" />
</svelte:head>

{@render children?.()}
