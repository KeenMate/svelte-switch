import type { RootLogger } from './index.js';

export interface PrefixOptions {
	template?: string;
	levelFormatter?: (level: string) => string;
	nameFormatter?: (name: string | undefined) => string;
	timestampFormatter?: (date: Date) => string;
	format?: (level: string, name: string | undefined, timestamp: string) => string;
}

export interface Prefix {
	reg(logger: RootLogger): void;
	apply(logger: RootLogger, options?: PrefixOptions): RootLogger;
}

declare const prefix: Prefix;
export default prefix;
