# Wishlist
API construída em nodejs usando autenticação jwt que simula uma lista de favoritos. Onde é  possível criar, atualizar, visualizar e remover clientes, cada cliente só deverá ter uma única lista de produtos favoritos, em uma lista de produtos favoritos podem existir uma quantidade ilimitada de produtos.

# Funcionalidades
### Cliente
- criar
- listar
- deletar
- visualizar

### Produto
- criar
- listar
- deletar
- visualizar

### Wishlist
- listar
- adicionar produto a wishlist
- remover produto da wishlist

### User
- cadastrar novo usuário
- login para obter token

# Tecnologias e bibliotecas utilizadas
- mysql
- express
- node js
- jwt
- typescript
- swagger
- bcrypt

# Pré requisitos de instalação
- node js(superior a versão 14)
- npm 
- docker

# Passo a passo de como executar o projeto
1° Dentro da pasta do projeto execute o seguinte comando:
    - `npm install`
2° Execute o seguinte comando para iniciar o banco de dados:
    - `docker-compose up`
3º Execute os comandos em sequência para gerar as migrations:
    - `yarn migration:generate` ou `npm run migration:generate`
    - `yarn migration:run` ou `npm run migration:run`
4º Execute o projeto com o comando
    - `npm run dev`

# Swagger
Para acessar a documentação digite a seguinte url no navegador
- http://localhost:3333/doc/