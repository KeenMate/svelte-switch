<script lang="ts">
  type Orientation = "horizontal" | "vertical";

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
    onStepChange?: (index: number) => void;
    children?: import("svelte").Snippet<
      [{ currentIndex: number; item: any; isSelected: boolean }]
    >;
  }

  let {
    selectedIndex = $bindable(0),
    isDisabled = false,
    orientation = "horizontal",
    size = 50,
    itemsCount = 3,
    items = null,
    itemStyles = [],
    onStepChange,
    children,
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

  const isVertical = $derived(orientation === "vertical");

  // Calculate scale factor based on default size (50px)
  const scale = $derived(size / 50);

  // Use items.length if stepsCount not explicitly provided and items exists
  const effectiveStepsCount: number = $derived.by(() => {
    // Check if stepsCount was explicitly set or is default (3)
    // If items exists and stepsCount is default, use items.length
    if (items && items.length > 0) {
      return items.length;
    }
    return itemsCount;
  });

  // Derived values for children snippet
  const currentIndex = $derived(selectedIndex);
  const currentItem = $derived(items ? items[selectedIndex] : undefined);
  const isSelected = $derived(true); // Always true for the current thumb

  function selectStep(index: number) {
    if (isDisabled) return;
    selectedIndex = index;
    onStepChange?.(index);
  }

  function handleKeydown(event: KeyboardEvent) {
    if (isDisabled) return;

    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      selectedIndex = Math.max(0, selectedIndex - 1);
      onStepChange?.(selectedIndex);
    } else if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      selectedIndex = Math.min(effectiveStepsCount - 1, selectedIndex + 1);
      onStepChange?.(selectedIndex);
    }
  }

  // External update method for HTML/JavaScript usage
  export function update(
    updates: Partial<
      Pick<
        Props,
        | "selectedIndex"
        | "isDisabled"
        | "orientation"
        | "size"
        | "itemsCount"
        | "itemStyles"
        | "items"
      >
    >
  ) {
    if (updates.selectedIndex !== undefined)
      selectedIndex = updates.selectedIndex;
    if (updates.isDisabled !== undefined) isDisabled = updates.isDisabled;
    if (updates.orientation !== undefined) orientation = updates.orientation;
    if (updates.size !== undefined) size = updates.size;
    if (updates.itemsCount !== undefined) itemsCount = updates.itemsCount;
    if (updates.itemStyles !== undefined) itemStyles = updates.itemStyles;
    if (updates.items !== undefined) items = updates.items;
  }
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  class="multi-switch"
  class:disabled={isDisabled}
  class:vertical={isVertical}
  style:--scale={scale}
  style:--steps={effectiveStepsCount}
  style:--current-bg-color={getStyleForIndex(selectedIndex).backgroundColor || ""}
  style:--current-thumb-color={getStyleForIndex(selectedIndex).thumbColor || ""}
  style:--current-thumb-border-color={getStyleForIndex(selectedIndex).thumbBorderColor || ""}
  onclick={(e) => {
    if (isDisabled) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = isVertical
      ? (e.clientY - rect.top) / rect.height
      : (e.clientX - rect.left) / rect.width;
    const step = Math.floor(pos * effectiveStepsCount);
    selectStep(Math.max(0, Math.min(effectiveStepsCount - 1, step)));
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
    {@render children?.({ currentIndex, item: currentItem, isSelected: true })}
  </div>

  <!-- Step indicators/background segments -->
  {#each Array(effectiveStepsCount) as _, index}
    <div
      class="step-segment"
      class:active={index === selectedIndex}
      style:--step-index={index}
      style:--step-bg-color={getStyleForIndex(index).backgroundColor || ""}
      style:--step-border-color={getStyleForIndex(index).thumbBorderColor || ""}
    >
      {@render children?.({
        currentIndex: index,
        item: items && items[index],
        isSelected: false,
      })}
    </div>
  {/each}
</div>

<style lang="scss">
  @use "./assets/main.scss" as *;
</style>
