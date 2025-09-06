import { describe, it, expect } from 'vitest';
import { PizzaBuilderImpl, PizzaDirector } from './builder';

describe('PizzaBuilder and PizzaDirector', () => {
    it('builds a custom pizza with chaining', () => {
        const builder = new PizzaBuilderImpl();
        const pizza = builder
            .setDough('thin crust')
            .setSauce('tomato')
            .setToppings(['mozzarella', 'basil'])
            .build();

        expect(pizza.describe()).toBe(
            'Pizza with thin crust dough, tomato sauce, and toppings: mozzarella, basil'
        );
    });

    it('reset clears the builder state', () => {
        const builder = new PizzaBuilderImpl();
        builder.setDough('something').setSauce('something').setToppings(['a', 'b']);
        builder.reset();
        const pizza = builder.build();

        expect(pizza.describe()).toBe('Pizza with  dough,  sauce, and toppings: ');
    });

    it('director makes a Margherita pizza', () => {
        const builder = new PizzaBuilderImpl();
        const pizza = PizzaDirector.makeMargheritaPizza(builder);

        expect(pizza.describe()).toBe(
            'Pizza with thin crust dough, tomato sauce, and toppings: mozzarella, basil'
        );
    });

    it('director makes a Pepperoni pizza', () => {
        const builder = new PizzaBuilderImpl();
        const pizza = PizzaDirector.makePepperoniPizza(builder);

        expect(pizza.describe()).toBe(
            'Pizza with thick crust dough, barbecue sauce, and toppings: mozzarella, pepperoni'
        );
    });

    it('pizza is not affected by mutations to the original toppings array after build', () => {
        const builder = new PizzaBuilderImpl();
        const toppings = ['mushroom'];
        builder.setDough('thin crust').setSauce('tomato').setToppings(toppings);

        const pizza = builder.build();
        toppings.push('ham'); // mutate after build

        expect(pizza.describe()).toBe(
            'Pizza with thin crust dough, tomato sauce, and toppings: mushroom'
        );
    });

    it('multiple builds are independent (cloned toppings)', () => {
        const builder = new PizzaBuilderImpl();

        const pizza1 = builder
            .reset()
            .setDough('thin crust')
            .setSauce('tomato')
            .setToppings(['olives'])
            .build();

        const pizza2 = builder
            .reset()
            .setDough('thick crust')
            .setSauce('pesto')
            .setToppings(['artichoke'])
            .build();

        expect(pizza1.describe()).toBe(
            'Pizza with thin crust dough, tomato sauce, and toppings: olives'
        );
        expect(pizza2.describe()).toBe(
            'Pizza with thick crust dough, pesto sauce, and toppings: artichoke'
        );
    });

    it('new builder starts with empty pizza state', () => {
        const builder = new PizzaBuilderImpl();
        const pizza = builder.build();

        expect(pizza.describe()).toBe('Pizza with  dough,  sauce, and toppings: ');
    });
});