export interface PaymentProcessor {
    pay(amount: number): number;
}

export class Paypal {
    sendPayment(amount: number): number {
        return amount;
    }
}

export class Stripe {
    makePayment(amount: number): number {
        return amount;
    }
}

export class PaypalAdapter implements PaymentProcessor {
    constructor(private readonly paypal: Paypal) {}

    pay(amount: number): number {
        return this.paypal.sendPayment(amount);
    }
}

export class StripeAdapter implements PaymentProcessor {
    constructor(private readonly stripe: Stripe) {}

    pay(amount: number): number {
        return this.stripe.makePayment(amount * 100);
    }
}
