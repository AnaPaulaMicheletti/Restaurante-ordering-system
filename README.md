# Restaurante Ordering System API

API REST para um sistema de autoatendimento de restaurante, desenvolvida como APS (Atividade Prática Supervisionada).

1. Descrição do projeto

**Problema:** em restaurantes com autoatendimento, o cliente escolhe os itens sozinho em um totem ou aplicativo. Para isso funcionar, o cardápio precisa estar organizado e ser consultado de forma rápida por qualquer interface.

**Contexto:** a aplicação é o back-end de um sistema de autoatendimento. Ela gerencia o cardápio, que é organizado em **categorias** (ex.: Bebidas, Pizzas, Sobremesas) e **produtos** que pertencem a cada categoria.

**Objetivo da API:** fornecer operações de cadastro, consulta, atualização e remoção (CRUD) de categorias e produtos, com persistência em banco de dados PostgreSQL (Supabase) e pesquisa por palavra-chave.


2. Identificação do estudante
**Nome:** Ana Paula Micheletti


3. Tecnologias utilizadas
- **Node.js**
- **TypeScript**
- **Express**
- **Supabase**
- **PostgreSQL**
- **Git / GitHub**
- **Postman**


4. Entidades e relacionamentos
### Category (Categoria)

Agrupa os produtos do cardápio.

| Atributo | Tipo | Descrição |
|---|---|---|
| `id` | uuid | Identificador único (gerado pelo banco) |
| `name` | texto | Nome da categoria (obrigatório) |
| `description` | texto | Descrição da categoria |
| `icon` | texto | Ícone da categoria |
| `display_order` | inteiro | Ordem de exibição no cardápio (obrigatório) |
| `active` | booleano | Indica se a categoria está ativa (padrão: `true`) |

### Product (Produto)

Item do cardápio que pertence a uma categoria.

| Atributo | Tipo | Descrição |
|---|---|---|
| `id` | uuid | Identificador único (gerado pelo banco) |
| `name` | texto | Nome do produto (obrigatório) |
| `description` | texto | Descrição do produto |
| `icon` | texto | Ícone do produto |
| `display_order` | inteiro | Ordem de exibição no cardápio (obrigatório) |
| `category_id` | uuid | Chave estrangeira para `categories.id` |
| `active` | booleano | Indica se o produto está ativo (padrão: `true`) |

### Relacionamento

```
Category 1 ────── N Product
```

Uma categoria possui vários produtos, e cada produto pertence a uma categoria. A ligação é feita pela coluna `category_id` da tabela `products`.

Não é possível remover uma categoria que ainda possui produtos vinculados, pois a chave estrangeira bloqueia a exclusão.


5. Estrutura do projeto
```
src/
├── config/          # Configuração da conexão com o Supabase
├── controllers/     # Recebem as requisições, validam os dados e devolvem as respostas
├── models/          # Classes das entidades (Category, Product) e suas regras
├── repositories/    # Acesso ao banco de dados (consultas ao Supabase)
├── routes/          # Definição das rotas de cada entidade
├── app.ts           # Criação do app Express e registro das rotas
└── server.ts        # Inicialização do servidor
```

Fluxo de uma requisição: **Route → Controller → Repository → Supabase**.


6. Configuração e execução
### Pré-requisitos

- Node.js instalado
- Um projeto criado no [Supabase](https://supabase.com)

### Passo a passo

```bash
# 1. Clonar o repositório
git clone <url-do-repositorio>
cd restaurante-ordering-system-API

# 2. Instalar as dependências
npm install

# 3. Criar o arquivo .env a partir do exemplo e preencher com suas credenciais
cp .env.example .env

# 4. Criar as tabelas no Supabase (ver seção "Banco de dados")

# 5. Iniciar a aplicação em modo de desenvolvimento
npm run dev
```

O servidor sobe em `http://localhost:3000`. Para confirmar, acesse essa URL no navegador: deve retornar a mensagem `Restaurante Ordering System API`.


7. Variáveis de ambiente
O arquivo `.env` contém as credenciais reais e **não deve ser enviado ao Git** (confirme que `.env` está no `.gitignore`). O repositório inclui o arquivo `.env.example`, com apenas os nomes das variáveis:

```env
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_KEY=sua-chave-do-supabase
```

| Variável | Descrição |
|---|---|
| `SUPABASE_URL` | URL do projeto no Supabase (Project Settings → API), no formato `https://xxxx.supabase.co` |
| `SUPABASE_KEY` | Chave de acesso do projeto (Project Settings → API) |

> Os nomes das variáveis devem ser os mesmos que o arquivo `src/config/supabase.ts` utiliza.


8. Banco de dados
Execute o script abaixo no **SQL Editor** do Supabase para criar a estrutura:

```sql
create table categories (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    description text,
    icon text,
    display_order integer not null,
    active boolean not null default true
);

create table products (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    description text,
    icon text,
    display_order integer not null,
    category_id uuid references categories(id),
    active boolean not null default true
);
```

| Tabela | Chave primária | Chave estrangeira |
|---|---|---|
| `categories` | `id` | n/a |
| `products` | `id` | `category_id` → `categories.id` |


9. Documentação dos endpoints
### Categorias (`/categories`)

| Método | Endpoint | Descrição |
|---|---|---|
| GET | `/categories` | Lista todas as categorias |
| GET | `/categories/:id` | Consulta uma categoria pelo ID |
| GET | `/categories/search/:keyword` | Busca categorias por palavra-chave (nome ou descrição) |
| POST | `/categories` | Cadastra uma categoria |
| PUT | `/categories/:id` | Atualiza uma categoria |
| DELETE | `/categories/:id` | Remove uma categoria |

### Produtos (`/products`)

| Método | Endpoint | Descrição |
|---|---|---|
| GET | `/products` | Lista todos os produtos |
| GET | `/products/:id` | Consulta um produto pelo ID |
| GET | `/products/search/:keyword` | Busca produtos por palavra-chave (nome ou descrição) |
| POST | `/products` | Cadastra um produto |
| PUT | `/products/:id` | Atualiza um produto |
| DELETE | `/products/:id` | Remove um produto |

### Dados das requisições

| Entidade | Campo | Obrigatório | Observação |
|---|---|---|---|
| Category | `name` | Sim | |
| Category | `display_order` | Sim | Número inteiro |
| Category | `description`, `icon` | Não | |
| Product | `name` | Sim | |
| Product | `display_order` | Sim | Número inteiro |
| Product | `category_id` | Não | ID de uma categoria existente |
| Product | `description`, `icon` | Não | |

### Códigos de resposta

| Código | Significado |
|---|---|
| 200 | Operação realizada com sucesso |
| 201 | Registro criado |
| 400 | Dados ou parâmetros não informados |
| 404 | Registro não encontrado |
| 500 | Erro interno do servidor |


10. Exemplos de requisições
### Criar categoria

`POST /categories`

```json
{
  "name": "Pizzas",
  "description": "Pizzas tradicionais e especiais",
  "icon": "🍕",
  "display_order": 1
}
```

### Atualizar categoria

`PUT /categories/:id`

```json
{
  "name": "Pizzas Artesanais",
  "description": "Pizzas tradicionais e especiais, feitas na hora",
  "display_order": 2
}
```

### Criar produto

`POST /products`

```json
{
  "name": "Pizza Margherita",
  "description": "Molho de tomate, mussarela e manjericão",
  "icon": "🍕",
  "display_order": 1,
  "category_id": "id-de-uma-categoria-existente"
}
```

### Atualizar produto

`PUT /products/:id`

```json
{
  "name": "Pizza Margherita Especial",
  "description": "Molho de tomate, mussarela de búfala e manjericão",
  "display_order": 1,
  "category_id": "id-de-uma-categoria-existente",
  "active": true
}
```

### Buscar por palavra-chave

```
GET /products/search/pizza
GET /categories/search/bebida
```
