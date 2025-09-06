## Exemplos de Design Patterns

Este repositório contém exemplos didáticos de vários design patterns em TypeScript, organizados por categoria (creational e structural).

Cada padrão tem uma implementação simples e um arquivo de teste correspondente usando Vitest.

## Estrutura

-   `creational-patterns/` — exemplos de padrões criacionais (factory, builder, singleton, prototype, abstract-factory)
-   `structural-patterns/` — exemplos de padrões estruturais (adapter, bridge, composite, decorator, facade, flyweight, proxy)

Dentro de cada pasta de padrão há pelo menos dois arquivos: a implementação (`*.ts`) e o teste (`*.test.ts`).

## Requisitos

-   Node.js (recomendo v18+)
-   npm (ou outro gerenciador compatível)

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

-   `creational-patterns/factory/factory.ts` — exemplo do Factory
-   `creational-patterns/builder/builder.ts` — exemplo do Builder
-   `creational-patterns/singleton/singleton.ts` — exemplo do Singleton
-   `creational-patterns/prototype/prototype.ts` — exemplo do Prototype
-   `creational-patterns/abstract-factory/abstract-factory.ts` — exemplo do Abstract Factory

-   `structural-patterns/adapter/adapter.ts` — exemplo do Adapter
-   `structural-patterns/bridge/bridge.ts` — exemplo do Bridge
-   `structural-patterns/composite/composite.ts` — exemplo do Composite
-   `structural-patterns/decorator/decorator.ts` — exemplo do Decorator
-   `structural-patterns/facade/facade.ts` — exemplo do Facade
-   `structural-patterns/flyweight/flyweight.ts` — exemplo do Flyweight
-   `structural-patterns/proxy/proxy.ts` — exemplo do Proxy

## Observações

-   Os exemplos são educativos e focam em demonstrar a ideia do padrão, não em produção.
