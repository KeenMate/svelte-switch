<script lang="ts">
	type Direction = 'horizontal' | 'vertical';

	interface Props {
		checked?: boolean;
		disabled?: boolean;
		direction?: Direction;
		size?: number;
		onToggle?: (checked: boolean) => void;
		children?: import('svelte').Snippet<[{ checked: boolean }]>;
	}

	let {
		checked = $bindable(false),
		disabled = false,
		direction = 'horizontal',
		size = 50,
		onToggle,
		children
	}: Props = $props();

	const isVertical = $derived(direction === 'vertical');

	// Calculate scale factor based on default size (50px)
	const scale = $derived(size / 50);

	function toggle() {
		if (disabled) return;
		checked = !checked;
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
	class="switch"
	class:checked
	class:disabled
	class:vertical={isVertical}
	style:--scale="{scale}"
	onclick={toggle}
	onkeydown={handleKeydown}
	role="switch"
	aria-checked={checked}
	aria-disabled={disabled}
	tabindex={disabled ? -1 : 0}
>
	<div
		class="thumb"
		style:transform={isVertical
			? `translateY(${checked ? 'calc(var(--thumb-offset) * var(--scale))' : '0px'}) translateX(-50%)`
			: `translateX(${checked ? 'calc(var(--thumb-offset) * var(--scale))' : '0px'})`}
	>
		{@render children?.({ checked })}
	</div>
</div>

<style lang="scss">
	@use './assets/main.scss' as *;
</style>