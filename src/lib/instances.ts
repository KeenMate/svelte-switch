/**
 * Module-level registry of currently-mounted Switch / MultiSwitch root elements.
 *
 * Components push their root DOM element here on mount and remove it on destroy.
 * Exposed to consumers via `window.components['svelte-switch'].getInstances()`.
 *
 * Mirrors the `getAllInstances()` pattern used by sibling KeenMate web components
 * (web-multiselect, web-daterangepicker), even though the registration mechanism
 * differs — we use Svelte's lifecycle, they use the custom-element constructor.
 */

const instances = new Set<HTMLElement>();

export function registerInstance(el: HTMLElement) {
	instances.add(el);
}

export function unregisterInstance(el: HTMLElement) {
	instances.delete(el);
}

export function getAllInstances(): HTMLElement[] {
	return Array.from(instances);
}
