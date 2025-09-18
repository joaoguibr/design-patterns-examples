export interface Strategy {
  execute(a: number, b: number): number;
}

export class AdditionStrategy implements Strategy {
  execute(a: number, b: number): number {
    return a + b;
  }
}

export class SubtractionStrategy implements Strategy {
  execute(a: number, b: number): number {
    return a - b;
  }
}

export class MultiplicationStrategy implements Strategy {
  execute(a: number, b: number): number {
    return a * b;
  }
}

export class DivisionStrategy implements Strategy {
  execute(a: number, b: number): number {
    if (b === 0) {
      throw new Error('Division by zero is not allowed.');
    }
    return a / b;
  }
}

export class Context {
  private strategy: Strategy;

  constructor(strategy: Strategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy: Strategy) {
    this.strategy = strategy;
  }

  executeStrategy(a: number, b: number): number {
    return this.strategy.execute(a, b);
  }
}
