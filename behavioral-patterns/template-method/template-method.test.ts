import { describe, it, expect } from 'vitest';
import { AbstractClass, ConcreteClassA, ConcreteClassB } from './template-method';

describe('Template Method Pattern', () => {
  it('ConcreteClassA should follow the correct template sequence', () => {
    const instance = new ConcreteClassA();
    expect(instance.templateMethod()).toEqual([
      'ConcreteClassA: Implementation of abstractOperation1',
      'ConcreteClassA: Overridden hook1',
      'ConcreteClassA: Implementation of abstractOperation2',
      'Default implementation of hook2',
    ]);
  });

  it('ConcreteClassB should follow the correct template sequence', () => {
    const instance = new ConcreteClassB();
    expect(instance.templateMethod()).toEqual([
      'ConcreteClassB: Implementation of abstractOperation1',
      'Default implementation of hook1',
      'ConcreteClassB: Implementation of abstractOperation2',
      'ConcreteClassB: Overridden hook2',
    ]);
  });

  it('AbstractClass hooks should return default implementations', () => {
    class TestClass extends AbstractClass {
      protected abstractOperation1(): string {
        return 'op1';
      }
      protected abstractOperation2(): string {
        return 'op2';
      }
    }
    const instance = new TestClass();
    expect(instance['hook1']()).toBe('Default implementation of hook1');
    expect(instance['hook2']()).toBe('Default implementation of hook2');
  });

  it('ConcreteClassA should override only hook1', () => {
    const instance = new ConcreteClassA();
    expect(instance['hook1']()).toBe('ConcreteClassA: Overridden hook1');
    expect(instance['hook2']()).toBe('Default implementation of hook2');
  });

  it('ConcreteClassB should override only hook2', () => {
    const instance = new ConcreteClassB();
    expect(instance['hook1']()).toBe('Default implementation of hook1');
    expect(instance['hook2']()).toBe('ConcreteClassB: Overridden hook2');
  });

  it('should throw error if abstract methods are not implemented', () => {
    class IncompleteClass extends AbstractClass {}
    const instance = new IncompleteClass();
    expect(() => instance.templateMethod()).toThrow();
  });
});
