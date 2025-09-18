## Exemplos de Design Patterns

Este repositório contém exemplos didáticos de vários design patterns em TypeScript, organizados por categoria (creational, structural e behavioral).

Cada padrão tem uma implementação simples e um arquivo de teste correspondente usando Vitest.

## Estrutura

- `creational-patterns/` — exemplos de padrões criacionais (factory, builder, singleton, prototype, abstract-factory)
- `structural-patterns/` — exemplos de padrões estruturais (adapter, bridge, composite, decorator, facade, flyweight, proxy)
- `behavioral-patterns/` — exemplos de padrões comportamentais (observer, iterator, strategy, state, command, mediator, memento, template-method, visitor, chain-of-responsibility)

Dentro de cada pasta de padrão há pelo menos dois arquivos: a implementação (`*.ts`) e o teste (`*.test.ts`).

## Requisitos

- Node.js (recomendo v18+)
- npm (ou outro gerenciador compatível)

## Instalação

No terminal (shell zsh):

```bash
npm install
```

## Rodar todos os testes

O projeto usa Vitest. Para executar todos os testes:

```bash
npm test
```

## Rodar um arquivo de teste específico

Você pode rodar um único arquivo de teste passando o caminho para o Vitest. Exemplo:

```bash
npm test -- creational-patterns/factory/factory.test.ts
```

Ou usando o executável do Vitest diretamente:

```bash
npx vitest run creational-patterns/factory/factory.test.ts
```

## Lista rápida de arquivos úteis

- `creational-patterns/factory/factory.ts` — exemplo do Factory
- `creational-patterns/builder/builder.ts` — exemplo do Builder
- `creational-patterns/singleton/singleton.ts` — exemplo do Singleton
- `creational-patterns/prototype/prototype.ts` — exemplo do Prototype
- `creational-patterns/abstract-factory/abstract-factory.ts` — exemplo do Abstract Factory

- `structural-patterns/adapter/adapter.ts` — exemplo do Adapter
- `structural-patterns/bridge/bridge.ts` — exemplo do Bridge
- `structural-patterns/composite/composite.ts` — exemplo do Composite
- `structural-patterns/decorator/decorator.ts` — exemplo do Decorator
- `structural-patterns/facade/facade.ts` — exemplo do Facade
- `structural-patterns/flyweight/flyweight.ts` — exemplo do Flyweight
- `structural-patterns/proxy/proxy.ts` — exemplo do Proxy

- `behavioral-patterns/observer/observer.ts` — exemplo do Observer
- `behavioral-patterns/observer/observer.test.ts` — teste do Observer
- `behavioral-patterns/iterator/iterator.ts` — exemplo do Iterator
- `behavioral-patterns/iterator/iterator.test.ts` — teste do Iterator
- `behavioral-patterns/strategy/strategy.ts` — exemplo do Strategy
- `behavioral-patterns/strategy/strategy.test.ts` — teste do Strategy
- `behavioral-patterns/state/state.ts` — exemplo do State
- `behavioral-patterns/state/state.test.ts` — teste do State
- `behavioral-patterns/command/command.ts` — exemplo do Command
- `behavioral-patterns/command/command.test.ts` — teste do Command
- `behavioral-patterns/mediator/mediator.ts` — exemplo do Mediator
- `behavioral-patterns/mediator/mediator.test.ts` — teste do Mediator
- `behavioral-patterns/memento/memento.ts` — exemplo do Memento
- `behavioral-patterns/memento/memento.test.ts` — teste do Memento
- `behavioral-patterns/template-method/template-method.ts` — exemplo do Template Method
- `behavioral-patterns/template-method/template-method.test.ts` — teste do Template Method
- `behavioral-patterns/visitor/visitor.ts` — exemplo do Visitor
- `behavioral-patterns/visitor/visitor.test.ts` — teste do Visitor
- `behavioral-patterns/chain-of-responsiblity/chain-of-responsibilty.ts` — exemplo do Chain of Responsibility
- `behavioral-patterns/chain-of-responsiblity/chain-of-responsibilty.test.ts` — teste do Chain of Responsibility

## Observações

- Os exemplos são educativos e focam em demonstrar a ideia do padrão, não em produção.
