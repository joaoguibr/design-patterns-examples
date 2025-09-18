export abstract class AbstractClass {
  public templateMethod(): string[] {
    const output: string[] = [];
    output.push(this.abstractOperation1());
    output.push(this.hook1());
    output.push(this.abstractOperation2());
    output.push(this.hook2());
    return output;
  }

  protected abstract abstractOperation1(): string;
  protected abstract abstractOperation2(): string;

  protected hook1(): string {
    return 'Default implementation of hook1';
  }

  protected hook2(): string {
    return 'Default implementation of hook2';
  }
}

export class ConcreteClassA extends AbstractClass {
  protected abstractOperation1(): string {
    return 'ConcreteClassA: Implementation of abstractOperation1';
  }

  protected abstractOperation2(): string {
    return 'ConcreteClassA: Implementation of abstractOperation2';
  }

  protected hook1(): string {
    return 'ConcreteClassA: Overridden hook1';
  }
}

export class ConcreteClassB extends AbstractClass {
  protected abstractOperation1(): string {
    return 'ConcreteClassB: Implementation of abstractOperation1';
  }

  protected abstractOperation2(): string {
    return 'ConcreteClassB: Implementation of abstractOperation2';
  }

  protected hook2(): string {
    return 'ConcreteClassB: Overridden hook2';
  }
}
