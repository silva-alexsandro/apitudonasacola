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

---

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/tudo-na-sacola.git
cd tudo-na-sacola
