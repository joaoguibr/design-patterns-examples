export interface INotification {
    send(message: string): string;
}

export class EmailNotification implements INotification {
    send(message: string): string {
        return `sending message via email: ${message}`;
    }
}

export class SMSNotification implements INotification {
    send(message: string): string {
        return `sending message via SMS: ${message}`;
    }
}

export class PushNotification implements INotification {
    send(message: string): string {
        return `sending message via push: ${message}`;
    }
}

export abstract class NotificationFactory {
    abstract createNotification(): INotification;

    notifyUser(message: string): string {
        const notification: INotification = this.createNotification();
        return notification.send(message);
    }
}

export class EmailNotificationFactory extends NotificationFactory {
    createNotification(): INotification {
        return new EmailNotification();
    }
}

export class SMSNotificationFactory extends NotificationFactory {
    createNotification(): INotification {
        return new SMSNotification();
    }
}

export class PushNotificationFactory extends NotificationFactory {
    createNotification(): INotification {
        return new PushNotification();
    }
}
