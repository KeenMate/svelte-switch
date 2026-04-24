<script lang="ts">
	interface Props {
		title: string;
		subtitle?: string;
	}

	let { title, subtitle }: Props = $props();
</script>

<header class="example-header">
	<a href="/" class="back-link">&larr; Back to Examples</a>
	<h1>{title}</h1>
	{#if subtitle}
		<p class="subtitle">{subtitle}</p>
	{/if}
</header>
