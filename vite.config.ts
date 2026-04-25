import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import pkg from './package.json' with { type: 'json' };

export default defineConfig({
	plugins: [sveltekit()],
	define: {
		__VERSION__: JSON.stringify(pkg.version),
		__PACKAGE_NAME__: JSON.stringify(pkg.name),
		__AUTHOR__: JSON.stringify(
			typeof pkg.author === 'string'
				? pkg.author
				: ((pkg.author as { name?: string } | undefined)?.name ?? '')
		),
		__LICENSE__: JSON.stringify(pkg.license || ''),
		__HOMEPAGE__: JSON.stringify(pkg.homepage || ''),
		__REPOSITORY__: JSON.stringify(pkg.repository?.url || '')
	}
});
