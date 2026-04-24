<script lang="ts">
	import { page } from '$app/state';

	let { children } = $props();

	const navItems = [
		{ href: '/', label: 'Home', icon: '🏠' },
		{ href: '/dev', label: 'Development', icon: '🛠️' }
	];
</script>

<svelte:head>
	<title>Svelte Switch - {page.route.id === '/' ? 'Modern Switch Components for Svelte 5' : navItems.find(item => item.href === page.url.pathname)?.label || 'Demo'}</title>
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
	<meta name="description" content="A modern, customizable switch component library for Svelte 5 with binary and multi-step switches, custom styling, and full accessibility support.">
	<meta name="viewport" content="width=device-width, initial-scale=1">
</svelte:head>

<div class="d-flex vh-100">
	<!-- Sidebar -->
	<nav class="bg-dark text-white p-0" style="width: 250px;">
		<div class="p-3 border-bottom border-secondary">
			<h5 class="mb-0">🔄 Svelte Switch</h5>
			<small class="text-muted">Development Library</small>
		</div>

		<div class="nav nav-pills flex-column p-3">
			{#each navItems as item}
				<a
					href={item.href}
					class="nav-link text-white mb-2 {page.url.pathname === item.href ? 'active bg-primary' : ''}"
					style="border-radius: 0.5rem;"
				>
					<span class="me-2">{item.icon}</span>
					{item.label}
				</a>
			{/each}
		</div>

		<div class="p-3 border-top border-secondary mt-auto">
			<div class="d-flex flex-column gap-2">
				<a href="https://github.com/keenmate/svelte-switch" target="_blank" class="btn btn-outline-light btn-sm">
					📦 GitHub
				</a>
				<a href="https://www.npmjs.com/package/@keenmate/svelte-switch" target="_blank" class="btn btn-outline-light btn-sm">
					📥 NPM
				</a>
			</div>
		</div>
	</nav>

	<!-- Main content -->
	<main class="flex-fill overflow-auto">
		<div class="container-fluid p-4">
			{@render children?.()}
		</div>
	</main>
</div>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
	}

	nav .nav-link {
		transition: all 0.2s ease;
	}

	nav .nav-link:hover:not(.active) {
		background-color: rgba(255, 255, 255, 0.1) !important;
	}
</style>