# 🏗️ Arquitetura do Backend

Este documento detalha a arquitetura e organização do backend da aplicação Kanban.

## 📐 Visão Geral da Arquitetura

O backend segue os princípios de **Clean Architecture** e **Domain-Driven Design (DDD)**, garantindo:

- Separação clara de responsabilidades
- Testabilidade
- Manutenibilidade
- Escalabilidade
- Independência de frameworks

## 🎯 Camadas da Aplicação

### 1. Domain Layer (`src/domain/`)

Camada mais interna, contém a lógica de negócio pura.

**Estrutura:**
```
domain/
├── board/
│   ├── entity.ts      # Entidade Board
│   ├── dto.ts         # DTOs relacionados a Board
│   ├── repository.ts  # Interface do repositório
│   └── index.ts
├── column/
└── card/
```

**Responsabilidades:**
- Definir entidades de negócio
- Definir interfaces de repositórios
- Definir DTOs (Data Transfer Objects)
- Regras de negócio puras

**Exemplo:**
```typescript
// domain/board/entity.ts
export interface Board {
  id: number;
  name: string;
  columns?: Column[];
}

// domain/board/repository.ts
export interface BoardRepository {
  create(data: CreateBoardDTO): Promise<Board>;
  findAll(): Promise<Board[]>;
  findById(id: number): Promise<Board | null>;
}
```

### 2. Use Cases Layer (`src/useCases/`)

Contém a lógica de negócio e orquestração de operações.

**Estrutura:**
```
useCases/
├── board/
│   ├── create-board.ts
│   ├── find-all-boards.ts
│   ├── find-board-by-id.ts
│   └── index.ts
├── column/
└── card/
```

**Responsabilidades:**
- Implementar casos de uso
- Orquestrar chamadas aos repositórios
- Aplicar regras de negócio
- Validar dados de entrada

**Exemplo:**
```typescript
// useCases/board/create-board.ts
export function makeCreateBoard(
  create: BoardRepository["create"]
) {
  return async function createBoard(data: CreateBoardDTO): Promise<Board> {
    // Lógica de negócio
    return await create(data);
  };
}
```

### 3. Infrastructure Layer (`src/database/`)

Implementa as interfaces definidas na camada de domínio.

**Estrutura:**
```
database/
└── prisma/
    ├── client.ts
    ├── repositories/
    │   ├── board/
    │   ├── column/
    │   └── card/
    └── schema/
        └── schema.prisma
```

**Responsabilidades:**
- Implementar repositórios
- Acesso ao banco de dados via Prisma
- Mapeamento entre entidades e modelos do banco

**Exemplo:**
```typescript
// database/prisma/repositories/board/index.ts
export function makeBoardRepository(
  model = boardModel
): BoardRepository {
  return {
    create: async (data) => {
      // Implementação usando Prisma
    },
    // ...
  };
}
```

### 4. Presentation Layer (`src/controllers/`, `src/routes/`)

Camada mais externa, lida com HTTP e validação de entrada.

**Estrutura:**
```
controllers/
├── board/
│   ├── create/
│   │   ├── controller.ts
│   │   ├── validator.ts
│   │   └── index.ts
│   └── index.ts
└── middlewares/
    ├── error-handler.ts
    ├── request-validator.ts
    └── access-control-middleware.ts

routes/
├── boards.ts
├── columns.ts
├── cards.ts
└── index.ts
```

**Responsabilidades:**
- Receber requisições HTTP
- Validar dados de entrada (Yup)
- Chamar use cases
- Retornar respostas HTTP
- Tratar erros

**Exemplo:**
```typescript
// controllers/board/create/controller.ts
export async function create(req: BoardCreateRequest, res: Response) {
  const createDTO = req.body;
  const board = await createBoard(createDTO);
  return res.status(ConstStatusCode.created).send(board);
}
```

## 🔄 Fluxo de Dados

```
HTTP Request
    ↓
Route (routes/boards.ts)
    ↓
Middleware (Validação, Access Control)
    ↓
Controller (controllers/board/create/controller.ts)
    ↓
Use Case (useCases/board/create-board.ts)
    ↓
Repository (database/prisma/repositories/board/)
    ↓
Database (MySQL via Prisma)
    ↓
Response (HTTP)
```

## 📦 Padrões de Design

### Repository Pattern

Abstrai o acesso a dados, permitindo trocar a implementação sem afetar a lógica de negócio.

```typescript
// Interface no domain
interface BoardRepository {
  create(data: CreateBoardDTO): Promise<Board>;
}

// Implementação no infrastructure
function makeBoardRepository(): BoardRepository {
  return {
    create: async (data) => {
      // Implementação com Prisma
    }
  };
}
```

### Use Case Pattern

Encapsula a lógica de negócio em funções reutilizáveis.

```typescript
function makeCreateBoard(create: BoardRepository["create"]) {
  return async function createBoard(data: CreateBoardDTO) {
    // Lógica de negócio
    return await create(data);
  };
}
```

### DTO Pattern

Objetos para transferência de dados entre camadas.

```typescript
export type CreateBoardDTO = Omit<Board, "id" | "columns">;
```

### Dependency Injection

Use cases recebem dependências como parâmetros.

```typescript
const createBoard = makeCreateBoard(boardRepository.create);
```

## 🛡️ Validação

### Validação de Entrada

Usando **Yup** nos validators:

```typescript
// controllers/board/create/validator.ts
export const bodySchema = yup.object({
  name: yup.string().required(),
});
```

### Middleware de Validação

```typescript
// middlewares/request-validator.ts
export function createValidatorMiddleware(schemas, context) {
  return async (req, res, next) => {
    // Validação usando Yup
  };
}
```

## 🔒 Segurança

### Access Control Middleware

Middleware aplicado a todas as rotas para controle de acesso.

### Error Handling

Tratamento centralizado de erros:

```typescript
// middlewares/error-handler.ts
export default function errorHandler(err, req, res, next) {
  // Tratamento de erros
}
```

## 🧪 Testabilidade

A arquitetura facilita testes:

- **Unit Tests**: Testar use cases isoladamente
- **Integration Tests**: Testar repositórios com banco de dados
- **E2E Tests**: Testar rotas completas

## 📊 Estrutura de Dados

### Entidades

- **Board**: Quadro Kanban
- **Column**: Coluna dentro de um quadro
- **Card**: Card dentro de uma coluna

### Relacionamentos

```
Board 1:N Column
Column 1:N Card
```

## 🚀 Escalabilidade

A arquitetura permite:

- Adicionar novos use cases facilmente
- Trocar implementação de repositórios
- Adicionar novos endpoints
- Implementar cache
- Adicionar filas de processamento

## 📝 Convenções

### Nomenclatura

- **Controllers**: `create`, `findAll`, `findById`
- **Use Cases**: `makeCreateBoard`, `makeFindAllBoards`
- **Repositories**: `makeBoardRepository`
- **DTOs**: `CreateBoardDTO`, `UpdateCardDTO`

### Organização de Arquivos

Cada feature tem sua própria pasta com:
- `controller.ts`: Lógica do controller
- `validator.ts`: Validação com Yup
- `index.ts`: Exportações

## 🔄 Ciclo de Vida de uma Requisição

1. **Request** chega no Express
2. **Route** direciona para o controller correto
3. **Middleware** valida e processa
4. **Controller** extrai dados e chama use case
5. **Use Case** executa lógica de negócio
6. **Repository** acessa banco de dados
7. **Response** é retornada ao cliente

## 📚 Boas Práticas

1. ✅ Separação de responsabilidades
2. ✅ Dependências apontam para dentro (Domain não depende de nada)
3. ✅ Interfaces no domain, implementações no infrastructure
4. ✅ Validação na camada de apresentação
5. ✅ Lógica de negócio nos use cases
6. ✅ Tratamento de erros centralizado
7. ✅ TypeScript em todo o código
8. ✅ Código testável

## 🎯 Princípios SOLID

- **S**ingle Responsibility: Cada classe/função tem uma responsabilidade
- **O**pen/Closed: Aberto para extensão, fechado para modificação
- **L**iskov Substitution: Interfaces podem ser substituídas
- **I**nterface Segregation: Interfaces específicas
- **D**ependency Inversion: Depender de abstrações, não implementações

