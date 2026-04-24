<script lang="ts">
	type Orientation = 'horizontal' | 'vertical';

	interface StepStyle {
		backgroundColor?: string;
		thumbColor?: string;
		thumbBorderColor?: string;
	}

	interface Props {
		checked?: boolean;
		isDisabled?: boolean;
		orientation?: Orientation;
		size?: number;
		items?: any[] | null;
		itemStyles?: StepStyle[] | StepStyle;
		onToggle?: (checked: boolean) => void;
		children?: import('svelte').Snippet<[{ currentIndex: number; item: any; isSelected: boolean }]>;
		thumbTemplate?: import('svelte').Snippet<
			[{ currentIndex: number; currentItem: any; itemsCount: number }]
		>;
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

	// Helper function to get style for a specific index
	const getStyleForIndex = (index: number): StepStyle => {
		if (Array.isArray(itemStyles)) {
			return itemStyles[index] || {};
		} else if (itemStyles && typeof itemStyles === 'object') {
			return itemStyles;
		}
		return {};
	};

	const isVertical = $derived(orientation === 'vertical');

	// Calculate scale factor based on default size (50px)
	const scale = $derived(size / 50);

	// Validate items array - must be exactly 2 items if provided
	$effect(() => {
		if (items !== null && items.length !== 2) {
			console.warn('Switch component: items array must contain exactly 2 items');
		}
	});

	// Derived values for snippets
	const currentIndex = $derived(checked ? 1 : 0);
	const currentItem = $derived(items ? items[currentIndex] : undefined);
	const itemsCount = $derived(items ? items.length : 2);
	const isSelected = $derived(checked);
	let currentStepContext = $derived({ currentIndex, currentItem, itemsCount });

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
	style:--current-bg-color={getStyleForIndex(currentIndex).backgroundColor || ''}
	style:--current-thumb-color={getStyleForIndex(currentIndex).thumbColor || ''}
	style:--current-thumb-border-color={getStyleForIndex(currentIndex).thumbBorderColor || ''}
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
