<script lang="ts" generics="T">
	import type { Snippet } from 'svelte';
	import { getStyleForIndex, itemAt, resolveLabelText, type ItemStyles } from './utils.js';

	type Orientation = 'horizontal' | 'vertical';
	type LabelPosition = 'left' | 'right' | 'top' | 'bottom';
	type LabelRenderMode = 'absolute' | 'block';

	interface Props {
		selectedIndex?: number;
		isDisabled?: boolean;
		orientation?: Orientation;
		size?: number;
		itemsCount?: number;
		items?: readonly T[] | null;
		itemStyles?: ItemStyles;
		shouldDisplayLabels?: boolean;
		labelPosition?: LabelPosition;
		labelRenderMode?: LabelRenderMode;
		labelMember?: string;
		labelCallback?: (item: T | undefined, index: number) => string;
		onItemChange?: (index: number) => void;
		thumb?: Snippet<[{ index: number; item: T | undefined }]>;
		segment?: Snippet<[{ index: number; item: T | undefined; isSelected: boolean }]>;
		label?: Snippet<[{ index: number; item: T | undefined; isSelected: boolean }]>;
	}

	let {
		selectedIndex = $bindable(0),
		isDisabled = false,
		orientation = 'horizontal',
		size = 50,
		itemsCount = 3,
		items = null,
		itemStyles = [],
		shouldDisplayLabels = false,
		labelPosition = 'bottom',
		labelRenderMode = 'absolute',
		labelMember,
		labelCallback,
		onItemChange,
		thumb,
		segment,
		label
	}: Props = $props();

	const getLabelText = (index: number): string =>
		resolveLabelText(items, labelMember, labelCallback as never, index);

	const isVertical = $derived(orientation === 'vertical');
	const scale = $derived(size / 50);

	// When `items` is provided, its length is authoritative and `itemsCount` is ignored.
	// Falls through to `itemsCount` only when `items` is null/empty.
	const effectiveStepsCount: number = $derived(
		items && items.length > 0 ? items.length : itemsCount
	);

	const currentItem = $derived(itemAt(items, selectedIndex));

	// Per-step labels are stacked (one per step) only when the switch is vertical
	// and labels sit on its side. Every other position uses a single label tied to
	// the current selection.
	const showsPerStepLabels = $derived(
		isVertical && (labelPosition === 'left' || labelPosition === 'right')
	);
	// In block mode, top/left labels precede the switch in document flow; bottom/right
	// come after. Absolute mode doesn't care about DOM order — render once, after.
	const labelsGoBefore = $derived(
		labelRenderMode === 'block' && (labelPosition === 'top' || labelPosition === 'left')
	);

	// Must match values in src/lib/assets/main.scss ($thumb-height, $margin, $step-spacing).
	const THUMB_PX = 28;
	const MARGIN_PX = 2;
	const SPACING_PX = 2;

	// Map a pointer event on the switch container to a step index.
	// Accounts for outer margin and inter-step spacing — a naive `pos * N` misplaces
	// clicks near segment boundaries at small sizes / high step counts.
	function hitTestStep(e: MouseEvent): number {
		const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
		const localPos = isVertical ? e.clientY - rect.top : e.clientX - rect.left;
		const stepStride = (THUMB_PX + SPACING_PX) * scale;
		const rawStep = Math.floor((localPos - MARGIN_PX * scale) / stepStride);
		return Math.max(0, Math.min(effectiveStepsCount - 1, rawStep));
	}

	function selectStep(index: number) {
		if (isDisabled) return;
		selectedIndex = index;
		onItemChange?.(index);
	}

	function handleKeydown(event: KeyboardEvent) {
		if (isDisabled) return;

		if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
			event.preventDefault();
			selectedIndex = Math.max(0, selectedIndex - 1);
			onItemChange?.(selectedIndex);
		} else if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
			event.preventDefault();
			selectedIndex = Math.min(effectiveStepsCount - 1, selectedIndex + 1);
			onItemChange?.(selectedIndex);
		}
	}
</script>

{#snippet labelContent(index: number, isSelected: boolean)}
	{#if label}
		{@render label({ index, item: itemAt(items, index), isSelected })}
	{:else}
		<span class="default-label" class:active={isSelected}>
			{getLabelText(index)}
		</span>
	{/if}
{/snippet}

{#snippet singleLabel()}
	<div
		class="label-single"
		class:label-position-top={labelPosition === 'top'}
		class:label-position-bottom={labelPosition === 'bottom'}
		class:label-position-left={labelPosition === 'left'}
		class:label-position-right={labelPosition === 'right'}
		class:block-mode={labelRenderMode === 'block'}
	>
		{@render labelContent(selectedIndex, true)}
	</div>
{/snippet}

{#snippet perStepLabels()}
	<div
		class="labels-container"
		class:label-position-left={labelPosition === 'left'}
		class:label-position-right={labelPosition === 'right'}
		class:label-position-top={labelPosition === 'top'}
		class:label-position-bottom={labelPosition === 'bottom'}
		class:block-mode={labelRenderMode === 'block'}
	>
		{#each Array(effectiveStepsCount) as _, index}
			{@const isSelected = index === selectedIndex}
			{#if !thumb}
				<button
					type="button"
					class="label clickable"
					class:active={isSelected}
					style:--label-index={index}
					disabled={isDisabled}
					onclick={() => selectStep(index)}
				>
					{@render labelContent(index, isSelected)}
				</button>
			{:else}
				<div class="label" class:active={isSelected} style:--label-index={index}>
					{@render labelContent(index, isSelected)}
				</div>
			{/if}
		{/each}
	</div>
{/snippet}

{#snippet labels()}
	{#if showsPerStepLabels}
		{@render perStepLabels()}
	{:else}
		{@render singleLabel()}
	{/if}
{/snippet}

<div
	class="multi-switch-container"
	class:block-labels={labelRenderMode === 'block' && shouldDisplayLabels}
	style:--scale={scale}
	style:--steps={effectiveStepsCount}
>
	{#if shouldDisplayLabels && labelsGoBefore}
		{@render labels()}
	{/if}

	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="multi-switch"
		class:disabled={isDisabled}
		class:vertical={isVertical}
		class:block-labels={labelRenderMode === 'block' && shouldDisplayLabels}
		style:--current-bg-color={getStyleForIndex(itemStyles, selectedIndex).backgroundColor ?? null}
		style:--current-thumb-color={getStyleForIndex(itemStyles, selectedIndex).thumbColor ?? null}
		style:--current-thumb-border-color={getStyleForIndex(itemStyles, selectedIndex)
			.thumbBorderColor ?? null}
		onclick={(e) => {
			if (isDisabled) return;
			selectStep(hitTestStep(e));
		}}
		onkeydown={handleKeydown}
		role="slider"
		aria-valuemin={0}
		aria-valuemax={effectiveStepsCount - 1}
		aria-valuenow={selectedIndex}
		aria-disabled={isDisabled}
		tabindex={isDisabled ? -1 : 0}
	>
		<div
			class="thumb"
			style:transform={isVertical
				? `translateY(calc(var(--step-offset) * ${selectedIndex})) translateX(-50%)`
				: `translateX(calc(var(--step-offset) * ${selectedIndex}))`}
		>
			{#if thumb}
				{@render thumb({ index: selectedIndex, item: currentItem })}
			{/if}
		</div>

		{#each Array(effectiveStepsCount) as _, index}
			<div
				class="step-segment"
				class:active={index === selectedIndex}
				style:--step-index={index}
				style:--step-bg-color={getStyleForIndex(itemStyles, index).backgroundColor ?? null}
				style:--step-border-color={getStyleForIndex(itemStyles, index).thumbBorderColor ?? null}
			>
				{#if segment}
					{@render segment({
						index,
						item: itemAt(items, index),
						isSelected: index === selectedIndex
					})}
				{/if}
			</div>
		{/each}
	</div>

	{#if shouldDisplayLabels && !labelsGoBefore}
		{@render labels()}
	{/if}
</div>

<style lang="scss">
	@use './assets/main.scss' as *;
</style>
