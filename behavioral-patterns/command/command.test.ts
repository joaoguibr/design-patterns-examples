import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { SimpleCommand, ComplexCommand, Receiver, Invoker, Command } from './command';

describe('SimpleCommand', () => {
  it('should call console.log with the correct payload when executed', () => {
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const payload = 'test-payload';
    const command = new SimpleCommand(payload);

    command.execute();

    expect(logSpy).toHaveBeenCalledWith(
      `SimpleCommand: Executing simple command with payload: ${payload}`
    );
    logSpy.mockRestore();
  });
});

describe('ComplexCommand', () => {
  let receiver: Receiver;
  let doSomethingSpy: ReturnType<typeof vi.spyOn>;
  let doSomethingElseSpy: ReturnType<typeof vi.spyOn>;
  let logSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    receiver = new Receiver();
    doSomethingSpy = vi.spyOn(receiver, 'doSomething');
    doSomethingElseSpy = vi.spyOn(receiver, 'doSomethingElse');
    logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  it('should delegate actions to the receiver and log appropriately', () => {
    const a = 'foo';
    const b = 'bar';
    const command = new ComplexCommand(receiver, a, b);

    command.execute();

    expect(logSpy).toHaveBeenCalledWith('ComplexCommand: Delegating complex command to receiver.');
    expect(doSomethingSpy).toHaveBeenCalledWith(a);
    expect(doSomethingElseSpy).toHaveBeenCalledWith(b);

    logSpy.mockRestore();
    doSomethingSpy.mockRestore();
    doSomethingElseSpy.mockRestore();
  });
});

describe('Receiver', () => {
  it('should log when doSomething is called', () => {
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const receiver = new Receiver();
    receiver.doSomething('abc');
    expect(logSpy).toHaveBeenCalledWith('Receiver: Working on (abc.)');
    logSpy.mockRestore();
  });

  it('should log when doSomethingElse is called', () => {
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const receiver = new Receiver();
    receiver.doSomethingElse('xyz');
    expect(logSpy).toHaveBeenCalledWith('Receiver: Also working on (xyz.)');
    logSpy.mockRestore();
  });
});

describe('Invoker', () => {
  let invoker: Invoker;
  let logSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    invoker = new Invoker();
    logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    logSpy.mockRestore();
  });

  it('should execute onStart and onFinish commands in order', () => {
    const onStart = { execute: vi.fn() } as Command;
    const onFinish = { execute: vi.fn() } as Command;

    invoker.setOnStart(onStart);
    invoker.setOnFinish(onFinish);

    invoker.doSomethingImportant();

    expect(logSpy).toHaveBeenCalledWith(
      'Invoker: Does anybody want something done before I begin?'
    );
    expect(onStart.execute).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledWith('Invoker: ...doing something really important...');
    expect(logSpy).toHaveBeenCalledWith(
      'Invoker: Does anybody want something done after I finish?'
    );
    expect(onFinish.execute).toHaveBeenCalled();
  });

  it('should not fail if onStart and onFinish are not set', () => {
    expect(() => invoker.doSomethingImportant()).not.toThrow();
    expect(logSpy).toHaveBeenCalledWith(
      'Invoker: Does anybody want something done before I begin?'
    );
    expect(logSpy).toHaveBeenCalledWith('Invoker: ...doing something really important...');
    expect(logSpy).toHaveBeenCalledWith(
      'Invoker: Does anybody want something done after I finish?'
    );
  });
});
