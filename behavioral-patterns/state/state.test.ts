import { describe, it, expect } from 'vitest';
import { Context, ConcreteStateA, ConcreteStateB, State } from './state';

describe('State Pattern', () => {
  it('ConcreteStateA should publish message correctly', () => {
    const stateA = new ConcreteStateA();
    expect(stateA.publish('Hello')).toBe('ConcreteStateA published: Hello');
  });

  it('ConcreteStateB should publish message correctly', () => {
    const stateB = new ConcreteStateB();
    expect(stateB.publish('World')).toBe('ConcreteStateB published: World');
  });

  it('Context should use initial state to publish', () => {
    const context = new Context(new ConcreteStateA());
    expect(context.request('Test')).toBe('ConcreteStateA published: Test');
  });

  it('Context should change state and publish accordingly', () => {
    const context = new Context(new ConcreteStateA());
    context.setState(new ConcreteStateB());
    expect(context.request('Switch')).toBe('ConcreteStateB published: Switch');
  });

  it('Context should work with custom State implementations', () => {
    class CustomState implements State {
      publish(message: string): string {
        return `CustomState: ${message}`;
      }
    }
    const context = new Context(new CustomState());
    expect(context.request('Custom')).toBe('CustomState: Custom');
  });
});