import { describe, it, expect } from 'vitest';
import { TreeType, TreeFactory, Tree } from './flyweight';

describe('TreeType', () => {
    it('should store name, texture, and color', () => {
        const type = new TreeType('Oak', 'Rough', 'Green');
        expect(type.name).toBe('Oak');
        expect(type.texture).toBe('Rough');
        expect(type.color).toBe('Green');
    });

    it('should draw with correct output', () => {
        const type = new TreeType('Pine', 'Smooth', 'DarkGreen');
        expect(type.draw(10, 20)).toBe('Desenhando Pine (Smooth) em (10,20) cor=DarkGreen');
    });
});

describe('TreeFactory', () => {
    it('should create and cache TreeType instances', () => {
        const factory = new TreeFactory();
        const type1 = factory.getType('Birch', 'Bumpy', 'White');
        const type2 = factory.getType('Birch', 'Bumpy', 'White');
        expect(type1).toBe(type2);
        expect(factory.getTypesCount()).toBe(1);
    });

    it('should create different TreeType for different parameters', () => {
        const factory = new TreeFactory();
        const type1 = factory.getType('Maple', 'Smooth', 'Red');
        const type2 = factory.getType('Maple', 'Smooth', 'Yellow');
        expect(type1).not.toBe(type2);
        expect(factory.getTypesCount()).toBe(2);
    });
});

describe('Tree', () => {
    it('should store x, y, and type', () => {
        const type = new TreeType('Spruce', 'Rough', 'BlueGreen');
        const tree = new Tree(5, 15, type);
        expect(tree.x).toBe(5);
        expect(tree.y).toBe(15);
        expect(tree.type).toBe(type);
    });

    it('should draw using its type', () => {
        const type = new TreeType('Fir', 'Fine', 'Dark');
        const tree = new Tree(7, 8, type);
        expect(tree.draw()).toBe('Desenhando Fir (Fine) em (7,8) cor=Dark');
    });
});