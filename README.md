# API Tudo na Sacola

API RESTful desenvolvida em Node.js para gerenciamento de listas de compras, permitindo organizar itens, marcar como comprados e acompanhar o valor total.

O nome **Tudo na Sacola** foi escolhido através de uma votação popular, envolvendo usuários e colaboradores do projeto.

A API está atualmente alocada e rodando no [Render](https://render.com).

---

## Funcionalidades

- Criação, leitura, atualização e exclusão de listas de compras
- Adição e remoção de itens em listas
- Marcar itens como comprados (done)
- Relação muitos-para-muitos entre listas e itens
- Middleware para controle de propriedade (owner) das listas e itens

---

## Tecnologias

- Node.js
- Express
- Banco de dados PostgreSQL
- Cors
- dotenv
- uuid

---
```
sql
CREATE DATABASE tudonasacola;

CREATE TABLE IF NOT EXISTS lists (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    owner UUID NOT NULL
);

CREATE TABLE IF NOT EXISTS items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS list_items (
    list_id INTEGER REFERENCES lists(id) ON DELETE CASCADE,
    item_id INTEGER REFERENCES items(id) ON DELETE CASCADE,
    price NUMERIC(10,2),
    amount VARCHAR(50),
    done BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (list_id, item_id)
);

```

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/tudo-na-sacola.git
cd tudo-na-sacola
