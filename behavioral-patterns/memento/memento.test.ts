import { describe, it, expect, beforeEach } from 'vitest';
import { Originator, ConcreteMemento, Caretaker, Memento } from './memento';

describe('Memento Pattern', () => {
  let originator: Originator;
  let caretaker: Caretaker;

  beforeEach(() => {
    originator = new Originator('initial');
    caretaker = new Caretaker(originator);
  });

  it('Originator should save and restore state', () => {
    const memento = originator.save();
    originator['state'] = 'changed';
    originator.restore(memento);
    expect(memento.getState()).toBe('initial');
  });

  it('ConcreteMemento should store state and date', () => {
    const memento = new ConcreteMemento('test-state');
    expect(memento.getState()).toBe('test-state');
    expect(typeof memento.getDate()).toBe('string');
    expect(memento.getName()).toContain('test-state'.substring(0, 9));
  });

  it('Caretaker should backup and undo state changes', () => {
    const firstState = originator.save().getState();
    caretaker.backup();
    originator['state'] = 'second';
    caretaker.backup();
    originator['state'] = 'third';
    caretaker.undo();
    expect(originator['state']).toBe('second');
    caretaker.undo();
    expect(originator['state']).toBe(firstState);
  });

  it('Caretaker showHistory should return correct memento names', () => {
    caretaker.backup();
    originator['state'] = 'second';
    caretaker.backup();
    const history = caretaker.showHistory();
    expect(history.length).toBe(2);
    expect(history[0]).toContain('initial');
    expect(history[1]).toContain('second');
  });

  it('Originator.restore should throw on unknown memento', () => {
    const fakeMemento: Memento = {
      getState: () => 'fake',
      getName: () => 'fake',
      getDate: () => 'fake',
    };
    expect(() => originator.restore(fakeMemento)).toThrow(/Unknown memento class/);
  });

  it('Originator.doSomething should change state', () => {
    const prevState = originator['state'];
    originator.doSomething();
    expect(originator['state']).not.toBe(prevState);
    expect(originator['state'].length).toBe(30);
  });

  it('Caretaker.undo should do nothing if no mementos', () => {
    expect(() => caretaker.undo()).not.toThrow();
  });
});
