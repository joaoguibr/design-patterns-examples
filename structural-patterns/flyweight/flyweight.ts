export class TreeType {
    constructor(public readonly name: string, public readonly texture: string, public readonly color: string) {}

    draw(x: number, y: number) {
        return `Desenhando ${this.name} (${this.texture}) em (${x},${y}) cor=${this.color}`;
    }
}

export class TreeFactory {
    private readonly types = new Map<string, TreeType>();

    getType(name: string, texture: string, color: string): TreeType {
        const key = `${name}_${texture}_${color}`;
        let t = this.types.get(key);
        if (!t) {
            t = new TreeType(name, texture, color);
            this.types.set(key, t);
        }

        return t;
    }

    getTypesCount(): number {
        return this.types.size;
    }
}

export class Tree {
    constructor(public x: number, public y: number, public type: TreeType) {}

    draw(): string {
        return this.type.draw(this.x, this.y);
    }
}
