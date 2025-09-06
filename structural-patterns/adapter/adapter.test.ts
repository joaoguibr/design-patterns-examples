import { describe, it, expect, vi, afterEach } from 'vitest';
import { Paypal, Stripe, PaypalAdapter, StripeAdapter, PaymentProcessor } from './adapter';

afterEach(() => {
    vi.restoreAllMocks();
});

describe('Paypal', () => {
    it('sendPayment returns the same amount', () => {
        const paypal = new Paypal();
        expect(paypal.sendPayment(250)).toBe(250);
    });
});

describe('Stripe', () => {
    it('makePayment returns the same amount', () => {
        const stripe = new Stripe();
        expect(stripe.makePayment(500)).toBe(500);
    });
});

describe('Adapters', () => {
    it('PaypalAdapter delegates to Paypal.sendPayment and returns its value', () => {
        const paypal = new Paypal();
        const spy = vi.spyOn(paypal, 'sendPayment');
        const adapter = new PaypalAdapter(paypal);

        const amount = 123;
        const result = adapter.pay(amount);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(amount);
        expect(result).toBe(amount);
    });

    it('StripeAdapter multiplies by 100 before delegating to Stripe.makePayment', () => {
        const stripe = new Stripe();
        const spy = vi.spyOn(stripe, 'makePayment');
        const adapter = new StripeAdapter(stripe);

        const amount = 42;
        const expected = amount * 100;
        const result = adapter.pay(amount);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(expected);
        expect(result).toBe(expected);
    });

    it('Adapters satisfy PaymentProcessor and behave as expected', () => {
        const process = (p: PaymentProcessor, amount: number) => p.pay(amount);

        const paypalResult = process(new PaypalAdapter(new Paypal()), 10);
        expect(paypalResult).toBe(10);

        const stripeResult = process(new StripeAdapter(new Stripe()), 10);
        expect(stripeResult).toBe(1000);
    });

    it('StripeAdapter handles decimal amounts (precision check)', () => {
        const stripe = new Stripe();
        const adapter = new StripeAdapter(stripe);

        const amount = 10.99;
        const result = adapter.pay(amount);

        expect(result).toBeCloseTo(1099, 10);
    });
});