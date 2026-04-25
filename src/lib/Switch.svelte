<script lang="ts" generics="T">
	import type { Snippet } from 'svelte';
	import { getStyleForIndex, itemAt, type ItemStyles } from './utils.js';
	import { registerInstance, unregisterInstance } from './instances.js';
	import { initLogger, interactionLogger } from './logger.js';

	type Orientation = 'horizontal' | 'vertical';

	interface Props {
		checked?: boolean;
		isDisabled?: boolean;
		orientation?: Orientation;
		size?: number;
		items?: readonly [T, T] | null;
		itemStyles?: ItemStyles;
		onToggle?: (checked: boolean) => void;
		thumb?: Snippet<[{ index: number; item: T | undefined; isSelected: boolean }]>;
	}

	let {
		checked = $bindable(false),
		isDisabled = false,
		orientation = 'horizontal',
		size = 50,
		items = null,
		itemStyles = [],
		onToggle,
		thumb
	}: Props = $props();

	const isVertical = $derived(orientation === 'vertical');
	const scale = $derived(size / 50);

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
	class="switch"
	class:checked
	class:disabled={isDisabled}
	class:vertical={isVertical}
	style:--scale={scale}
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
