export interface State {
  publish(message: string): string;
}

export class ConcreteStateA implements State {
  publish(message: string): string {
    return `ConcreteStateA published: ${message}`;
  }
}

export class ConcreteStateB implements State {
  publish(message: string): string {
    return `ConcreteStateB published: ${message}`;
  }
}

export class Context {
  private state: State;

  constructor(state: State) {
    this.state = state;
  }

  setState(state: State): void {
    this.state = state;
  }

  request(message: string): string {
    return this.state.publish(message);
  }
}
