export interface Shape {
  clone(): Shape;
}

export class Circle implements Shape {
    public radius: number;

    public constructor(radius: number) {
        this.radius = radius;
    }

    public toString(): string {
        return `Circle with radius: ${this.radius}`;
    }

    public clone(): Shape {
        return new Circle(this.radius);
    }
}

export class Rectangle implements Shape {
    public width: number;
    public height: number;

    public constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    public toString(): string {
        return `Rectangle with width: ${this.width} and height: ${this.height}`;
    }

    public clone(): Shape {
        return new Rectangle(this.width, this.height);
    }
}
