import { describe, it, expect, vi } from 'vitest';
import { EmailFactory, SMSFactory, PushFactory, NotificationService } from './abstract-factory';

describe('Abstract Factory - Notifications', () => {
    it('EmailFactory produces correct messages', () => {
        const factory = new EmailFactory();
        expect(factory.createShortMessage().send()).toBe('Sending a short email!');
        expect(factory.createLongMessage().send()).toBe('Sending a long email!');
    });

    it('SMSFactory produces correct messages', () => {
        const factory = new SMSFactory();
        expect(factory.createShortMessage().send()).toBe('Sending a short SMS!');
        expect(factory.createLongMessage().send()).toBe('Sending a long SMS!');
    });

    it('PushFactory produces correct messages', () => {
        const factory = new PushFactory();
        expect(factory.createShortMessage().send()).toBe('Sending a short push!');
        expect(factory.createLongMessage().send()).toBe('Sending a long push!');
    });

    it('Factories create new instances on each call', () => {
        const emailFactory = new EmailFactory();
        const s1 = emailFactory.createShortMessage();
        const s2 = emailFactory.createShortMessage();
        const l1 = emailFactory.createLongMessage();
        const l2 = emailFactory.createLongMessage();

        expect(s1).not.toBe(s2);
        expect(l1).not.toBe(l2);
    });

    it('NotificationService uses the factory to send messages', () => {
        const shortSend = vi.fn().mockReturnValue('short');
        const longSend = vi.fn().mockReturnValue('long');

        const fakeFactory = {
            createShortMessage: vi.fn(() => ({ send: shortSend })),
            createLongMessage: vi.fn(() => ({ send: longSend })),
        };

        const service = new NotificationService(fakeFactory as any);

        expect(service.sendShortMessage()).toBeUndefined();
        expect(fakeFactory.createShortMessage).toHaveBeenCalledTimes(1);
        expect(shortSend).toHaveBeenCalledTimes(1);

        expect(service.sendLongMessage()).toBeUndefined();
        expect(fakeFactory.createLongMessage).toHaveBeenCalledTimes(1);
        expect(longSend).toHaveBeenCalledTimes(1);
    });
});
