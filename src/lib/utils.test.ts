import { describe, it, expect } from 'vitest';
import { getStyleForIndex, itemAt, resolveLabelText } from './utils.js';

describe('getStyleForIndex', () => {
	it('returns the indexed entry when passed an array', () => {
		const styles = [
			{ backgroundColor: '#f00' },
			{ backgroundColor: '#0f0' },
			{ backgroundColor: '#00f' }
		];
		expect(getStyleForIndex(styles, 0)).toEqual({ backgroundColor: '#f00' });
		expect(getStyleForIndex(styles, 2)).toEqual({ backgroundColor: '#00f' });
	});

	it('returns the same object for every index in object mode', () => {
		const shared = { backgroundColor: '#abc', thumbColor: '#def' };
		expect(getStyleForIndex(shared, 0)).toBe(shared);
		expect(getStyleForIndex(shared, 5)).toBe(shared);
	});

	it('returns empty object for out-of-bounds array indices', () => {
		expect(getStyleForIndex([{ backgroundColor: '#f00' }], 5)).toEqual({});
	});

	it('returns empty object when itemStyles is undefined, null, or an empty array', () => {
		expect(getStyleForIndex(undefined, 0)).toEqual({});
		expect(getStyleForIndex([], 0)).toEqual({});
	});
});

describe('itemAt', () => {
	it('reads by index when items is an array', () => {
		expect(itemAt(['a', 'b', 'c'], 1)).toBe('b');
	});

	it('returns undefined for null/undefined items', () => {
		expect(itemAt(null, 0)).toBeUndefined();
		expect(itemAt(undefined, 0)).toBeUndefined();
	});

	it('returns undefined for out-of-bounds indices', () => {
		expect(itemAt(['a', 'b'], 5)).toBeUndefined();
		expect(itemAt([], 0)).toBeUndefined();
	});
});

describe('resolveLabelText', () => {
	const objectItems = [
		{ name: 'Small', value: 'S' },
		{ name: 'Medium', value: 'M' },
		{ name: 'Large', value: 'L' }
	];

	it('reads labelMember from object items', () => {
		expect(resolveLabelText(objectItems, 'name', undefined, 0)).toBe('Small');
		expect(resolveLabelText(objectItems, 'value', undefined, 2)).toBe('L');
	});

	it('falls back when labelMember is missing on the item', () => {
		expect(resolveLabelText(objectItems, 'nonexistent', undefined, 0)).toBe('Option 1');
	});

	it('coerces labelMember values to string', () => {
		const numbered = [{ n: 42 }, { n: 100 }];
		expect(resolveLabelText(numbered, 'n', undefined, 0)).toBe('42');
	});

	it('skips labelMember when item is not an object (e.g. string array)', () => {
		expect(resolveLabelText(['Small', 'Medium'], 'name', undefined, 0)).toBe('Option 1');
	});

	it('calls labelCallback when provided and labelMember did not match', () => {
		const cb = (item: unknown, index: number) => `${(item as { name: string }).name} [${index}]`;
		expect(resolveLabelText(objectItems, undefined, cb, 1)).toBe('Medium [1]');
	});

	it('prefers labelMember over labelCallback when both are provided', () => {
		const cb = () => 'CALLBACK';
		expect(resolveLabelText(objectItems, 'name', cb, 0)).toBe('Small');
	});

	it('passes the raw item (undefined when out of bounds) to labelCallback', () => {
		const cb = (item: unknown, index: number) => (item === undefined ? `missing-${index}` : 'ok');
		expect(resolveLabelText(objectItems, undefined, cb, 99)).toBe('missing-99');
	});

	it('falls back to `Option N` when no items and no callbacks', () => {
		expect(resolveLabelText(null, undefined, undefined, 0)).toBe('Option 1');
		expect(resolveLabelText(null, undefined, undefined, 4)).toBe('Option 5');
	});
});
