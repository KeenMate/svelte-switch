<script lang="ts" generics="T">
	import type { Snippet } from 'svelte';
	import { getStyleForIndex, itemAt, type ItemStyles } from './utils.js';
	import { registerInstance, unregisterInstance } from './instances.js';
	import { initLogger, interactionLogger } from './logger.js';

	type Orientation = 'horizontal' | 'vertical';
	type SizeName = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

	interface Props {
		checked?: boolean;
		isDisabled?: boolean;
		orientation?: Orientation;
		// Named size aligns with pure-admin's form-element heights
		// (xs=31px, sm=33px, md=35px, lg=38px, xl=41px). Numeric size keeps the
		// legacy "size in pixels — scaled from natural 32px height via size/50"
		// behavior for explicit non-form sizing.
		size?: SizeName | number;
		items?: readonly [T, T] | null;
		itemStyles?: ItemStyles;
		onToggle?: (checked: boolean) => void;
		thumb?: Snippet<[{ index: number; item: T | undefined; isSelected: boolean }]>;
	}

	let {
		checked = $bindable(false),
		isDisabled = false,
		orientation = 'horizontal',
		size = 'md',
		items = null,
		itemStyles = [],
		onToggle,
		thumb
	}: Props = $props();

	const isVertical = $derived(orientation === 'vertical');

	// Named sizes apply a .size-{name} class which sets --scale via CSS chain
	// through --base-input-size-{name}-height. Numeric sizes set --scale inline
	// directly (no class).
	const sizeClass = $derived(typeof size === 'string' ? `size-${size}` : '');
	const numericScale = $derived(typeof size === 'number' ? size / 50 : null);

	const index = $derived(checked ? 1 : 0);
	const item = $derived(itemAt(items, index));

	let rootEl: HTMLElement | undefined = $state();

	$effect(() => {
		if (!rootEl) return;
		initLogger.debug('Switch mounted', { size, orientation, checked });
		registerInstance(rootEl);
		return () => {
			initLogger.debug('Switch destroyed');
			unregisterInstance(rootEl!);
		};
	});

	function toggle() {
		if (isDisabled) return;
		checked = !checked;
		interactionLogger.debug('Switch toggle', { checked });
		onToggle?.(checked);
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === ' ' || event.key === 'Enter') {
			event.preventDefault();
			toggle();
		}
	}
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	bind:this={rootEl}
	class="switch {sizeClass}"
	class:checked
	class:disabled={isDisabled}
	class:vertical={isVertical}
	style:--scale={numericScale}
	style:--current-bg-color={getStyleForIndex(itemStyles, index).backgroundColor ?? null}
	style:--current-thumb-color={getStyleForIndex(itemStyles, index).thumbColor ?? null}
	style:--current-thumb-border-color={getStyleForIndex(itemStyles, index).thumbBorderColor ?? null}
	onclick={toggle}
	onkeydown={handleKeydown}
	role="switch"
	aria-checked={checked}
	aria-disabled={isDisabled}
	tabindex={isDisabled ? -1 : 0}
>
	<div
		class="thumb"
		style:transform={isVertical
			? `translateY(${checked ? 'calc(var(--thumb-offset) * var(--scale))' : '0px'}) translateX(-50%)`
			: `translateX(${checked ? 'calc(var(--thumb-offset) * var(--scale))' : '0px'})`}
	>
		{#if thumb}
			{@render thumb({ index, item, isSelected: checked })}
		{/if}
	</div>
</div>

<style lang="scss">
	@use './assets/switch' as *;
</style>
