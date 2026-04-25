// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	const __VERSION__: string;
	const __PACKAGE_NAME__: string;
	const __AUTHOR__: string;
	const __LICENSE__: string;
	const __HOMEPAGE__: string;
	const __REPOSITORY__: string;
}

export {};
