// Minimal typings for the vendored loglevel modules. The rich types from the
// `loglevel` npm package are intentionally not used — we only need the shape
// our own logger.ts consumes.

export type LogLevelDesc = 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'silent' | number;

export interface Logger {
	trace(...msg: unknown[]): void;
	debug(...msg: unknown[]): void;
	info(...msg: unknown[]): void;
	warn(...msg: unknown[]): void;
	error(...msg: unknown[]): void;
	setLevel(level: LogLevelDesc, persist?: boolean): void;
	getLevel(): number;
	setDefaultLevel(level: LogLevelDesc): void;
	methodFactory: (
		methodName: string,
		logLevel: number,
		loggerName: string
	) => (...args: unknown[]) => void;
}

export interface RootLogger extends Logger {
	getLogger(name: string | symbol): Logger;
}

declare const log: RootLogger;
export default log;
