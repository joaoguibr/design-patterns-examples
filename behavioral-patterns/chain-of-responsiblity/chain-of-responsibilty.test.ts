import { describe, it, expect } from 'vitest';
import { AbstractHandler, MonkeyHandler, SquirrelHandler, DogHandler } from './chain-of-responsibilty';

describe('Chain of Responsibility', () => {
    it('MonkeyHandler should handle "Banana"', () => {
        const monkey = new MonkeyHandler();
        expect(monkey.handle('Banana')).toBe("Monkey: I'll eat the Banana.\n");
    });

    it('SquirrelHandler should handle "Nut"', () => {
        const squirrel = new SquirrelHandler();
        expect(squirrel.handle('Nut')).toBe("Squirrel: I'll eat the Nut.\n");
    });

    it('DogHandler should handle "MeatBall"', () => {
        const dog = new DogHandler();
        expect(dog.handle('MeatBall')).toBe("Dog: I'll eat the MeatBall.\n");
    });

    it('MonkeyHandler should delegate unknown food to next handler', () => {
        const monkey = new MonkeyHandler();
        const squirrel = new SquirrelHandler();
        monkey.setNext(squirrel);

        expect(monkey.handle('Nut')).toBe("Squirrel: I'll eat the Nut.\n");
    });

    it('Chain should delegate through all handlers and return null if none handle', () => {
        const monkey = new MonkeyHandler();
        const squirrel = new SquirrelHandler();
        const dog = new DogHandler();
        monkey.setNext(squirrel).setNext(dog);

        expect(monkey.handle('Apple')).toBeNull();
    });

    it('Chain should handle each food with the correct handler', () => {
        const monkey = new MonkeyHandler();
        const squirrel = new SquirrelHandler();
        const dog = new DogHandler();
        monkey.setNext(squirrel).setNext(dog);

        expect(monkey.handle('Banana')).toBe("Monkey: I'll eat the Banana.\n");
        expect(monkey.handle('Nut')).toBe("Squirrel: I'll eat the Nut.\n");
        expect(monkey.handle('MeatBall')).toBe("Dog: I'll eat the MeatBall.\n");
    });

    it('setNext should return the handler passed in', () => {
        const monkey = new MonkeyHandler();
        const squirrel = new SquirrelHandler();
        const result = monkey.setNext(squirrel);
        expect(result).toBe(squirrel);
    });

    it('AbstractHandler should return null if no next handler and cannot handle', () => {
        class TestHandler extends AbstractHandler {}
        const handler = new TestHandler();
        expect(handler.handle('Anything')).toBeNull();
    });
});
