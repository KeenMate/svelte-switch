export { default as Switch } from './Switch.svelte';
export { default as MultiSwitch } from './MultiSwitch.svelte';

export {
	getStyleForIndex,
	itemAt,
	resolveLabelText,
	type StepStyle,
	type ItemStyles
} from './utils.js';

export {
	enableLogging,
	disableLogging,
	setLogLevel,
	setCategoryLevel,
	getCategories,
	LOGGING_CATEGORIES,
	initLogger,
	interactionLogger,
	renderLogger,
	type LogLevel
} from './logger.js';

import {
	enableLogging,
	disableLogging,
	setLogLevel,
	setCategoryLevel,
	getCategories,
	type LogLevel
} from './logger.js';
import { getAllInstances } from './instances.js';

export interface GlobalSvelteSwitchAPI {
	version: () => string;
	config: {
		name: string;
		version: string;
		author: string;
		license: string;
		repository: string;
		homepage: string;
	};
	logging: {
		enableLogging: () => void;
		disableLogging: () => void;
		setLogLevel: (level: LogLevel) => void;
		setCategoryLevel: (category: string, level: LogLevel) => void;
		getCategories: () => string[];
	};
	getInstances: () => HTMLElement[];
}

declare global {
	interface Window {
		components?: {
			'svelte-switch'?: GlobalSvelteSwitchAPI;
			[key: string]: unknown;
		};
	}
}

if (typeof window !== 'undefined') {
	window.components = window.components || {};
	window.components['svelte-switch'] = {
		version: () => __VERSION__,
		config: {
			name: __PACKAGE_NAME__,
			version: __VERSION__,
			author: __AUTHOR__,
			license: __LICENSE__,
			repository: __REPOSITORY__,
			homepage: __HOMEPAGE__
		},
		logging: {
			enableLogging,
			disableLogging,
			setLogLevel,
			setCategoryLevel,
			getCategories
		},
		getInstances: () => getAllInstances()
	};
}
