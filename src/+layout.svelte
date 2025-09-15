<script lang="ts">
	import { page } from '$app/stores';

	let { children } = $props();

	// Navigation items
	const navItems = [
		{ href: '/', label: 'Home', icon: '🏠' },
		{ href: '/basic', label: 'Basic Switch', icon: '🔘' },
		{ href: '/multi-step', label: 'Multi-Step', icon: '🎚️' },
		{ href: '/custom-styling', label: 'Custom Styling', icon: '🎨' },
		{ href: '/sizes', label: 'Sizes & Orientations', icon: '📏' }
	];
</script>

<svelte:head>
	<title>Svelte Switch - {$page.route.id === '/' ? 'Modern Switch Components for Svelte 5' : navItems.find(item => item.href === $page.url.pathname)?.label || 'Demo'}</title>
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
	<meta name="description" content="A modern, customizable switch component library for Svelte 5 with binary and multi-step switches, custom styling, and full accessibility support.">
	<meta name="viewport" content="width=device-width, initial-scale=1">
</svelte:head>

<nav class="navbar navbar-expand-lg navbar-dark bg-primary">
	<div class="container-fluid">
		<a class="navbar-brand fw-bold" href="/">
			🔄 Svelte Switch
		</a>

		<button
			class="navbar-toggler"
			type="button"
			data-bs-toggle="collapse"
			data-bs-target="#navbarNav"
		>
			<span class="navbar-toggler-icon"></span>
		</button>

		<div class="collapse navbar-collapse" id="navbarNav">
			<ul class="navbar-nav me-auto">
				{#each navItems as item}
					<li class="nav-item">
						<a
							class="nav-link {$page.url.pathname === item.href ? 'active' : ''}"
							href={item.href}
						>
							{item.icon} {item.label}
						</a>
					</li>
				{/each}
			</ul>

			<ul class="navbar-nav">
				<li class="nav-item">
					<a class="nav-link" href="https://github.com/keenmate/svelte-switch" target="_blank">
						📦 GitHub
					</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="https://www.npmjs.com/package/@keenmate/svelte-switch" target="_blank">
						📥 NPM
					</a>
				</li>
			</ul>
		</div>
	</div>
</nav>

<main class="container-fluid py-4">
	{@render children?.()}
</main>

<footer class="bg-dark text-light py-4 mt-5">
	<div class="container">
		<div class="row">
			<div class="col-md-8">
				<h6>@keenmate/svelte-switch</h6>
				<p class="mb-2">A modern, customizable switch component for Svelte 5</p>
				<p class="small text-muted">Built with ❤️ using Svelte 5, TypeScript, and SCSS</p>
			</div>
			<div class="col-md-4 text-end">
				<h6>Links</h6>
				<div>
					<a href="https://github.com/keenmate/svelte-switch" class="text-light me-3">GitHub</a>
					<a href="https://www.npmjs.com/package/@keenmate/svelte-switch" class="text-light">NPM</a>
				</div>
			</div>
		</div>
	</div>
</footer>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
