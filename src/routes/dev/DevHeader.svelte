<script lang="ts">
	interface Props {
		title: string;
		subtitle?: string;
	}

	let { title, subtitle }: Props = $props();
</script>

<header class="dev-header mb-4">
	<a href="/dev" class="back-link text-muted small">&larr; Back to Dev Index</a>
	<h1 class="mt-2">{title}</h1>
	{#if subtitle}
		<p class="text-muted">{subtitle}</p>
	{/if}
</header>

<style>
	.back-link {
		text-decoration: none;
	}
	.back-link:hover {
		text-decoration: underline;
	}
</style>
