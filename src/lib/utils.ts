export interface StepStyle {
	backgroundColor?: string;
	thumbColor?: string;
	thumbBorderColor?: string;
}

export type ItemStyles = StepStyle[] | StepStyle;

/**
 * Resolves the step style for a given index.
 * `itemStyles` may be an array (per-index) or a single object (shared across steps).
 */
export function getStyleForIndex(itemStyles: ItemStyles | undefined, index: number): StepStyle {
	if (Array.isArray(itemStyles)) {
		return itemStyles[index] ?? {};
	}
	if (itemStyles && typeof itemStyles === 'object') {
		return itemStyles;
	}
	return {};
}

/**
 * Safe indexed read for an optional items array. Returns `undefined` when `items`
 * is null/undefined or the index is out of bounds.
 */
export function itemAt<T>(items: readonly T[] | null | undefined, index: number): T | undefined {
	return items?.[index];
}

/**
 * Resolves the display label for a step.
 *
 * Priority order:
 *   1. `labelMember` — read `item[labelMember]` when it exists and is non-null
 *   2. `labelCallback` — call the user-provided resolver
 *   3. fallback — `Option {index + 1}`
 *
 * For plain string arrays, callers must pass `labelCallback: (item) => item`
 * (or similar) — the fallback intentionally ignores the raw item so this
 * function stays predictable across item shapes.
 */
export function resolveLabelText(
	items: readonly unknown[] | null | undefined,
	labelMember: string | undefined,
	labelCallback: ((item: unknown, index: number) => string) | undefined,
	index: number
): string {
	const item = itemAt(items, index);

	if (labelMember && item && typeof item === 'object') {
		const value = (item as Record<string, unknown>)[labelMember];
		if (value != null) return String(value);
	}
	if (labelCallback) {
		return labelCallback(item, index);
	}
	return `Option ${index + 1}`;
}
