import { describe, it, expect } from 'vitest';
import {
  AdditionStrategy,
  SubtractionStrategy,
  MultiplicationStrategy,
  DivisionStrategy,
  Context,
} from './strategy';

describe('Strategy Pattern', () => {
  describe('AdditionStrategy', () => {
    it('should add two numbers', () => {
      const strategy = new AdditionStrategy();
      expect(strategy.execute(2, 3)).toBe(5);
      expect(strategy.execute(-1, 1)).toBe(0);
    });
  });

  describe('SubtractionStrategy', () => {
    it('should subtract two numbers', () => {
      const strategy = new SubtractionStrategy();
      expect(strategy.execute(5, 3)).toBe(2);
      expect(strategy.execute(0, 1)).toBe(-1);
    });
  });

  describe('MultiplicationStrategy', () => {
    it('should multiply two numbers', () => {
      const strategy = new MultiplicationStrategy();
      expect(strategy.execute(2, 3)).toBe(6);
      expect(strategy.execute(-2, 3)).toBe(-6);
    });
  });

  describe('DivisionStrategy', () => {
    it('should divide two numbers', () => {
      const strategy = new DivisionStrategy();
      expect(strategy.execute(6, 3)).toBe(2);
      expect(strategy.execute(-6, 3)).toBe(-2);
    });

    it('should throw error when dividing by zero', () => {
      const strategy = new DivisionStrategy();
      expect(() => strategy.execute(1, 0)).toThrow('Division by zero is not allowed.');
    });
  });

  describe('Context', () => {
    it('should use the provided strategy', () => {
      const context = new Context(new AdditionStrategy());
      expect(context.executeStrategy(1, 2)).toBe(3);

      context.setStrategy(new SubtractionStrategy());
      expect(context.executeStrategy(5, 3)).toBe(2);

      context.setStrategy(new MultiplicationStrategy());
      expect(context.executeStrategy(2, 4)).toBe(8);

      context.setStrategy(new DivisionStrategy());
      expect(context.executeStrategy(8, 2)).toBe(4);
    });

    it('should throw error when division by zero in context', () => {
      const context = new Context(new DivisionStrategy());
      expect(() => context.executeStrategy(1, 0)).toThrow('Division by zero is not allowed.');
    });
  });
});
