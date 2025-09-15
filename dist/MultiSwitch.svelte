<script lang="ts">
	type Direction = 'horizontal' | 'vertical';

	interface StepStyle {
		backgroundColor?: string;
		thumbColor?: string;
		borderColor?: string;
	}

	interface Props {
		selectedIndex?: number;
		disabled?: boolean;
		direction?: Direction;
		size?: number;
		steps?: number;
		stepStyles?: StepStyle[];
		onStepChange?: (index: number) => void;
		children?: import('svelte').Snippet<[{ selectedIndex: number, stepIndex: number, isSelected: boolean }]>;
	}

	let {
		selectedIndex = $bindable(0),
		disabled = false,
		direction = 'horizontal',
		size = 50,
		steps = 3,
		stepStyles = [],
		onStepChange,
		children
	}: Props = $props();

	const isVertical = $derived(direction === 'vertical');

	// Calculate scale factor based on default size (50px)
	const scale = $derived(size / 50);

	function selectStep(index: number) {
		if (disabled) return;
		selectedIndex = index;
		onStepChange?.(index);
	}

	function handleKeydown(event: KeyboardEvent) {
		if (disabled) return;

		if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
			event.preventDefault();
			selectedIndex = Math.max(0, selectedIndex - 1);
			onStepChange?.(selectedIndex);
		} else if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
			event.preventDefault();
			selectedIndex = Math.min(steps - 1, selectedIndex + 1);
			onStepChange?.(selectedIndex);
		}
	}
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="multi-switch"
	class:disabled
	class:vertical={isVertical}
	style:--scale="{scale}"
	style:--steps="{steps}"
	style:--current-bg-color="{stepStyles[selectedIndex]?.backgroundColor || ''}"
	style:--current-thumb-color="{stepStyles[selectedIndex]?.thumbColor || ''}"
	style:--current-border-color="{stepStyles[selectedIndex]?.borderColor || ''}"
	onclick={(e) => {
		if (disabled) return;
		const rect = e.currentTarget.getBoundingClientRect();
		const pos = isVertical
			? (e.clientY - rect.top) / rect.height
			: (e.clientX - rect.left) / rect.width;
		const step = Math.floor(pos * steps);
		selectStep(Math.max(0, Math.min(steps - 1, step)));
	}}
	onkeydown={handleKeydown}
	role="slider"
	aria-valuemin="0"
	aria-valuemax="{steps - 1}"
	aria-valuenow="{selectedIndex}"
	aria-disabled={disabled}
	tabindex={disabled ? -1 : 0}
>
	<div
		class="thumb"
		style:transform={isVertical
			? `translateY(calc(var(--step-offset) * ${selectedIndex})) translateX(-50%)`
			: `translateX(calc(var(--step-offset) * ${selectedIndex}))`}
	>
		{@render children?.({ selectedIndex, stepIndex: selectedIndex, isSelected: true })}
	</div>

	<!-- Step indicators/background segments -->
	{#each Array(steps) as _, index}
		<div
			class="step-segment"
			class:active={index === selectedIndex}
			style:--step-index="{index}"
			style:--step-bg-color="{stepStyles[index]?.backgroundColor || ''}"
			style:--step-border-color="{stepStyles[index]?.borderColor || ''}"
		></div>
	{/each}
</div>

<style>.switch {
  position: relative;
  background-color: #ccc;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  outline: none;
  user-select: none;
  width: 60px;
  height: 32px;
  --thumb-offset: 28px;
  --margin: 2px;
  --switch-width: 60px;
  --switch-height: 32px;
  --thumb-height: 28px;
  --scale: 1;
  width: calc(var(--switch-width) * var(--scale));
  height: calc(var(--switch-height) * var(--scale));
}
.switch.vertical {
  width: calc(var(--switch-height) * var(--scale));
  height: calc(var(--switch-width) * var(--scale));
}
.switch:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
}
.switch.checked {
  background-color: #4299e1;
}
.switch.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.thumb {
  position: absolute;
  background-color: white;
  border-radius: 4px;
  top: 2px;
  left: 2px;
  transition: transform 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  width: calc(var(--thumb-height) * var(--scale));
  height: calc(var(--thumb-height) * var(--scale));
  top: calc(var(--margin) * var(--scale));
  left: calc(var(--margin) * var(--scale));
  display: flex;
  align-items: center;
  justify-content: center;
}

.switch.vertical .thumb {
  left: 50%;
  transform: translateX(-50%);
  top: calc(var(--margin) * var(--scale));
}

.multi-switch {
  position: relative;
  background-color: #ccc;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  outline: none;
  user-select: none;
}
.multi-switch:has(.step-segment.active) {
  background-color: var(--current-bg-color, #ccc);
}
.multi-switch {
  --multi-switch-width: 92px;
  --step-offset: 30px;
  --margin: 2px;
  --thumb-height: 28px;
  --switch-height: 32px;
  --step-spacing: 2px;
  --scale: 1;
  --steps: 3;
  width: calc((var(--thumb-height) * var(--steps) + var(--margin) * 2 + var(--step-spacing) * (var(--steps) - 1)) * var(--scale));
  height: calc(var(--switch-height) * var(--scale));
  --step-offset: calc((var(--thumb-height) + var(--step-spacing)) * var(--scale));
}
.multi-switch:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
}
.multi-switch.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.multi-switch.vertical {
  width: calc(var(--switch-height) * var(--scale));
  height: calc((var(--thumb-height) * var(--steps) + var(--margin) * 2 + var(--step-spacing) * (var(--steps) - 1)) * var(--scale));
}
.multi-switch .thumb {
  position: absolute;
  background-color: var(--current-thumb-color, white);
  border-radius: 4px;
  top: calc(var(--margin) * var(--scale));
  left: calc(var(--margin) * var(--scale));
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 10;
  border: 1px solid var(--current-border-color, transparent);
  width: calc(var(--thumb-height) * var(--scale));
  height: calc(var(--thumb-height) * var(--scale));
  display: flex;
  align-items: center;
  justify-content: center;
}
.multi-switch.vertical .thumb {
  left: 50%;
  transform: translateX(-50%);
  top: calc(var(--margin) * var(--scale));
}
.multi-switch .step-segment {
  position: absolute;
  background-color: var(--step-bg-color, rgba(0, 0, 0, 0.1));
  border-radius: 4px;
  transition: background-color 0.3s ease;
  z-index: 1;
  border: 1px solid var(--step-border-color, transparent);
  width: calc(var(--thumb-height) * var(--scale));
  height: calc((var(--switch-height) - var(--margin) * 2) * var(--scale));
  top: calc(var(--margin) * var(--scale));
  left: calc((var(--margin) + (var(--thumb-height) + var(--step-spacing)) * var(--step-index)) * var(--scale));
}
.multi-switch .step-segment.active {
  background-color: var(--step-bg-color, rgba(0, 0, 0, 0.2));
}
.multi-switch.vertical .step-segment {
  width: calc((var(--switch-height) - var(--margin) * 2) * var(--scale));
  height: calc(var(--thumb-height) * var(--scale));
  left: calc(var(--margin) * var(--scale));
  top: calc((var(--margin) + (var(--thumb-height) + var(--step-spacing)) * var(--step-index)) * var(--scale));
}</style>