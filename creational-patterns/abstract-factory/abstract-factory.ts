export interface ShortMessage {
    send(): string;
}

export interface LongMessage {
    send(): string;
}

export class ShortEmail implements ShortMessage {
    send(): string {
        return 'Sending a short email!';
    }
}

export class ShortSMS implements ShortMessage {
    send(): string {
        return 'Sending a short SMS!';
    }
}

export class ShortPush implements ShortMessage {
    send(): string {
        return 'Sending a short push!';
    }
}

export class LongEmail implements LongMessage {
    send(): string {
        return 'Sending a long email!';
    }
}

export class LongSMS implements LongMessage {
    send(): string {
        return 'Sending a long SMS!';
    }
}

export class LongPush implements LongMessage {
    send(): string {
        return 'Sending a long push!';
    }
}

export interface NotificationFactory {
    createShortMessage(): ShortMessage;
    createLongMessage(): LongMessage;
}

export class EmailFactory implements NotificationFactory {
    createShortMessage(): ShortMessage {
        return new ShortEmail();
    }

    createLongMessage(): LongMessage {
        return new LongEmail();
    }
}

export class SMSFactory implements NotificationFactory {
    createShortMessage(): ShortMessage {
        return new ShortSMS();
    }

    createLongMessage(): LongMessage {
        return new LongSMS();
    }
}

export class PushFactory implements NotificationFactory {
    createShortMessage(): ShortMessage {
        return new ShortPush();
    }

    createLongMessage(): LongMessage {
        return new LongPush();
    }
}

export class NotificationService {
    constructor(private readonly factory: NotificationFactory) {}

    sendShortMessage(): void {
        this.factory.createShortMessage().send();
    }

    sendLongMessage(): void {
        this.factory.createLongMessage().send();
    }
}
