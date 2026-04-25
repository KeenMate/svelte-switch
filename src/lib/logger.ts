/**
 * Logging configuration using loglevel with categorized loggers.
 *
 * Categories:
 * - SWITCH:INIT        — component construction, props validation, mount/destroy
 * - SWITCH:INTERACTION — user input: clicks, keyboard, label activation
 * - SWITCH:RENDER      — derived state changes that affect layout (mode/orientation/labels)
 *
 * Default level is `silent`. Enable from the browser console:
 *
 *   window.components['svelte-switch'].logging.enableLogging();
 *   window.components['svelte-switch'].logging.setLogLevel('debug');
 *   window.components['svelte-switch'].logging.setCategoryLevel('SWITCH:INTERACTION', 'trace');
 */

// Types live in adjacent .d.ts files; the .js implementations are excluded
// from svelte-check via tsconfig.json (vendored, plain JS, no need to lint).
import log from './vendor/loglevel/index.js';
import prefix from './vendor/loglevel/prefix.js';

const COLORS: Record<string, string> = {
	debug: '#0ea5e9',
	info: '#10b981',
	warn: '#f59e0b',
	error: '#ef4444'
};

prefix.reg(log);

prefix.apply(log, {
	format(level: string, name: string | undefined, _timestamp: string) {
		return `%c[${_timestamp}]%c %c[${level}]%c ${name ? `%c[${name}]%c ` : ''}`;
	},
	timestampFormatter(date: Date) {
		return (
			date.toTimeString().split(' ')[0] + '.' + date.getMilliseconds().toString().padStart(3, '0')
		);
	}
});

const originalFactory = log.methodFactory;
log.methodFactory = function (methodName: string, logLevel: number, loggerName: string) {
	const rawMethod = originalFactory(methodName, logLevel, loggerName);

	return function (...args: unknown[]) {
		if (args.length > 0 && typeof args[0] === 'string' && (args[0] as string).includes('%c')) {
			const color = COLORS[methodName] || '#666';
			const coloredArgs = [
				args[0],
				`color: ${color}; font-weight: bold;`,
				'color: inherit;',
				`color: ${color}; font-weight: bold;`,
				'color: inherit;',
				...(loggerName ? [`color: ${color}; font-weight: bold;`, 'color: inherit;'] : []),
				...args.slice(1)
			];
			rawMethod(...coloredArgs);
		} else {
			rawMethod(...args);
		}
	};
};

log.setLevel('silent');

export const initLogger = log.getLogger('SWITCH:INIT');
export const interactionLogger = log.getLogger('SWITCH:INTERACTION');
export const renderLogger = log.getLogger('SWITCH:RENDER');

export default log;

export const LOGGING_CATEGORIES = ['SWITCH:INIT', 'SWITCH:INTERACTION', 'SWITCH:RENDER'] as const;

export type LogLevel = 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'silent';

export function enableLogging() {
	log.setLevel('debug');
}

export function disableLogging() {
	log.setLevel('silent');
}

export function setLogLevel(level: LogLevel) {
	log.setLevel(level);
}

export function setCategoryLevel(category: string, level: LogLevel) {
	log.getLogger(category).setLevel(level);
}

export function getCategories(): string[] {
	return [...LOGGING_CATEGORIES];
}
