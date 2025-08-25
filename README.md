# API Tudo na Sacola

API RESTful desenvolvida em Node.js para gerenciamento de listas de compras, permitindo organizar itens, marcar como comprados e acompanhar o valor total.

O nome **Tudo na Sacola** foi escolhido através de uma votação popular, envolvendo usuários e colaboradores do projeto.

A API está atualmente alocada e rodando no [Render](https://render.com).

---

## Funcionalidades
### Owners
* [x] Middleware para controle de propriedade (owner) das listas e itens

### Listas
* [x] Criação, leitura e exclusão de listas de compras
* [x] atualização do nome da lista
* [x] flag como lista favorita
* [x] flag como arquivada
* [x] deletar todas as listas criadas

### Items
* [x] Adição e remoção de itens em listas
* [x] Marcar itens como comprados (done)
* [x] Relação muitos-para-muitos entre listas e itens

### Comaprtilhamento com permissoes
* [] trabalhando nisso

---

## Tecnologias

- Node.js
- Express
- Banco de dados PostgreSQL
- Cors
- dotenv
- uuid

```
sql
CREATE DATABASE tudonasacola;
-- Drop tables if they exist (ordem importa por causa das FKs)
DROP TABLE IF EXISTS list_items CASCADE;
DROP TABLE IF EXISTS list_shares CASCADE;
DROP TABLE IF EXISTS items CASCADE;
DROP TABLE IF EXISTS lists CASCADE;
DROP TABLE IF EXISTS owners CASCADE;

-- Tabela: owners
CREATE TABLE IF NOT EXISTS owners (
    id UUID PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_active TIMESTAMP
);

-- Tabela: lists
CREATE TABLE IF NOT EXISTS lists (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    is_archived BOOLEAN DEFAULT FALSE,
    is_favorite BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    owner_id UUID NOT NULL REFERENCES owners(id) ON DELETE CASCADE
);

-- Tabela: list_shares
CREATE TABLE IF NOT EXISTS list_shares (
    id SERIAL PRIMARY KEY,
    list_id INTEGER NOT NULL REFERENCES lists(id) ON DELETE CASCADE,
    token VARCHAR(255) NOT NULL,
    permission VARCHAR(10) NOT NULL CHECK (permission IN ('read', 'edit')),
    expires_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela: items
CREATE TABLE IF NOT EXISTS items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela: list_items
CREATE TABLE IF NOT EXISTS list_items (
    list_id INTEGER NOT NULL REFERENCES lists(id) ON DELETE CASCADE,
    item_id INTEGER NOT NULL REFERENCES items(id) ON DELETE CASCADE,
    price NUMERIC(10,2),
    amount VARCHAR(50),
    done BOOLEAN DEFAULT FALSE,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (list_id, item_id)
);

```

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/tudo-na-sacola.git
cd tudo-na-sacola
