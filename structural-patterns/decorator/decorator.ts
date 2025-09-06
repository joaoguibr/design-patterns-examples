export interface Pizza {
    price(): number;
    description(): string;
}

export class Margherita implements Pizza {
    price(): number {
        return 6.0;
    }

    description(): string {
        return 'A delicious Margherita pizza';
    }
}

abstract class PizzaDecorator implements Pizza {
    constructor(protected readonly pizza: Pizza) {}

    price(): number {
        return this.pizza.price();
    }

    description(): string {
        return this.pizza.description();
    }
}

export class CheeseExtra extends PizzaDecorator {
    price(): number {
        return super.price() + 1.5;
    }

    description(): string {
        return super.description() + ', with extra cheese';
    }
}

export class Bacon extends PizzaDecorator {
    price(): number {
        return super.price() + 2.0;
    }

    description(): string {
        return super.description() + ', with bacon';
    }
}

export class Olive extends PizzaDecorator {
    price(): number {
        return super.price() + 1.0;
    }

    description(): string {
        return super.description() + ', with olives';
    }
}
