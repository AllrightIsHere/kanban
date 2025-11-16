# 🎨 Frontend - Kanban Board

Aplicação React moderna para gerenciamento de tarefas estilo Kanban.

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Tecnologias](#tecnologias)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Instalação](#instalação)
- [Executando](#executando)
- [Funcionalidades](#funcionalidades)
- [Arquitetura](#arquitetura)
- [Componentes](#componentes)

## 🎯 Visão Geral

Interface moderna e responsiva para gerenciamento de quadros Kanban, com funcionalidades de drag-and-drop, criação e edição de cards, e gerenciamento completo de quadros e colunas.

## 🛠️ Tecnologias

- **React** 18.2+
- **TypeScript** 5.2+
- **Vite** 5.0+ - Build tool e dev server
- **@dnd-kit** - Biblioteca de drag and drop
- **Axios** - Cliente HTTP
- **CSS Modules** - Estilização

## 📁 Estrutura do Projeto

```
frontend/
├── src/
│   ├── components/          # Componentes React
│   │   ├── ui/              # Componentes de UI reutilizáveis
│   │   │   ├── Button/
│   │   │   ├── Modal/
│   │   │   ├── Input/
│   │   │   ├── Textarea/
│   │   │   ├── FormField/
│   │   │   ├── Loading/
│   │   │   └── ErrorMessage/
│   │   ├── BoardList/       # Lista de quadros
│   │   ├── BoardView/       # Visualização do quadro
│   │   ├── BoardModal/      # Modal para criar quadro
│   │   ├── Column/          # Componente de coluna
│   │   ├── ColumnModal/     # Modal para criar coluna
│   │   ├── Card/            # Componente de card
│   │   └── CardModal/       # Modal para criar/editar card
│   ├── hooks/               # Hooks customizados
│   │   ├── useBoards.ts     # Lógica de negócio para quadros
│   │   └── useCards.ts      # Lógica de negócio para cards
│   ├── services/            # Serviços de API
│   │   └── api.ts            # Cliente HTTP e serviços
│   ├── types/               # Definições de tipos TypeScript
│   │   ├── board.ts
│   │   ├── column.ts
│   │   ├── card.ts
│   │   └── index.ts
│   ├── constants/           # Constantes da aplicação
│   │   └── index.ts
│   ├── utils/               # Funções utilitárias
│   │   └── errorHandler.ts
│   ├── App.tsx              # Componente principal
│   ├── main.tsx             # Ponto de entrada
│   └── index.css            # Estilos globais
├── package.json
└── vite.config.ts
```

## 📦 Instalação

```bash
# Instalar dependências
npm install
```

## 🚀 Executando

### Desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`

O Vite está configurado para fazer proxy das requisições para o backend em `http://localhost:3001`.

### Produção

```bash
# Build
npm run build

# Preview da build
npm run preview
```

## ✨ Funcionalidades

### Quadros (Boards)

- ✅ Listar todos os quadros
- ✅ Selecionar um quadro para visualizar
- ✅ Criar novos quadros

### Colunas (Columns)

- ✅ Visualizar todas as colunas de um quadro
- ✅ Criar novas colunas em um quadro

### Cards

- ✅ Visualizar cards em cada coluna
- ✅ Criar novos cards
- ✅ Editar cards (título e descrição)
- ✅ Excluir cards
- ✅ Mover cards entre colunas com drag-and-drop

## 🏗️ Arquitetura

### Separação de Responsabilidades

1. **Componentes UI** (`components/ui/`)

   - Componentes reutilizáveis e genéricos
   - Sem lógica de negócio
   - Altamente reutilizáveis

2. **Componentes de Feature** (`components/`)

   - Componentes específicos da aplicação
   - Podem usar componentes UI
   - Contêm lógica de apresentação

3. **Hooks** (`hooks/`)

   - Lógica de negócio reutilizável
   - Gerenciamento de estado
   - Comunicação com serviços

4. **Serviços** (`services/`)

   - Comunicação com API
   - Abstração de chamadas HTTP

5. **Tipos** (`types/`)
   - Definições TypeScript
   - Organizados por domínio

### Fluxo de Dados

```
Component → Hook → Service → API
                ↓
            State Update
                ↓
            Re-render
```

## 🧩 Componentes

### Componentes UI

#### Button

Botão reutilizável com variantes e tamanhos.

```tsx
<Button variant="primary" size="medium" onClick={handleClick}>
  Clique aqui
</Button>
```

**Variantes:** `primary`, `secondary`, `danger`  
**Tamanhos:** `small`, `medium`, `large`

#### Modal

Modal base reutilizável.

```tsx
<Modal isOpen={isOpen} onClose={handleClose} title="Título">
  Conteúdo do modal
</Modal>
```

#### Input / Textarea

Campos de formulário com estilos consistentes.

```tsx
<Input
  type="text"
  value={value}
  onChange={handleChange}
  placeholder="Digite aqui"
/>
```

#### FormField

Wrapper para campos de formulário.

```tsx
<FormField label="Nome" htmlFor="name" required>
  <Input id="name" />
</FormField>
```

#### Loading

Componente de loading.

```tsx
<Loading message="Carregando..." />
```

#### ErrorMessage

Componente para exibir erros.

```tsx
<ErrorMessage message="Erro ao carregar" onDismiss={handleDismiss} />
```

### Componentes de Feature

#### BoardList

Lista de quadros com opção de criar novo.

#### BoardView

Visualização do quadro com colunas e cards, suportando drag-and-drop.

#### Column

Coluna do Kanban que pode receber cards via drag-and-drop.

#### Card

Card arrastável com opções de editar e excluir.

## 🪝 Hooks Customizados

### useBoards

Gerencia estado e operações relacionadas a quadros.

```tsx
const {
  boards,
  selectedBoard,
  loading,
  error,
  loadBoards,
  loadBoard,
  createBoard,
  createColumn,
} = useBoards();
```

### useCards

Gerencia operações relacionadas a cards.

```tsx
const { createCard, updateCard, deleteCard, moveCard } = useCards({
  onSuccess: () => console.log("Sucesso"),
  onError: (error) => console.error(error),
});
```

## 🎨 Estilização

- **CSS Modules**: Estilos scoped por componente
- **Design System**: Componentes UI consistentes
- **Responsivo**: Layout adaptável a diferentes tamanhos de tela

## 🔧 Configuração

### Proxy da API

O Vite está configurado para fazer proxy das requisições:

```typescript
// vite.config.ts
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:3001',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, ''),
    },
  },
}
```

Para alterar a URL da API, edite `vite.config.ts`.

## 📝 Scripts NPM

```bash
npm run dev              # Inicia servidor de desenvolvimento
npm run build            # Compila para produção
npm run preview          # Preview da build de produção
npm run lint             # Verifica código com ESLint
```

## 🧪 Testes

```bash
# Adicionar testes (futuro)
npm test
```

## 📚 Documentação Adicional

- [Arquitetura do Frontend](./ARCHITECTURE.md) - Detalhes da arquitetura
- [Documentação da API](../API.md) - Endpoints da API
- [Documentação do Backend](../backend/README.md) - Detalhes do backend
