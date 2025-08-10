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
- Cálculo do total de itens, itens comprados e valor total da compra
- Middleware para controle de propriedade (owner) das listas e itens

---

## Tecnologias

- Node.js
- Express
- Banco de dados  PostgreSQL
- Cors
- dotenv
- uuid

---
```
sql
CREATE DATABASE tudonasacola;

DROP TABLE IF EXISTS list_items;
DROP TABLE IF EXISTS items;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS lists;

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price NUMERIC(10,2),
    amount VARCHAR(50),
    category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL
);

CREATE TABLE lists (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    owner UUID NOT NULL
);

CREATE TABLE list_items (
    list_id INTEGER REFERENCES lists(id) ON DELETE CASCADE,
    item_id INTEGER REFERENCES items(id) ON DELETE CASCADE,
    PRIMARY KEY (list_id, item_id)
);
```

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/tudo-na-sacola.git
cd tudo-na-sacola
