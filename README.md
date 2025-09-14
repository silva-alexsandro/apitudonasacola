# API Tudo na Sacola

API RESTful para gerenciamento de listas de compras e itens, construída em Node.js com arquitetura limpa e boas práticas de DDD.

#### Curiosidade

O nome *Tudo na Sacola* foi escolhido através de uma votação popular, que envolveu possiveis usarios do sistema.

Neste momento estamos usando o [Render](https://render.com) para alocar o backend e o [Supabase](https://supabase.com/) para ser nosso backend.


### Estrutura do Projeto
```bash
/src
  ├── app/                
  ├── domain/             
  ├── infrastructure/              
  ├── interfaces/         
  └── shared/            
```

### Tecnologias Utilizadas

- Node.js
- Express
- Cors
- uuid
- PostgreSQL


### Funcionalidades

##### Lista
* [x] Criação, leitura e exclusão de listas de compras
* [x] atualização do nome da lista
* [x] flag como lista favorita
* [x] flag como arquivada
* [x] deletar todas as listas criadas
* [x] deletar lista por id
* [x] duplicar lista e itens

##### Item
* [x] Adição e remoção de itens em listas
* [x] Marcar itens como comprados
* [x] Relação muitos-para-muitos entre listas e itens

##### Share
* [x] compartilhar lista com 3°
* [x] validade de 24h o compartilhamento


![Banco de dados](./public/schema-api.svg)



### Instalação

Clone o repositório:


```bash
git clone https://github.com/silva-alexsandro/apitudonasacola.git
cd apitudonasacola

npm install
    
```

## License
Não possuimos nenhuma no momento.