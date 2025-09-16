<script lang="ts">
	type Orientation = 'horizontal' | 'vertical';

	interface StepStyle {
		backgroundColor?: string;
		thumbColor?: string;
		borderColor?: string;
	}

	interface Props {
		selectedIndex?: number;
		isDisabled?: boolean;
		orientation?: Orientation;
		size?: number;
		stepsCount?: number;
		stepStyles?: StepStyle[];
		onStepChange?: (index: number) => void;
		children?: import('svelte').Snippet<[{ selectedIndex: number, stepIndex: number, isSelected: boolean }]>;
	}

	let {
		selectedIndex = $bindable(0),
		isDisabled = false,
		orientation = 'horizontal',
		size = 50,
		stepsCount = 3,
		stepStyles = [],
		onStepChange,
		children
	}: Props = $props();

	const isVertical = $derived(orientation === 'vertical');

	// Calculate scale factor based on default size (50px)
	const scale = $derived(size / 50);

	function selectStep(index: number) {
		if (isDisabled) return;
		selectedIndex = index;
		onStepChange?.(index);
	}

	function handleKeydown(event: KeyboardEvent) {
		if (isDisabled) return;

		if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
			event.preventDefault();
			selectedIndex = Math.max(0, selectedIndex - 1);
			onStepChange?.(selectedIndex);
		} else if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
			event.preventDefault();
			selectedIndex = Math.min(stepsCount - 1, selectedIndex + 1);
			onStepChange?.(selectedIndex);
		}
	}
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="multi-switch"
	class:disabled={isDisabled}
	class:vertical={isVertical}
	style:--scale="{scale}"
	style:--steps="{stepsCount}"
	style:--current-bg-color="{stepStyles[selectedIndex]?.backgroundColor || ''}"
	style:--current-thumb-color="{stepStyles[selectedIndex]?.thumbColor || ''}"
	style:--current-border-color="{stepStyles[selectedIndex]?.borderColor || ''}"
	onclick={(e) => {
		if (isDisabled) return;
		const rect = e.currentTarget.getBoundingClientRect();
		const pos = isVertical
			? (e.clientY - rect.top) / rect.height
			: (e.clientX - rect.left) / rect.width;
		const step = Math.floor(pos * stepsCount);
		selectStep(Math.max(0, Math.min(stepsCount - 1, step)));
	}}
	onkeydown={handleKeydown}
	role="slider"
	aria-valuemin="0"
	aria-valuemax="{stepsCount - 1}"
	aria-valuenow="{selectedIndex}"
	aria-disabled={isDisabled}
	tabindex={isDisabled ? -1 : 0}
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
	{#each Array(stepsCount) as _, index}
		<div
			class="step-segment"
			class:active={index === selectedIndex}
			style:--step-index="{index}"
			style:--step-bg-color="{stepStyles[index]?.backgroundColor || ''}"
			style:--step-border-color="{stepStyles[index]?.borderColor || ''}"
		></div>
	{/each}
</div>

<style lang="scss">
	@use './assets/main.scss' as *;
</style>