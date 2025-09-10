export interface Iterator<T> {
  next(): T | null;
  hasNext(): boolean;
}

export interface IterableCollection<T> {
  createIterator(): Iterator<T>;
}

export class NumberCollection implements IterableCollection<number> {
  private readonly items: number[] = [];

  public addItem(item: number): void {
    this.items.push(item);
  }

  public createIterator(): Iterator<number> {
    return new NumberIterator(this.items);
  }
}

export class NumberIterator implements Iterator<number> {
  private position: number = 0;

  constructor(private readonly collection: number[]) {}

  public next(): number | null {
    if (this.hasNext()) {
      return this.collection[this.position++];
    }
    return null;
  }

  public hasNext(): boolean {
    return this.position < this.collection.length;
  }
}
