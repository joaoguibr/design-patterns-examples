import { describe, it, expect } from 'vitest';
import { Margherita, CheeseExtra, Bacon, Olive } from './decorator';

describe('Pizza Decorator Pattern', () => {
    it('should return correct price and description for Margherita', () => {
        const pizza = new Margherita();
        expect(pizza.price()).toBe(6.0);
        expect(pizza.description()).toBe('A delicious Margherita pizza');
    });

    it('should add extra cheese to Margherita', () => {
        const pizza = new CheeseExtra(new Margherita());
        expect(pizza.price()).toBe(7.5);
        expect(pizza.description()).toBe('A delicious Margherita pizza, with extra cheese');
    });

    it('should add bacon to Margherita', () => {
        const pizza = new Bacon(new Margherita());
        expect(pizza.price()).toBe(8.0);
        expect(pizza.description()).toBe('A delicious Margherita pizza, with bacon');
    });

    it('should add olives to Margherita', () => {
        const pizza = new Olive(new Margherita());
        expect(pizza.price()).toBe(7.0);
        expect(pizza.description()).toBe('A delicious Margherita pizza, with olives');
    });

    it('should combine multiple decorators correctly', () => {
        const pizza = new Olive(new Bacon(new CheeseExtra(new Margherita())));
        expect(pizza.price()).toBe(10.5); // 6.0 + 1.5 + 2.0 + 1.0
        expect(pizza.description()).toBe(
            'A delicious Margherita pizza, with extra cheese, with bacon, with olives'
        );
    });

    it('should allow decorators in any order', () => {
        const pizza = new CheeseExtra(new Olive(new Bacon(new Margherita())));
        expect(pizza.price()).toBe(10.5); // 6.0 + 2.0 + 1.0 + 1.5
        expect(pizza.description()).toBe(
            'A delicious Margherita pizza, with bacon, with olives, with extra cheese'
        );
    });
});