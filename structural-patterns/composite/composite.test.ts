import { describe, it, expect } from 'vitest';
import { Item, BoxComposite } from './composite';

describe('Item', () => {
    it('returns its price', () => {
        const item1 = new Item(100);
        const item2 = new Item(0);
        const item3 = new Item(19.99);

        expect(item1.getTotalPrice()).toBe(100);
        expect(item2.getTotalPrice()).toBe(0);
        expect(item3.getTotalPrice()).toBeCloseTo(19.99, 5);
    });
});

describe('BoxComposite', () => {
    it('returns 0 for an empty composite', () => {
        const box = new BoxComposite();
        expect(box.getTotalPrice()).toBe(0);
        expect(box.getChildren()).toHaveLength(0);
    });

    it('sums the prices of added items', () => {
        const box = new BoxComposite();
        const i1 = new Item(50);
        const i2 = new Item(25);

        box.add(i1);
        expect(box.getTotalPrice()).toBe(50);
        expect(box.getChildren()).toHaveLength(1);
        expect(box.getChildren()).toContain(i1);

        box.add(i2);
        expect(box.getTotalPrice()).toBe(75);
        expect(box.getChildren()).toHaveLength(2);
        expect(box.getChildren()).toContain(i2);
    });

    it('supports nested composites', () => {
        const inner = new BoxComposite();
        inner.add(new Item(10));
        inner.add(new Item(15));

        const outer = new BoxComposite();
        outer.add(new Item(5));
        outer.add(inner);

        expect(inner.getTotalPrice()).toBe(25);
        expect(outer.getTotalPrice()).toBe(30);

        const deeper = new BoxComposite();
        deeper.add(new Item(2));
        deeper.add(outer);

        expect(deeper.getTotalPrice()).toBe(32);
    });

    it('removes items and updates total', () => {
        const box = new BoxComposite();
        const i1 = new Item(10);
        const i2 = new Item(20);
        const i3 = new Item(30);

        box.add(i1);
        box.add(i2);
        box.add(i3);
        expect(box.getTotalPrice()).toBe(60);

        box.remove(i2);
        expect(box.getTotalPrice()).toBe(40);
        expect(box.getChildren()).not.toContain(i2);
        expect(box.getChildren()).toEqual([i1, i3]);

        // removing an item not present should not change anything
        box.remove(i2);
        expect(box.getTotalPrice()).toBe(40);
        expect(box.getChildren()).toEqual([i1, i3]);
    });

    it('removes nested composites correctly', () => {
        const inner = new BoxComposite();
        inner.add(new Item(7));
        inner.add(new Item(3)); // inner = 10

        const outer = new BoxComposite();
        const i = new Item(5);
        outer.add(i);
        outer.add(inner); // outer = 15

        expect(outer.getTotalPrice()).toBe(15);

        outer.remove(inner);
        expect(outer.getTotalPrice()).toBe(5);
        expect(outer.getChildren()).toEqual([i]);
    });
});