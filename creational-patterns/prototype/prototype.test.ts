import { describe, it, expect } from "vitest";
import { Circle, Rectangle } from "./prototype";

describe("Prototype Pattern - Shapes", (): void => {
  it("should clone a Circle and create a different object", (): void => {
    const circle = new Circle(5);
    const clonedCircle = circle.clone() as Circle;

    expect(clonedCircle).not.toBe(circle);
    expect(clonedCircle.radius).toBe(5);
  });

  it("should clone a Rectangle and create a different object", () => {
    const rectangle = new Rectangle(10, 20);
    const clonedRectangle = rectangle.clone() as Rectangle;

    expect(clonedRectangle).not.toBe(rectangle);
    expect(clonedRectangle.width).toBe(10);
    expect(clonedRectangle.height).toBe(20);
  });

  it("modifying the clone should not affect the original", () => {
    const rectangle = new Rectangle(10, 20);
    const clonedRectangle = rectangle.clone() as Rectangle;

    clonedRectangle.width = 30;
    clonedRectangle.height = 40;

    expect(rectangle.width).toBe(10);
    expect(rectangle.height).toBe(20);
    expect(clonedRectangle.width).toBe(30);
    expect(clonedRectangle.height).toBe(40);
  });

  it("toString should return correct descriptions", () => {
    const circle = new Circle(7);
    const rectangle = new Rectangle(15, 25);

    expect(circle.toString()).toBe("Circle with radius: 7");
    expect(rectangle.toString()).toBe("Rectangle with width: 15 and height: 25");
  });
});
