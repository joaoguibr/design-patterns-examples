export interface Component {
  accept(visitor: Visitor): string;
}

export class ConcreteComponentA implements Component {
  public accept(visitor: Visitor): string {
    return visitor.visitConcreteComponentA(this);
  }

  public exclusiveMethodOfConcreteComponentA(): string {
    return 'A';
  }
}

export class ConcreteComponentB implements Component {
  public accept(visitor: Visitor): string {
    return visitor.visitConcreteComponentB(this);
  }

  public specialMethodOfConcreteComponentB(): string {
    return 'B';
  }
}

interface Visitor {
  visitConcreteComponentA(element: ConcreteComponentA): string;

  visitConcreteComponentB(element: ConcreteComponentB): string;
}

export class ConcreteVisitor1 implements Visitor {
  public visitConcreteComponentA(element: ConcreteComponentA): string {
    return `${element.exclusiveMethodOfConcreteComponentA()} + ConcreteVisitor1`;
  }

  public visitConcreteComponentB(element: ConcreteComponentB): string {
    return `${element.specialMethodOfConcreteComponentB()} + ConcreteVisitor1`;
  }
}

export class ConcreteVisitor2 implements Visitor {
  public visitConcreteComponentA(element: ConcreteComponentA): string {
    return `${element.exclusiveMethodOfConcreteComponentA()} + ConcreteVisitor2`;
  }

  public visitConcreteComponentB(element: ConcreteComponentB): string {
    return `${element.specialMethodOfConcreteComponentB()} + ConcreteVisitor2`;
  }
}
