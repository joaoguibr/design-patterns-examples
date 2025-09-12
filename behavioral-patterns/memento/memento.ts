export class Originator {
  private state: string;

  constructor(state: string) {
    this.state = state;
    console.log(`Originator: My initial state is: ${state}`);
  }

  public doSomething(): void {
    console.log("Originator: I'm doing something important.");
    this.state = this.generateRandomString(30);
    console.log(`Originator: and my state has changed to: ${this.state}`);
  }

  private generateRandomString(length: number = 10): string {
    const charSet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return Array.from({ length }, () => charSet[Math.floor(Math.random() * charSet.length)]).join(
      ''
    );
  }

  public save(): Memento {
    return new ConcreteMemento(this.state);
  }

  public restore(memento: Memento): void {
    if (!(memento instanceof ConcreteMemento)) {
      throw new Error('Unknown memento class ' + memento.constructor.name);
    }
    this.state = memento.getState();
    console.log(`Originator: My state has changed to: ${this.state}`);
  }
}

export interface Memento {
  getState(): string;
  getName(): string;
  getDate(): string;
}

export class ConcreteMemento implements Memento {
  private readonly state: string;
  private readonly date: string;

  constructor(state: string) {
    this.state = state;
    this.date = new Date().toISOString().slice(0, 19).replace('T', ' ');
  }

  public getState(): string {
    return this.state;
  }

  public getName(): string {
    return `${this.date} / ${this.state.substring(0, 9)}...`;
  }

  public getDate(): string {
    return this.date;
  }
}

export class Caretaker {
  private readonly mementos: Memento[] = [];
  private readonly originator: Originator;

  constructor(originator: Originator) {
    this.originator = originator;
  }

  public backup(): void {
    this.mementos.push(this.originator.save());
  }

  public undo(): void {
    const memento: Memento | undefined = this.mementos.pop();

    if (memento === undefined) return;

    this.originator.restore(memento);
  }

  public showHistory(): string[] {
    return this.mementos.map((e) => e.getName());
  }
}
