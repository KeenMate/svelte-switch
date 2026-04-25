<script lang="ts">
	import type { Snippet } from 'svelte';
	import { getStyleForIndex, itemAt, type ItemStyles } from './utils.js';

	type Orientation = 'horizontal' | 'vertical';

	interface Props {
		checked?: boolean;
		isDisabled?: boolean;
		orientation?: Orientation;
		size?: number;
		items?: readonly [unknown, unknown] | null;
		itemStyles?: ItemStyles;
		onToggle?: (checked: boolean) => void;
		children?: Snippet<[{ currentIndex: number; item: unknown; isSelected: boolean }]>;
		thumbTemplate?: Snippet<[{ currentIndex: number; currentItem: unknown; itemsCount: number }]>;
		disableThumbRender?: boolean;
	}

	let {
		checked = $bindable(false),
		isDisabled = false,
		orientation = 'horizontal',
		size = 50,
		items = null,
		itemStyles = [],
		onToggle,
		children,
		thumbTemplate,
		disableThumbRender = false
	}: Props = $props();

	const isVertical = $derived(orientation === 'vertical');

	const scale = $derived(size / 50);

	const currentIndex = $derived(checked ? 1 : 0);
	const currentItem = $derived(itemAt(items, currentIndex));
	const isSelected = $derived(checked);
	let currentStepContext = $derived({ currentIndex, currentItem, itemsCount: 2 });

	function toggle() {
		if (isDisabled) return;
		checked = !checked;
		onToggle?.(checked);
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === ' ' || event.key === 'Enter') {
			event.preventDefault();
			toggle();
		}
	}

	// External update method for HTML/JavaScript usage
	export function update(
		updates: Partial<
			Pick<
				Props,
				| 'checked'
				| 'isDisabled'
				| 'orientation'
				| 'size'
				| 'items'
				| 'itemStyles'
				| 'onToggle'
				| 'disableThumbRender'
			>
		>
	) {
		if (updates.checked !== undefined) checked = updates.checked;
		if (updates.isDisabled !== undefined) isDisabled = updates.isDisabled;
		if (updates.orientation !== undefined) orientation = updates.orientation;
		if (updates.size !== undefined) size = updates.size;
		if (updates.items !== undefined) items = updates.items;
		if (updates.itemStyles !== undefined) itemStyles = updates.itemStyles;
		if (updates.onToggle !== undefined) onToggle = updates.onToggle;
		if (updates.disableThumbRender !== undefined) disableThumbRender = updates.disableThumbRender;
	}
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="switch"
	class:checked
	class:disabled={isDisabled}
	class:vertical={isVertical}
	style:--scale={scale}
	style:--current-bg-color={getStyleForIndex(itemStyles, currentIndex).backgroundColor ?? null}
	style:--current-thumb-color={getStyleForIndex(itemStyles, currentIndex).thumbColor ?? null}
	style:--current-thumb-border-color={getStyleForIndex(itemStyles, currentIndex).thumbBorderColor ??
		null}
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
		{#if thumbTemplate}
			{@render thumbTemplate(currentStepContext)}
		{:else if children && !disableThumbRender}
			{@render children({ currentIndex, item: currentItem, isSelected })}
		{/if}
	</div>
</div>

<style lang="scss">
	@use './assets/main.scss' as *;
</style>
