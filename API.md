# 📡 Documentação da API - Kanban Board

Documentação completa da API REST para gerenciamento de quadros Kanban.

## 🌐 Base URL

```
http://localhost:3001
```

## 📋 Endpoints

### Health Check

#### Verificar Status da API

```http
GET /healthz
```

**Resposta:**
```
200 OK
I'm healthy
```

---

## 📊 Boards (Quadros)

### Criar Quadro

```http
POST /boards
Content-Type: application/json
```

**Body:**
```json
{
  "name": "Meu Quadro Kanban"
}
```

**Resposta de Sucesso:**
```json
{
  "id": 1,
  "name": "Meu Quadro Kanban",
  "columns": []
}
```

**Status:** `201 Created`

**Erros:**
- `400 Bad Request`: Dados inválidos
- `500 Internal Server Error`: Erro do servidor

---

### Listar Todos os Quadros

```http
GET /boards
```

**Resposta de Sucesso:**
```json
[
  {
    "id": 1,
    "name": "Meu Quadro Kanban",
    "columns": []
  },
  {
    "id": 2,
    "name": "Outro Quadro",
    "columns": []
  }
]
```

**Status:** `200 OK`

---

### Buscar Quadro por ID

```http
GET /boards/:id
```

**Parâmetros:**
- `id` (path): ID do quadro

**Resposta de Sucesso:**
```json
{
  "id": 1,
  "name": "Meu Quadro Kanban",
  "columns": [
    {
      "id": 1,
      "name": "To Do",
      "boardId": 1,
      "cards": [
        {
          "id": 1,
          "title": "Tarefa 1",
          "description": "Descrição da tarefa",
          "columnId": 1
        }
      ]
    }
  ]
}
```

**Status:** `200 OK`

**Erros:**
- `400 Bad Request`: ID inválido
- `404 Not Found`: Quadro não encontrado
- `500 Internal Server Error`: Erro do servidor

---

### Criar Coluna em um Quadro

```http
POST /boards/:id/columns
Content-Type: application/json
```

**Parâmetros:**
- `id` (path): ID do quadro

**Body:**
```json
{
  "name": "Em Progresso"
}
```

**Resposta de Sucesso:**
```json
{
  "id": 2,
  "name": "Em Progresso",
  "boardId": 1
}
```

**Status:** `201 Created`

**Erros:**
- `400 Bad Request`: Dados inválidos ou ID inválido
- `404 Not Found`: Quadro não encontrado
- `500 Internal Server Error`: Erro do servidor

---

## 📑 Columns (Colunas)

### Criar Card em uma Coluna

```http
POST /columns/:id/cards
Content-Type: application/json
```

**Parâmetros:**
- `id` (path): ID da coluna

**Body:**
```json
{
  "title": "Nova Tarefa",
  "description": "Descrição da tarefa (opcional)"
}
```

**Resposta de Sucesso:**
```json
{
  "id": 1,
  "title": "Nova Tarefa",
  "description": "Descrição da tarefa",
  "columnId": 1
}
```

**Status:** `201 Created`

**Erros:**
- `400 Bad Request`: Dados inválidos ou ID inválido
- `404 Not Found`: Coluna não encontrada
- `500 Internal Server Error`: Erro do servidor

---

## 🃏 Cards

### Atualizar Card

```http
PUT /cards/:id
Content-Type: application/json
```

**Parâmetros:**
- `id` (path): ID do card

**Body:**
```json
{
  "title": "Título Atualizado",
  "description": "Descrição atualizada"
}
```

**Nota:** Todos os campos são opcionais. Apenas os campos enviados serão atualizados.

**Resposta de Sucesso:**
```json
{
  "id": 1,
  "title": "Título Atualizado",
  "description": "Descrição atualizada",
  "columnId": 1
}
```

**Status:** `200 OK`

**Erros:**
- `400 Bad Request`: ID inválido
- `404 Not Found`: Card não encontrado
- `500 Internal Server Error`: Erro do servidor

---

### Excluir Card

```http
DELETE /cards/:id
```

**Parâmetros:**
- `id` (path): ID do card

**Resposta de Sucesso:**
```
204 No Content
```

**Status:** `204 No Content`

**Erros:**
- `400 Bad Request`: ID inválido
- `404 Not Found`: Card não encontrado
- `500 Internal Server Error`: Erro do servidor

---

### Mover Card entre Colunas

```http
PATCH /cards/:id/move
Content-Type: application/json
```

**Parâmetros:**
- `id` (path): ID do card

**Body:**
```json
{
  "newColumnId": 2
}
```

**Resposta de Sucesso:**
```json
{
  "id": 1,
  "title": "Tarefa 1",
  "description": "Descrição da tarefa",
  "columnId": 2
}
```

**Status:** `200 OK`

**Erros:**
- `400 Bad Request`: ID inválido ou coluna de destino inválida
- `404 Not Found`: Card ou coluna não encontrados
- `500 Internal Server Error`: Erro do servidor

---

## 🔒 Autenticação

Atualmente, a API não requer autenticação. O middleware de controle de acesso está configurado mas não implementa autenticação.

## 📊 Códigos de Status HTTP

| Código | Descrição |
|--------|-----------|
| 200 | OK - Requisição bem-sucedida |
| 201 | Created - Recurso criado com sucesso |
| 204 | No Content - Requisição bem-sucedida sem conteúdo |
| 400 | Bad Request - Erro de validação ou dados inválidos |
| 404 | Not Found - Recurso não encontrado |
| 500 | Internal Server Error - Erro interno do servidor |

## ⚠️ Tratamento de Erros

A API retorna erros no seguinte formato:

```json
{
  "error": "Mensagem de erro",
  "details": "Detalhes adicionais (opcional)"
}
```

## 📝 Validação

### Board

- `name`: string, obrigatório

### Column

- `name`: string, obrigatório

### Card

- `title`: string, obrigatório
- `description`: string, opcional

### Move Card

- `newColumnId`: number, obrigatório

## 🔄 Exemplos de Uso

### Fluxo Completo: Criar Quadro, Coluna e Card

```bash
# 1. Criar quadro
curl -X POST http://localhost:3001/boards \
  -H "Content-Type: application/json" \
  -d '{"name": "Meu Projeto"}'

# Resposta: {"id": 1, "name": "Meu Projeto", "columns": []}

# 2. Criar coluna no quadro
curl -X POST http://localhost:3001/boards/1/columns \
  -H "Content-Type: application/json" \
  -d '{"name": "To Do"}'

# Resposta: {"id": 1, "name": "To Do", "boardId": 1}

# 3. Criar card na coluna
curl -X POST http://localhost:3001/columns/1/cards \
  -H "Content-Type: application/json" \
  -d '{"title": "Tarefa 1", "description": "Primeira tarefa"}'

# Resposta: {"id": 1, "title": "Tarefa 1", "description": "Primeira tarefa", "columnId": 1}

# 4. Mover card para outra coluna
curl -X PATCH http://localhost:3001/cards/1/move \
  -H "Content-Type: application/json" \
  -d '{"newColumnId": 2}'

# Resposta: {"id": 1, "title": "Tarefa 1", "description": "Primeira tarefa", "columnId": 2}
```

## 🧪 Testando a API

### Usando cURL

```bash
# Health check
curl http://localhost:3001/healthz

# Listar quadros
curl http://localhost:3001/boards

# Criar quadro
curl -X POST http://localhost:3001/boards \
  -H "Content-Type: application/json" \
  -d '{"name": "Teste"}'
```

### Usando Postman

Importe a coleção de endpoints ou crie requisições manualmente seguindo a documentação acima.

## 📚 Recursos Adicionais

- [Documentação do Backend](./backend/README.md)
- [Arquitetura do Backend](./backend/ARCHITECTURE.md)

