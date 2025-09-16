<script lang="ts">
	type Orientation = 'horizontal' | 'vertical';

	interface Props {
		checked?: boolean;
		isDisabled?: boolean;
		orientation?: Orientation;
		size?: number;
		onToggle?: (checked: boolean) => void;
		children?: import('svelte').Snippet<[{ checked: boolean }]>;
	}

	let {
		checked = $bindable(false),
		isDisabled = false,
		orientation = 'horizontal',
		size = 50,
		onToggle,
		children
	}: Props = $props();

	const isVertical = $derived(orientation === 'vertical');

	// Calculate scale factor based on default size (50px)
	const scale = $derived(size / 50);

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
	export function update(updates: Partial<Pick<Props, 'checked' | 'isDisabled' | 'orientation' | 'size'>>) {
		if (updates.checked !== undefined) checked = updates.checked;
		if (updates.isDisabled !== undefined) isDisabled = updates.isDisabled;
		if (updates.orientation !== undefined) orientation = updates.orientation;
		if (updates.size !== undefined) size = updates.size;
	}
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="switch"
	class:checked
	class:disabled={isDisabled}
	class:vertical={isVertical}
	style:--scale="{scale}"
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
		{@render children?.({ checked })}
	</div>
</div>

<style lang="scss">
	@use './assets/main.scss' as *;
</style>