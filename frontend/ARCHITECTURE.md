# Arquitetura do Frontend

Este documento descreve a estrutura e organização do frontend da aplicação Kanban.

## 📁 Estrutura de Pastas

```
src/
├── components/          # Componentes React
│   ├── ui/              # Componentes de UI reutilizáveis
│   │   ├── Button/
│   │   ├── Modal/
│   │   ├── Input/
│   │   ├── Textarea/
│   │   ├── FormField/
│   │   ├── Loading/
│   │   └── ErrorMessage/
│   ├── BoardList/        # Lista de quadros
│   ├── BoardView/        # Visualização do quadro
│   ├── BoardModal/       # Modal para criar quadro
│   ├── Column/           # Componente de coluna
│   ├── ColumnModal/      # Modal para criar coluna
│   ├── Card/             # Componente de card
│   └── CardModal/        # Modal para criar/editar card
├── hooks/                # Hooks customizados
│   ├── useBoards.ts      # Lógica de negócio para quadros
│   └── useCards.ts       # Lógica de negócio para cards
├── services/             # Serviços de API
│   └── api.ts            # Cliente HTTP e serviços
├── types/                # Definições de tipos TypeScript
│   ├── board.ts
│   ├── column.ts
│   ├── card.ts
│   └── index.ts
├── constants/            # Constantes da aplicação
│   └── index.ts
├── utils/                # Funções utilitárias
│   └── errorHandler.ts
├── App.tsx               # Componente principal
├── main.tsx              # Ponto de entrada
└── index.css             # Estilos globais
```

## 🏗️ Arquitetura

### Separação de Responsabilidades

1. **Componentes UI (`components/ui/`)**

   - Componentes reutilizáveis e genéricos
   - Não contêm lógica de negócio
   - Altamente reutilizáveis

2. **Componentes de Feature (`components/`)**

   - Componentes específicos da aplicação
   - Podem usar componentes UI
   - Contêm lógica de apresentação

3. **Hooks (`hooks/`)**

   - Lógica de negócio reutilizável
   - Gerenciamento de estado
   - Comunicação com serviços

4. **Serviços (`services/`)**

   - Comunicação com API
   - Abstração de chamadas HTTP
   - Tratamento de requisições

5. **Tipos (`types/`)**

   - Definições TypeScript
   - Organizados por domínio
   - Exportados centralmente

6. **Constantes (`constants/`)**

   - Valores fixos da aplicação
   - Mensagens de erro/sucesso
   - Configurações

7. **Utilitários (`utils/`)**
   - Funções auxiliares
   - Helpers genéricos
   - Tratamento de erros

## 🎯 Princípios Aplicados

### 1. Single Responsibility Principle (SRP)

Cada módulo/componente tem uma única responsabilidade:

- `useBoards`: gerencia estado e operações de quadros
- `useCards`: gerencia estado e operações de cards
- Componentes UI: apenas apresentação

### 2. DRY (Don't Repeat Yourself)

- Componentes UI reutilizáveis (Button, Modal, Input, etc.)
- Hooks compartilhados
- Utilitários comuns

### 3. Separation of Concerns

- Lógica de negócio nos hooks
- Apresentação nos componentes
- Comunicação com API nos serviços

### 4. Type Safety

- TypeScript em todo o código
- Tipos organizados por domínio
- Interfaces bem definidas

## 🔄 Fluxo de Dados

```
App.tsx
  ↓
hooks/ (useBoards, useCards)
  ↓
services/api.ts
  ↓
Backend API
```

## 📦 Componentes UI

### Button

Botão reutilizável com variantes (primary, secondary, danger) e tamanhos.

### Modal

Modal base reutilizável com overlay e animações.

### Input/Textarea

Campos de formulário com estilos consistentes.

### FormField

Wrapper para campos de formulário com label e validação.

### Loading

Componente de loading com spinner.

### ErrorMessage

Componente para exibir mensagens de erro.

## 🪝 Hooks Customizados

### useBoards

Gerencia:

- Lista de quadros
- Quadro selecionado
- Operações CRUD de quadros
- Operações de colunas
- Estado de loading e erro

### useCards

Gerencia:

- Operações CRUD de cards
- Callbacks de sucesso/erro
- Tratamento de erros

## 🔧 Melhorias Implementadas

1. ✅ Separação de tipos por domínio
2. ✅ Hooks customizados para lógica de negócio
3. ✅ Componentes UI reutilizáveis
4. ✅ Constantes centralizadas
5. ✅ Tratamento de erros padronizado
6. ✅ Código mais limpo e manutenível
7. ✅ Melhor organização de arquivos
8. ✅ TypeScript bem estruturado
