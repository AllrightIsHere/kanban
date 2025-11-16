# 📋 Kanban Board - Sistema de Gerenciamento de Tarefas

Sistema completo de gerenciamento de tarefas estilo Kanban, desenvolvido com arquitetura moderna e boas práticas de desenvolvimento.

## 🚀 Tecnologias

### Backend

- **Node.js** com **TypeScript**
- **Express.js** - Framework web
- **Prisma ORM** - Gerenciamento de banco de dados
- **MySQL** - Banco de dados relacional
- **Jest** - Testes unitários
- **Yup** - Validação de dados

### Frontend

- **React 18** com **TypeScript**
- **Vite** - Build tool e dev server
- **@dnd-kit** - Drag and drop
- **Axios** - Cliente HTTP
- **CSS Modules** - Estilização

## 📁 Estrutura do Projeto

```
kanban/
├── backend/          # API REST em Node.js/Express
│   ├── src/
│   │   ├── controllers/    # Controladores das rotas
│   │   ├── routes/         # Definição de rotas
│   │   ├── useCases/       # Lógica de negócio
│   │   ├── domain/         # Entidades e DTOs
│   │   ├── database/       # Prisma e repositórios
│   │   └── config/         # Configurações
│   └── package.json
├── frontend/         # Aplicação React
│   ├── src/
│   │   ├── components/     # Componentes React
│   │   ├── hooks/          # Hooks customizados
│   │   ├── services/       # Serviços de API
│   │   ├── types/          # Tipos TypeScript
│   │   └── utils/          # Utilitários
│   └── package.json
└── README.md
```

## 🛠️ Pré-requisitos

- **Node.js** >= 18.x
- **npm** ou **yarn**
- **Docker** (para MySQL)
- **MySQL** 8.0+ (ou usar Docker)

## 📦 Instalação

### 1. Clone o repositório

```bash
git clone <repository-url>
cd kanban
```

### 2. Configure o Banco de Dados

Execute o MySQL em um container Docker:

```bash
docker run -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=kanban -p 3306:3306 -d mysql --default-authentication-plugin=mysql_native_password
```

Ou configure um MySQL local e atualize as variáveis de ambiente no backend.

### 3. Configure o Backend

```bash
cd backend
npm install

# Configure as variáveis de ambiente (opcional)
# Crie um arquivo .env.local se necessário

# Gere o Prisma Client
npm run prisma:generate

# Execute as migrations
npm run db:migration:create
```

### 4. Configure o Frontend

```bash
cd frontend
npm install
```

## 🚀 Executando a Aplicação

### Desenvolvimento

**Terminal 1 - Backend:**

```bash
cd backend
npm run dev
```

A API estará disponível em `http://localhost:3001`

**Terminal 2 - Frontend:**

```bash
cd frontend
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`

### Produção

**Backend:**

```bash
cd backend
npm run build
npm start
```

**Frontend:**

```bash
cd frontend
npm run build
npm run preview
```

## 📚 Documentação

- [Documentação da API](./API.md) - Endpoints e exemplos da API REST
- [Documentação do Backend](./backend/README.md) - Detalhes da API REST
- [Arquitetura do Backend](./backend/ARCHITECTURE.md) - Estrutura e organização do backend
- [Documentação do Frontend](./frontend/README.md) - Detalhes do frontend React
- [Arquitetura do Frontend](./frontend/ARCHITECTURE.md) - Estrutura e organização do frontend

## 🎯 Funcionalidades

### Quadros (Boards)

- ✅ Criar novos quadros
- ✅ Listar todos os quadros
- ✅ Visualizar quadro específico com colunas e cards

### Colunas (Columns)

- ✅ Criar colunas em um quadro
- ✅ Visualizar todas as colunas de um quadro

### Cards

- ✅ Criar cards em uma coluna
- ✅ Editar cards (título e descrição)
- ✅ Excluir cards
- ✅ Mover cards entre colunas (drag and drop)

## 🔧 Scripts Disponíveis

### Backend

```bash
npm run dev              # Inicia servidor de desenvolvimento
npm run build            # Compila o projeto
npm run test             # Executa testes
npm run lint             # Verifica código com ESLint
npm run lint-fix         # Corrige problemas do ESLint
npm run format           # Formata código com Prettier
npm run db:migration:create  # Cria nova migration
npm run prisma:generate  # Gera Prisma Client
```

### Frontend

```bash
npm run dev              # Inicia servidor de desenvolvimento
npm run build            # Compila para produção
npm run preview          # Preview da build de produção
npm run lint             # Verifica código com ESLint
```

## 🌐 Variáveis de Ambiente

### Backend

Crie um arquivo `.env.local` na pasta `backend/`:

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

### Frontend

O frontend está configurado para fazer proxy das requisições para `http://localhost:3001`. Se necessário, ajuste em `frontend/vite.config.ts`.

## 🧪 Testes

### Backend

```bash
cd backend
npm test                 # Executa todos os testes
npm run coverage         # Gera relatório de cobertura
```

## 📝 Migrations

Para criar uma nova migration:

```bash
cd backend
npm run db:migration:create
```

Sempre que o schema do Prisma for alterado, execute:

```bash
npm run prisma:generate
```

## 🏗️ Arquitetura

### Backend

- **Clean Architecture** com separação de camadas
- **Repository Pattern** para acesso a dados
- **Use Cases** para lógica de negócio
- **DTOs** para transferência de dados
- **Validação** com Yup

### Frontend

- **Component-Based Architecture**
- **Custom Hooks** para lógica reutilizável
- **Separation of Concerns**
- **TypeScript** para type safety

## 👥 Autor

- Gabriel Arrighi - [@AllrightIsHere](https://github.com/AllrightIsHere)
