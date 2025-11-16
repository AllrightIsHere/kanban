# 🚀 Backend API - Kanban Board

API REST desenvolvida em Node.js com Express e TypeScript para gerenciamento de quadros Kanban.

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Tecnologias](#tecnologias)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Executando](#executando)
- [API Endpoints](#api-endpoints)
- [Arquitetura](#arquitetura)
- [Banco de Dados](#banco-de-dados)
- [Testes](#testes)

## 🎯 Visão Geral

API RESTful para gerenciamento de quadros Kanban, permitindo criar e gerenciar quadros, colunas e cards. A API segue os princípios de Clean Architecture e utiliza Prisma ORM para acesso ao banco de dados.

## 🛠️ Tecnologias

- **Node.js** 18+
- **TypeScript** 5.4+
- **Express.js** 4.19+
- **Prisma ORM** 5.15+
- **MySQL** 8.0+
- **Jest** - Testes
- **Yup** - Validação
- **ESLint** - Linter
- **Prettier** - Formatação

## 📁 Estrutura do Projeto

```
backend/
├── src/
│   ├── app.ts                    # Configuração do Express
│   ├── main.ts                   # Ponto de entrada
│   ├── config/                   # Configurações
│   │   └── index.ts              # Configuração do servidor
│   ├── controllers/              # Controladores
│   │   ├── board/                # Controladores de quadros
│   │   ├── column/               # Controladores de colunas
│   │   ├── card/                 # Controladores de cards
│   │   └── middlewares/          # Middlewares
│   ├── routes/                   # Definição de rotas
│   │   ├── boards.ts
│   │   ├── columns.ts
│   │   ├── cards.ts
│   │   └── index.ts
│   ├── useCases/                 # Casos de uso (lógica de negócio)
│   │   ├── board/
│   │   ├── column/
│   │   └── card/
│   ├── domain/                   # Entidades e DTOs
│   │   ├── board/
│   │   ├── column/
│   │   └── card/
│   ├── database/                 # Prisma e repositórios
│   │   └── prisma/
│   │       ├── client.ts
│   │       ├── repositories/     # Implementação dos repositórios
│   │       └── schema/           # Schema do Prisma
│   └── types/                    # Tipos TypeScript
└── package.json
```

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Gerar Prisma Client
npm run prisma:generate
```

## ⚙️ Configuração

### Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do backend:

```env
NODE_ENV=development
SERVER_PORT=3001
TZ=America/Sao_Paulo

MYSQL_HOST=127.0.0.1
MYSQL_PORT=3306
MYSQL_USERNAME=root
MYSQL_PASSWORD=root
MYSQL_DATABASE=kanban
```

### Banco de Dados

Execute o MySQL em Docker:

```bash
docker run -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=kanban -p 3306:3306 -d mysql --default-authentication-plugin=mysql_native_password
```

Execute as migrations:

```bash
npm run db:migration:create
```

## 🚀 Executando

### Desenvolvimento

```bash
npm run dev
```

A API estará disponível em `http://localhost:3001`

### Produção

```bash
npm run build
npm start
```

## 📡 API Endpoints

### Health Check

```
GET /healthz
```

Retorna status da API.

### Boards (Quadros)

#### Criar Quadro

```
POST /boards
Content-Type: application/json

{
  "name": "Nome do Quadro"
}
```

#### Listar Quadros

```
GET /boards
```

#### Buscar Quadro por ID

```
GET /boards/:id
```

#### Criar Coluna em um Quadro

```
POST /boards/:id/columns
Content-Type: application/json

{
  "name": "Nome da Coluna"
}
```

### Columns (Colunas)

#### Criar Card em uma Coluna

```
POST /columns/:id/cards
Content-Type: application/json

{
  "title": "Título do Card",
  "description": "Descrição do Card (opcional)"
}
```

### Cards

#### Atualizar Card

```
PUT /cards/:id
Content-Type: application/json

{
  "title": "Novo Título",
  "description": "Nova Descrição"
}
```

#### Excluir Card

```
DELETE /cards/:id
```

#### Mover Card

```
PATCH /cards/:id/move
Content-Type: application/json

{
  "newColumnId": 2
}
```

## 🏗️ Arquitetura

### Clean Architecture

O projeto segue os princípios de Clean Architecture:

1. **Domain Layer** (`domain/`)
    - Entidades de negócio
    - DTOs (Data Transfer Objects)
    - Interfaces de repositórios

2. **Use Cases Layer** (`useCases/`)
    - Lógica de negócio
    - Orquestração de operações
    - Validações de regras de negócio

3. **Infrastructure Layer** (`database/`, `controllers/`)
    - Implementação de repositórios
    - Controladores HTTP
    - Acesso a dados

4. **Presentation Layer** (`routes/`, `controllers/`)
    - Definição de rotas
    - Validação de entrada
    - Tratamento de erros

### Fluxo de Dados

```
Request → Route → Controller → UseCase → Repository → Database
                ↓
            Response
```

### Padrões Utilizados

- **Repository Pattern**: Abstração do acesso a dados
- **DTO Pattern**: Transferência de dados entre camadas
- **Use Case Pattern**: Encapsulamento da lógica de negócio
- **Middleware Pattern**: Processamento de requisições

## 🗄️ Banco de Dados

### Schema

O banco de dados possui três entidades principais:

- **Board**: Quadros Kanban
- **Column**: Colunas dentro de um quadro
- **Card**: Cards dentro de uma coluna

### Migrations

```bash
# Criar nova migration
npm run db:migration:create

# Aplicar migrations
npm run prisma:migrate-dev

# Gerar Prisma Client após alterações no schema
npm run prisma:generate
```

## 🧪 Testes

```bash
# Executar todos os testes
npm test

# Executar com cobertura
npm run coverage

# Executar em modo watch
npm test -- --watch
```

## 📝 Validação

A validação é feita usando **Yup** nos validators de cada controller:

- Validação de tipos
- Validação de campos obrigatórios
- Validação de formatos

## 🔒 Middlewares

### Access Control Middleware

Middleware aplicado a todas as rotas para controle de acesso.

### Error Handler

Middleware global para tratamento de erros.

### Request Validator

Middleware para validação de requisições usando Yup.

## 🚨 Tratamento de Erros

A API retorna erros padronizados:

- **400**: Bad Request (validação)
- **404**: Not Found
- **500**: Internal Server Error

## 📊 Status Codes

- `200 OK`: Requisição bem-sucedida
- `201 Created`: Recurso criado com sucesso
- `400 Bad Request`: Erro de validação
- `404 Not Found`: Recurso não encontrado
- `500 Internal Server Error`: Erro do servidor

## 🔧 Scripts NPM

```bash
npm run dev              # Desenvolvimento com hot reload
npm run build            # Compilar TypeScript
npm run test             # Executar testes
npm run coverage         # Cobertura de testes
npm run lint             # Verificar código
npm run lint-fix         # Corrigir problemas de lint
npm run format           # Formatar código
npm run db:migration:create  # Criar migration
npm run prisma:generate  # Gerar Prisma Client
```

## 📚 Recursos Adicionais

- [Documentação do Prisma](https://www.prisma.io/docs)
- [Documentação do Express](https://expressjs.com/)
- [Documentação do TypeScript](https://www.typescriptlang.org/docs/)
