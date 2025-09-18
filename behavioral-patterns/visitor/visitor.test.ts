import { describe, it, expect } from 'vitest';
import {

  ConcreteComponentA,
  ConcreteComponentB,
  ConcreteVisitor1,
  ConcreteVisitor2,
} from './visitor';

describe('Visitor Pattern', () => {
  describe('ConcreteComponentA', () => {
    it('should return correct value from exclusiveMethodOfConcreteComponentA', () => {
      const component = new ConcreteComponentA();
      expect(component.exclusiveMethodOfConcreteComponentA()).toBe('A');
    });

    it('should interact correctly with ConcreteVisitor1', () => {
      const component = new ConcreteComponentA();
      const visitor = new ConcreteVisitor1();
      expect(component.accept(visitor)).toBe('A + ConcreteVisitor1');
    });

    it('should interact correctly with ConcreteVisitor2', () => {
      const component = new ConcreteComponentA();
      const visitor = new ConcreteVisitor2();
      expect(component.accept(visitor)).toBe('A + ConcreteVisitor2');
    });
  });

  describe('ConcreteComponentB', () => {
    it('should return correct value from specialMethodOfConcreteComponentB', () => {
      const component = new ConcreteComponentB();
      expect(component.specialMethodOfConcreteComponentB()).toBe('B');
    });

    it('should interact correctly with ConcreteVisitor1', () => {
      const component = new ConcreteComponentB();
      const visitor = new ConcreteVisitor1();
      expect(component.accept(visitor)).toBe('B + ConcreteVisitor1');
    });

    it('should interact correctly with ConcreteVisitor2', () => {
      const component = new ConcreteComponentB();
      const visitor = new ConcreteVisitor2();
      expect(component.accept(visitor)).toBe('B + ConcreteVisitor2');
    });
  });
});