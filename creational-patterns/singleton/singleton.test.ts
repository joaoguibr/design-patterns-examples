import { describe, it, expect, afterEach } from 'vitest';
import { Logger } from './singleton';

describe('Logger (Singleton)', () => {
    afterEach(() => {
        Logger.getInstance().clearInstance();
    });

    it('returns the same instance across multiple calls', () => {
        const a = Logger.getInstance();
        const b = Logger.getInstance();
        expect(a).toBe(b);
    });

    it('logs messages and preserves order', () => {
        const logger = Logger.getInstance();
        logger.log('first');
        logger.log('second');
        expect(logger.logHistory).toEqual(['first', 'second']);
    });

    it('clears log history', () => {
        const logger = Logger.getInstance();
        logger.log('entry');
        logger.clearLogHistory();
        expect(logger.logHistory).toEqual([]);
    });

    it('clearInstance resets the singleton to a fresh instance', () => {
        const first = Logger.getInstance();
        first.log('persist');
        expect(first.logHistory).toEqual(['persist']);

        first.clearInstance();

        const second = Logger.getInstance();
        expect(second).not.toBe(first);
        expect(second.logHistory).toEqual([]);
    });
});
