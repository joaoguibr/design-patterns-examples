export interface Box {
    getTotalPrice(): number;
}

export class Item implements Box {
    constructor(private readonly price: number) {}

    getTotalPrice(): number {
        return this.price;
    }
}

export class BoxComposite implements Box {
    private items: Box[] = [];

    add(item: Box): this {
        this.items.push(item);
        return this;
    }

    remove(item: Box): this {
        this.items = this.items.filter((i) => i !== item);
        return this;
    }

    getChildren(): Box[] {
        return [...this.items];
    }

    getTotalPrice(): number {
        return this.items.reduce((total, item) => total + item.getTotalPrice(), 0);
    }
}
