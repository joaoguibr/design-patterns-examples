import { describe, it, expect } from 'vitest';
import { NumberCollection, NumberIterator } from './iterator';

describe('NumberCollection', () => {
  it('should add items and create an iterator', () => {
    const collection = new NumberCollection();
    collection.addItem(1);
    collection.addItem(2);
    collection.addItem(3);

    const iterator = collection.createIterator();
    expect(iterator).toBeInstanceOf(NumberIterator);
  });

  it('iterator should iterate through all items', () => {
    const collection = new NumberCollection();
    collection.addItem(10);
    collection.addItem(20);
    collection.addItem(30);

    const iterator = collection.createIterator();
    const results: number[] = [];
    while (iterator.hasNext()) {
      const value = iterator.next();
      results.push(value as number);
    }
    expect(results).toEqual([10, 20, 30]);
  });

  it('iterator should return null when no more items', () => {
    const collection = new NumberCollection();
    collection.addItem(5);

    const iterator = collection.createIterator();
    expect(iterator.next()).toBe(5);
    expect(iterator.hasNext()).toBe(false);
    expect(iterator.next()).toBeNull();
  });

  it('iterator should handle empty collection', () => {
    const collection = new NumberCollection();
    const iterator = collection.createIterator();
    expect(iterator.hasNext()).toBe(false);
    expect(iterator.next()).toBeNull();
  });
});

describe('NumberIterator', () => {
  it('should iterate over a given array', () => {
    const arr = [7, 8, 9];
    const iterator = new NumberIterator(arr);

    expect(iterator.hasNext()).toBe(true);
    expect(iterator.next()).toBe(7);
    expect(iterator.hasNext()).toBe(true);
    expect(iterator.next()).toBe(8);
    expect(iterator.hasNext()).toBe(true);
    expect(iterator.next()).toBe(9);
    expect(iterator.hasNext()).toBe(false);
    expect(iterator.next()).toBeNull();
  });
});