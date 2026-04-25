<script lang="ts">
	import { onMount } from 'svelte';

	const examples = [
		{
			href: '/examples/binary',
			icon: '🔘',
			title: 'Binary Switch',
			description: 'Classic on/off toggle with size, orientation, and disabled controls.'
		},
		{
			href: '/examples/multi',
			icon: '🎚️',
			title: 'Multi Switch',
			description:
				'Multi-step switch with step count, orientation, disabled, and keyboard navigation.'
		},
		{
			href: '/examples/labels',
			icon: '🏷️',
			title: 'Labels',
			description:
				'Label positions × render modes × orientations — absolute (overlap) vs block (flow).'
		},
		{
			href: '/examples/styled',
			icon: '🎨',
			title: 'Item Styles',
			description: 'Per-index itemStyles (array) vs a single shared style (object).'
		},
		{
			href: '/examples/theming',
			icon: '🌈',
			title: 'Theming',
			description:
				'Customize via --base-* variables (cascade from a parent) or per-instance --sw-*.'
		}
	];

	onMount(() => {
		document.body.classList.add('landing-body');
		return () => {
			document.body.classList.remove('landing-body');
		};
	});
</script>

<svelte:head>
	<title>Svelte Switch Examples</title>
</svelte:head>

<div class="page-container">
	<header class="header-card">
		<h1>Svelte Switch</h1>
		<p class="subtitle">
			Customizable switch component for Svelte 5 — binary toggle and multi-step variants.
		</p>
		<span class="version-badge">v{__VERSION__}</span>
	</header>

	<div class="cards">
		{#each examples as example}
			<a href={example.href} class="card-link">
				<div class="card-icon">{example.icon}</div>
				<h2 class="card-title">{example.title}</h2>
				<p class="card-description">{example.description}</p>
			</a>
		{/each}
	</div>

	<footer>
		<p>
			Created by <a href="https://github.com/keenmate" target="_blank">KeenMate</a> |
			<a href="https://github.com/keenmate/svelte-switch" target="_blank">GitHub</a> |
			<a href="https://www.npmjs.com/package/@keenmate/svelte-switch" target="_blank">npm</a>
		</p>
	</footer>
</div>
