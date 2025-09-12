import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ConcreteSubject, ConcreteObserverA, ConcreteObserverB } from './observer';

describe('Observer Pattern', () => {
  let subject: ConcreteSubject;
  let observerA: ConcreteObserverA;
  let observerB: ConcreteObserverB;

  beforeEach(() => {
    subject = new ConcreteSubject();
    observerA = new ConcreteObserverA();
    observerB = new ConcreteObserverB();
  });

  it('should attach observers and notify them', () => {
    const spyA = vi.spyOn(observerA, 'update');
    const spyB = vi.spyOn(observerB, 'update');

    subject.attach(observerA);
    subject.attach(observerB);

    subject.state = 1;
    subject.notify();

    expect(spyA).toHaveBeenCalledWith(subject);
    expect(spyB).toHaveBeenCalledWith(subject);
  });

  it('should not attach the same observer twice', () => {
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    subject.attach(observerA);
    subject.attach(observerA);
    expect(logSpy).toHaveBeenCalledWith('Subject: Observer has been attached already.');
    logSpy.mockRestore();
  });

  it('should detach observers', () => {
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    subject.attach(observerA);
    subject.detach(observerA);
    expect(logSpy).toHaveBeenCalledWith('Subject: Detached an observer.');
    logSpy.mockRestore();
  });

  it('should not detach an observer that is not attached', () => {
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    subject.detach(observerA);
    expect(logSpy).toHaveBeenCalledWith('Subject: Observer is not found.');
    logSpy.mockRestore();
  });

  it('ConcreteObserverA should react only if state < 3', () => {
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    subject.attach(observerA);

    subject.state = 2;
    subject.notify();
    expect(logSpy).toHaveBeenCalledWith('ConcreteObserverA: Reacted to the event.');

    logSpy.mockClear();
    subject.state = 3;
    subject.notify();
    expect(logSpy).not.toHaveBeenCalledWith('ConcreteObserverA: Reacted to the event.');

    logSpy.mockRestore();
  });

  it('ConcreteObserverB should react if state === 0 or state >= 2', () => {
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    subject.attach(observerB);

    subject.state = 0;
    subject.notify();
    expect(logSpy).toHaveBeenCalledWith('ConcreteObserverB: Reacted to the event.');

    logSpy.mockClear();
    subject.state = 2;
    subject.notify();
    expect(logSpy).toHaveBeenCalledWith('ConcreteObserverB: Reacted to the event.');

    logSpy.mockClear();
    subject.state = 1;
    subject.notify();
    expect(logSpy).not.toHaveBeenCalledWith('ConcreteObserverB: Reacted to the event.');

    logSpy.mockRestore();
  });

  it('someBusinessLogic should change state and notify observers', () => {
    const notifySpy = vi.spyOn(subject, 'notify');
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    subject.someBusinessLogic();
    expect(typeof subject.state).toBe('number');
    expect(notifySpy).toHaveBeenCalled();
    logSpy.mockRestore();
  });
});
