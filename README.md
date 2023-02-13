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
<ol>
<li>Dentro da pasta do projeto execute o seguinte comando:</li>
    <p><b>npm install</b></p> 
 <li>Execute o seguinte comando para iniciar o banco de dados:</li>
    <p><b>docker-compose up</b></p>
 <li>Execute os comandos em sequência para gerar as migrations:</li>
    <p><b>yarn migration:generate</b> ou <b>npm run migration:generate</b></p>
    <p><b>yarn migration:run</b> ou <b>npm run migration:run</b></p>
 <li>Execute o projeto com o comando</li>
    <p><b>npm run dev</b></p>
</ol>
Pronto! agora é só começar a usar a API em sua ferramenta de testes favorita.


# Swagger
Para acessar a documentação é necessário rodar o projeto e digitar a seguinte url no navegador
- http://localhost:3333/doc/
