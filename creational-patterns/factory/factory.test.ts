import { beforeEach, describe, expect, it } from 'vitest';
import {
    EmailNotification,
    EmailNotificationFactory,
    PushNotification,
    PushNotificationFactory,
    SMSNotification,
    SMSNotificationFactory,
} from './factory';

describe('Factory', () => {
    let emailFactory: EmailNotificationFactory;
    let smsFactory: SMSNotificationFactory;
    let pushFactory: PushNotificationFactory;

    beforeEach(() => {
        emailFactory = new EmailNotificationFactory();
        smsFactory = new SMSNotificationFactory();
        pushFactory = new PushNotificationFactory();
    });

    it('creates notification instances', () => {
        expect(emailFactory.createNotification()).toBeInstanceOf(EmailNotification);
        expect(smsFactory.createNotification()).toBeInstanceOf(SMSNotification);
        expect(pushFactory.createNotification()).toBeInstanceOf(PushNotification);
    });

    it('sends notifications', () => {
        expect(emailFactory.notifyUser('Hello via Email!')).toBe('sending message via email: Hello via Email!');
        expect(smsFactory.notifyUser('Hello via SMS!')).toBe('sending message via SMS: Hello via SMS!');
        expect(pushFactory.notifyUser('Hello via Push!')).toBe('sending message via push: Hello via Push!');
    });
});
