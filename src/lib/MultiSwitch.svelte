<script lang="ts">
	type Orientation = 'horizontal' | 'vertical';
	type LabelPosition = 'left' | 'right' | 'top' | 'bottom';
	type LabelRenderMode = 'absolute' | 'block';

	interface StepStyle {
		backgroundColor?: string;
		thumbColor?: string;
		thumbBorderColor?: string;
	}

	interface Props {
		selectedIndex?: number;
		isDisabled?: boolean;
		orientation?: Orientation;
		size?: number;
		itemsCount?: number;
		items?: any[] | null;
		itemStyles?: StepStyle[] | StepStyle;
		shouldDisplayLabels?: boolean;
		labelPosition?: LabelPosition;
		labelRenderMode?: LabelRenderMode;
		labelMember?: string;
		labelCallback?: (item: any, index: number) => string;
		onItemChange?: (index: number) => void;
		children?: import('svelte').Snippet<[{ currentIndex: number; item: any; isSelected: boolean }]>;
		thumbTemplate?: import('svelte').Snippet<
			[{ currentIndex: number; currentItem: any; itemsCount: number }]
		>;
		labelTemplate?: import('svelte').Snippet<
			[{ currentIndex: number; item: any; isSelected: boolean }]
		>;
		disableThumbRender?: boolean;
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
		children,
		thumbTemplate,
		labelTemplate,
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

	// Helper function to get label text for a specific index
	const getLabelText = (index: number): string => {
		const item = items ? items[index] : undefined;

		// Priority: 1) labelMember, 2) labelCallback, 3) default
		if (labelMember && item && item[labelMember] != null) {
			return item[labelMember];
		}
		if (labelCallback) {
			return labelCallback(item, index);
		}
		return `Option ${index + 1}`;
	};

	const isVertical = $derived(orientation === 'vertical');

	const scale = $derived(size / 50);

	// When `items` is provided, its length is authoritative and `itemsCount` is ignored.
	// Falls through to `itemsCount` only when `items` is null/empty.
	const effectiveStepsCount: number = $derived(
		items && items.length > 0 ? items.length : itemsCount
	);

	const currentIndex = $derived(selectedIndex);
	const currentItem = $derived(items ? items[selectedIndex] : undefined);
	let currentStepContext = $derived({
		currentIndex,
		currentItem,
		itemsCount: effectiveStepsCount
	});

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

	// External update method for HTML/JavaScript usage
	export function update(
		updates: Partial<
			Pick<
				Props,
				| 'selectedIndex'
				| 'isDisabled'
				| 'orientation'
				| 'size'
				| 'itemsCount'
				| 'itemStyles'
				| 'items'
				| 'shouldDisplayLabels'
				| 'labelPosition'
				| 'labelRenderMode'
				| 'labelMember'
				| 'labelCallback'
				| 'onItemChange'
				| 'disableThumbRender'
			>
		>
	) {
		if (updates.selectedIndex !== undefined) selectedIndex = updates.selectedIndex;
		if (updates.isDisabled !== undefined) isDisabled = updates.isDisabled;
		if (updates.orientation !== undefined) orientation = updates.orientation;
		if (updates.size !== undefined) size = updates.size;
		if (updates.itemsCount !== undefined) itemsCount = updates.itemsCount;
		if (updates.itemStyles !== undefined) itemStyles = updates.itemStyles;
		if (updates.items !== undefined) items = updates.items;
		if (updates.shouldDisplayLabels !== undefined)
			shouldDisplayLabels = updates.shouldDisplayLabels;
		if (updates.labelPosition !== undefined) labelPosition = updates.labelPosition;
		if (updates.labelRenderMode !== undefined) labelRenderMode = updates.labelRenderMode;
		if (updates.labelMember !== undefined) labelMember = updates.labelMember;
		if (updates.labelCallback !== undefined) labelCallback = updates.labelCallback;
		if (updates.onItemChange !== undefined) onItemChange = updates.onItemChange;
		if (updates.disableThumbRender !== undefined) disableThumbRender = updates.disableThumbRender;
	}
</script>

<!-- Container div for block mode -->
<div
	class="multi-switch-container"
	class:block-labels={labelRenderMode === 'block' && shouldDisplayLabels}
	style:--scale={scale}
	style:--steps={effectiveStepsCount}
>
	<!-- Labels BEFORE switch (for top/left positions) -->
	{#if shouldDisplayLabels && labelRenderMode === 'block'}
		<!-- Vertical switch left labels -->
		{#if isVertical && labelPosition === 'left'}
			<div class="labels-container" class:label-position-left={true} class:block-mode={true}>
				{#each Array(effectiveStepsCount) as _, index}
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<div
						class="label"
						class:active={index === selectedIndex}
						class:clickable={!thumbTemplate}
						style:--label-index={index}
						onclick={() => {
							if (!isDisabled && !thumbTemplate) {
								selectStep(index);
							}
						}}
					>
						{#if labelTemplate}
							{@render labelTemplate({
								currentIndex: index,
								item: items ? items[index] : undefined,
								isSelected: index === selectedIndex
							})}
						{:else}
							<span class="default-label" class:active={index === selectedIndex}>
								{getLabelText(index)}
							</span>
						{/if}
					</div>
				{/each}
			</div>
		{/if}

		<!-- Horizontal switch top/left labels -->
		{#if !isVertical && (labelPosition === 'top' || labelPosition === 'left')}
			<div
				class="label-single"
				class:label-position-top={labelPosition === 'top'}
				class:label-position-left={labelPosition === 'left'}
				class:block-mode={true}
			>
				{#if labelTemplate}
					{@render labelTemplate({
						currentIndex: selectedIndex,
						item: items ? items[selectedIndex] : undefined,
						isSelected: true
					})}
				{:else}
					<span class="default-label active">
						{getLabelText(selectedIndex)}
					</span>
				{/if}
			</div>
		{/if}

		<!-- Vertical switch top labels -->
		{#if isVertical && labelPosition === 'top'}
			<div class="label-single" class:label-position-top={true} class:block-mode={true}>
				{#if labelTemplate}
					{@render labelTemplate({
						currentIndex: selectedIndex,
						item: items ? items[selectedIndex] : undefined,
						isSelected: true
					})}
				{:else}
					<span class="default-label active">
						{getLabelText(selectedIndex)}
					</span>
				{/if}
			</div>
		{/if}
	{/if}

	<!-- THE SWITCH -->
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="multi-switch"
		class:disabled={isDisabled}
		class:vertical={isVertical}
		class:block-labels={labelRenderMode === 'block' && shouldDisplayLabels}
		style:--current-bg-color={getStyleForIndex(selectedIndex).backgroundColor || ''}
		style:--current-thumb-color={getStyleForIndex(selectedIndex).thumbColor || ''}
		style:--current-thumb-border-color={getStyleForIndex(selectedIndex).thumbBorderColor || ''}
		onclick={(e) => {
			if (isDisabled) return;
			selectStep(hitTestStep(e));
		}}
		onkeydown={handleKeydown}
		role="slider"
		aria-valuemin="0"
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
			{#if thumbTemplate}
				{@render thumbTemplate(currentStepContext)}
			{:else if children && !disableThumbRender}
				{@render children({ currentIndex, item: currentItem, isSelected: true })}
			{/if}
		</div>

		<!-- Step indicators/background segments -->
		{#each Array(effectiveStepsCount) as _, index}
			<div
				class="step-segment"
				class:active={index === selectedIndex}
				style:--step-index={index}
				style:--step-bg-color={getStyleForIndex(index).backgroundColor || ''}
				style:--step-border-color={getStyleForIndex(index).thumbBorderColor || ''}
			>
				{@render children?.({
					currentIndex: index,
					item: items && items[index],
					isSelected: false
				})}
			</div>
		{/each}
	</div>

	<!-- Labels AFTER switch (for bottom/right positions OR absolute mode) -->
	{#if shouldDisplayLabels}
		<!-- Absolute mode labels (all positions) -->
		{#if labelRenderMode === 'absolute'}
			<!-- Vertical switch labels -->
			{#if isVertical && (labelPosition === 'left' || labelPosition === 'right')}
				<div
					class="labels-container"
					class:label-position-left={labelPosition === 'left'}
					class:label-position-right={labelPosition === 'right'}
					class:block-mode={false}
				>
					{#each Array(effectiveStepsCount) as _, index}
						<!-- svelte-ignore a11y_click_events_have_key_events -->
						<!-- svelte-ignore a11y_no_static_element_interactions -->
						<div
							class="label"
							class:active={index === selectedIndex}
							class:clickable={!thumbTemplate}
							style:--label-index={index}
							onclick={() => {
								if (!isDisabled && !thumbTemplate) {
									selectStep(index);
								}
							}}
						>
							{#if labelTemplate}
								{@render labelTemplate({
									currentIndex: index,
									item: items ? items[index] : undefined,
									isSelected: index === selectedIndex
								})}
							{:else}
								<span class="default-label" class:active={index === selectedIndex}>
									{getLabelText(index)}
								</span>
							{/if}
						</div>
					{/each}
				</div>
			{/if}

			<!-- Vertical switch top/bottom labels (single label) -->
			{#if isVertical && (labelPosition === 'top' || labelPosition === 'bottom')}
				<div
					class="label-single"
					class:label-position-top={labelPosition === 'top'}
					class:label-position-bottom={labelPosition === 'bottom'}
					class:block-mode={false}
				>
					{#if labelTemplate}
						{@render labelTemplate({
							currentIndex: selectedIndex,
							item: items ? items[selectedIndex] : undefined,
							isSelected: true
						})}
					{:else}
						<span class="default-label active">
							{getLabelText(selectedIndex)}
						</span>
					{/if}
				</div>
			{/if}

			<!-- Horizontal switch labels -->
			{#if !isVertical}
				<div
					class="label-single"
					class:label-position-left={labelPosition === 'left'}
					class:label-position-right={labelPosition === 'right'}
					class:label-position-top={labelPosition === 'top'}
					class:label-position-bottom={labelPosition === 'bottom'}
					class:block-mode={false}
				>
					{#if labelTemplate}
						{@render labelTemplate({
							currentIndex: selectedIndex,
							item: items ? items[selectedIndex] : undefined,
							isSelected: true
						})}
					{:else}
						<span class="default-label active">
							{getLabelText(selectedIndex)}
						</span>
					{/if}
				</div>
			{/if}
		{:else}
			<!-- Block mode labels AFTER switch (for bottom/right positions) -->
			<!-- Vertical switch right labels -->
			{#if isVertical && labelPosition === 'right'}
				<div class="labels-container" class:label-position-right={true} class:block-mode={true}>
					{#each Array(effectiveStepsCount) as _, index}
						<!-- svelte-ignore a11y_click_events_have_key_events -->
						<!-- svelte-ignore a11y_no_static_element_interactions -->
						<div
							class="label"
							class:active={index === selectedIndex}
							class:clickable={!thumbTemplate}
							style:--label-index={index}
							onclick={() => {
								if (!isDisabled && !thumbTemplate) {
									selectStep(index);
								}
							}}
						>
							{#if labelTemplate}
								{@render labelTemplate({
									currentIndex: index,
									item: items ? items[index] : undefined,
									isSelected: index === selectedIndex
								})}
							{:else}
								<span class="default-label" class:active={index === selectedIndex}>
									{getLabelText(index)}
								</span>
							{/if}
						</div>
					{/each}
				</div>
			{/if}

			<!-- Horizontal switch bottom/right labels -->
			{#if !isVertical && (labelPosition === 'bottom' || labelPosition === 'right')}
				<div
					class="label-single"
					class:label-position-bottom={labelPosition === 'bottom'}
					class:label-position-right={labelPosition === 'right'}
					class:block-mode={true}
				>
					{#if labelTemplate}
						{@render labelTemplate({
							currentIndex: selectedIndex,
							item: items ? items[selectedIndex] : undefined,
							isSelected: true
						})}
					{:else}
						<span class="default-label active">
							{getLabelText(selectedIndex)}
						</span>
					{/if}
				</div>
			{/if}

			<!-- Vertical switch bottom labels -->
			{#if isVertical && labelPosition === 'bottom'}
				<div class="label-single" class:label-position-bottom={true} class:block-mode={true}>
					{#if labelTemplate}
						{@render labelTemplate({
							currentIndex: selectedIndex,
							item: items ? items[selectedIndex] : undefined,
							isSelected: true
						})}
					{:else}
						<span class="default-label active">
							{getLabelText(selectedIndex)}
						</span>
					{/if}
				</div>
			{/if}
		{/if}
	{/if}
</div>

<style lang="scss">
	@use './assets/main.scss' as *;
</style>
