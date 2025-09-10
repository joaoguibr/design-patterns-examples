export interface Command {
  execute(): void;
}

export class SimpleCommand implements Command {
  private readonly payload: string;

  constructor(payload: string) {
    this.payload = payload;
  }

  execute(): void {
    console.log(`SimpleCommand: Executing simple command with payload: ${this.payload}`);
  }
}

export class ComplexCommand implements Command {
  private readonly receiver: Receiver;
  private readonly a: string;
  private readonly b: string;

  constructor(receiver: Receiver, a: string, b: string) {
    this.receiver = receiver;
    this.a = a;
    this.b = b;
  }

  execute(): void {
    console.log('ComplexCommand: Delegating complex command to receiver.');
    this.receiver.doSomething(this.a);
    this.receiver.doSomethingElse(this.b);
  }
}

export class Receiver {
  public doSomething(a: string): void {
    console.log(`Receiver: Working on (${a}.)`);
  }

  public doSomethingElse(b: string): void {
    console.log(`Receiver: Also working on (${b}.)`);
  }
}

export class Invoker {
  private onStart: Command | null = null;
  private onFinish: Command | null = null;

  public setOnStart(command: Command): void {
    this.onStart = command;
  }

  public setOnFinish(command: Command): void {
    this.onFinish = command;
  }

  public doSomethingImportant(): void {
    console.log('Invoker: Does anybody want something done before I begin?');
    if (this.isCommand(this.onStart)) {
      this.onStart!.execute();
    }

    console.log('Invoker: ...doing something really important...');

    console.log('Invoker: Does anybody want something done after I finish?');
    if (this.isCommand(this.onFinish)) {
      this.onFinish!.execute();
    }
  }

  private isCommand(command: Command | null): boolean {
    return command?.execute !== undefined;
  }
}
