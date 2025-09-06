export interface PizzaBuilder {
    reset(): this;
    setDough(dough: string): this;
    setSauce(sauce: string): this;
    setToppings(toppings: string[]): this;
    build(): Pizza;
}

export class Pizza {
    private readonly dough: string;
    private readonly sauce: string;
    private readonly toppings: string[];

    constructor(dough: string, sauce: string, toppings: string[]) {
        this.dough = dough;
        this.sauce = sauce;
        this.toppings = toppings;
    }

    public describe(): string {
        return `Pizza with ${this.dough} dough, ${this.sauce} sauce, and toppings: ${this.toppings.join(', ')}`;
    }
}

export class PizzaBuilderImpl implements PizzaBuilder {
    private dough: string = '';
    private sauce: string = '';
    private toppings: string[] = [];

    constructor() {
        this.reset();
    }

    public reset(): this {
        this.dough = '';
        this.sauce = '';
        this.toppings = [];
        return this;
    }

    public setDough(dough: string): this {
        this.dough = dough;
        return this;
    }

    public setSauce(sauce: string): this {
        this.sauce = sauce;
        return this;
    }

    public setToppings(toppings: string[]): this {
        this.toppings = toppings;
        return this;
    }

    public build(): Pizza {
        return new Pizza(this.dough, this.sauce, [...this.toppings]);
    }
}

export class PizzaDirector {
    public static makeMargheritaPizza(builder: PizzaBuilder): Pizza {
        return builder.reset().setDough('thin crust').setSauce('tomato').setToppings(['mozzarella', 'basil']).build();
    }

    public static makePepperoniPizza(builder: PizzaBuilder): Pizza {
        return builder
            .reset()
            .setDough('thick crust')
            .setSauce('barbecue')
            .setToppings(['mozzarella', 'pepperoni'])
            .build();
    }
}
