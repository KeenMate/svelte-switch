<script lang="ts">
	const pages = [
		{
			href: '/dev/binary',
			icon: '🔘',
			title: 'Binary Switch',
			description: 'Switch component with size, orientation, and disabled controls.'
		},
		{
			href: '/dev/multi',
			icon: '🎚️',
			title: 'Multi Switch',
			description: 'MultiSwitch variants: step counts, orientation, disabled, keyboard.'
		},
		{
			href: '/dev/labels',
			icon: '🏷️',
			title: 'Labels',
			description: 'Label positions × render modes × orientations (absolute vs block).'
		},
		{
			href: '/dev/styled',
			icon: '🎨',
			title: 'Item Styles',
			description: 'Per-index itemStyles (array) vs shared itemStyles (object).'
		}
	];
</script>

<div class="container py-4">
	<h1>🛠️ Dev Index</h1>
	<p class="text-muted">Test pages for Switch / MultiSwitch scenarios during development.</p>

	<div class="row g-3 mt-2">
		{#each pages as page}
			<div class="col-md-6 col-lg-4">
				<a href={page.href} class="card h-100 text-decoration-none text-dark">
					<div class="card-body">
						<div class="fs-3 mb-2">{page.icon}</div>
						<h5 class="card-title">{page.title}</h5>
						<p class="card-text text-muted">{page.description}</p>
					</div>
				</a>
			</div>
		{/each}
	</div>
</div>
