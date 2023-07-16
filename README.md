# labecommerce-backend
Primeiro projeto em backend
 # Projeto labecommerce-backend

 ## Meu primeiro projeto do back-end, nele praticamos toda a base de criação de uma API vinculada a um banco de dados real. O mesmo foi proposto no curso de desenvolvimento Full Stack da Labenu.

# Índice
- <a href="#layout">layout
- <a href="#requisiçoes-paths">Requisições(Paths)
- <a href="#documentação-postman">Documentação Postaman
- <a href="#tecnologias-ultilizadas"> Tecnologias Ultilizadas
- <a href="#acesso-ao-projeto"> Acesso ao Projeto
- <a href="#desenvolvedor"> Desenvolvedor(a)

# Layout 
- Estrutura das pastas

![estrutura-das-pasta](./src/assents/Captura%20de%20Tela%20(717).png)

# Requisições(Paths)
## Requisições de Usuários
- /users
## Requisições de Produtos
- /products
## Requisições de Compras
- /purchases

# Exemplos de Requisições
## Requisições de Usuários
- GET /users: Retorna todas os usuários cadastradas.
```
[
  {
    "id": "u001",
    "name": "Astrodev",
    "email": "astrodev@email.com",
    "password": "astrodev00",
    "createdAt": "2023-07-15T16:19:30.451Z"
  },
  {
    "id": "u002",
    "name": "Fulana",
    "email": "fulana@email.com",
    "password": "fulana00",
    "createdAt": "2023-07-15T16:21:28.352Z"
  },
  {
    "id": "u003",
    "name": "ci",
    "email": "ciclana@email.com",
    "password": "ci00",
    "createdAt": "2023-07-15T16:22:42.376Z"
  },
  {
    "id": "u004",
    "name": "Mary",
    "email": "mary@email.com",
    "password": "mr00",
    "createdAt": "2023-07-15T17:33:44.480Z"
  },
  {
    "id": "u005",
    "name": "Maria Rita",
    "email": "maria@email.com",
    "password": "255100",
    "createdAt": "2023-07-15T17:47:32.302Z"
  },
  {
    "id": "u006",
    "name": "Lab",
    "email": "lab@email.com",
    "password": "255100",
    "createdAt": "2023-07-15T19:44:39.460Z"
  }
]
```
- POST /users: Cadastra um novo usuário.
```
{
    "id": "u006",
    "name": "Lab",
    "email": "lab@email.com",
    "password": "255100"
}
```

## Requisições de produtos
- POST /products: Cadastra um novo produto.
```
{
    "id": "prod006",
    "name": "Skate",
    "price": 900,
    "description":"com quatro rodinhas",
    "imageUrl": "image"
}
```

- GET / products: Retorna todas os produtos cadastradas.
```
[
  {
    "id": "prod001",
    "name": "Teclado gamer",
    "price": 200,
    "description": "Teclado mecânico com numpad",
    "imageUrl": "image"
  },
  {
    "id": "prod002",
    "name": "Disco Voador",
    "price": 500,
    "description": "Para crianças maiores de 11 anos",
    "imageUrl": "image"
  },
  {
    "id": "prod003",
    "name": "Piano",
    "price": 100,
    "description": "Pino de ferro",
    "imageUrl": "image"
  },
  {
    "id": "prod004",
    "name": "Bicicleta",
    "price": 100,
    "description": "Com rodinha",
    "imageUrl": "image"
  },
  {
    "id": "prod005",
    "name": "Colar de ouro",
    "price": 800,
    "description": "tipo: tijolinho",
    "imageUrl": "image"
  },
  {
    "id": "prod006",
    "name": "Skate",
    "price": 900,
    "description": "com duas rodinhas",
    "imageUrl": "image"
  }
]
```


- PUT /products: Edita um produto existente.
```
    {
        "id": "prod006",
        "name": "Skate",
        "price": 900,
        "description": "com duas rodinhas",
        "imageUrl": "image"
    }
```

## Requisições de compras
- POST /purchases: Cadastra um novo pedido.
```
{
    "id": "pur005",
    "buyer": "u005",
    "products": [
        {
            "id": "prod001",
            "quantity": 2
        },
        {
            "id": "prod002",
            "quantity": 1
        }
    ]
}
```

- DELETE /purchases: Deleta um pedido existente..
```
{
    "message": compras excluídas com sucesso!
}
```

- GET /purchases/:id : Retorna os dados de uma compra, incluindo a lista de produtos da mesma.
```
{
  "purchase_id": "pur004",
  "buyerId": "u004",
  "buyerName": "Mary",
  "buyerEmail": "mary@email.com",
  "totalPrice": 900,
  "products": [
    {
      "id": "prod001",
      "name": "Teclado gamer",
      "price": 200,
      "description": "Teclado mecânico com numpad",
      "imageUrl": "image"
    },
    {
      "id": "prod002",
      "name": "Disco Voador",
      "price": 500,
      "description": "Para crianças maiores de 11 anos",
      "imageUrl": "image"
    }
  ]
}
```

- GET /purchases: Retorna todos os dados de uma compra
```
[
  {
    "id": "pur001",
    "buyer": "u001",
    "total_price": 700,
    "created_at": "2023-07-15 17:16:11"
  },
  {
    "id": "pur002",
    "buyer": "u002",
    "total_price": 700,
    "created_at": "2023-07-15 17:22:57"
  },
  {
    "id": "pur003",
    "buyer": "u003",
    "total_price": 200,
    "created_at": "2023-07-15 17:24:05"
  },
  {
    "id": "pur004",
    "buyer": "u004",
    "total_price": 900,
    "created_at": "2023-07-15 19:14:59"
  }
]
```
# Documentação Postman
[Click aqui para ter acesso a documentação do Postman.](https://documenter.getpostman.com/view/26594514/2s946fdsdc)

# Tecnologias Ultilizadas
Conteúdos abordados:

- NodeJS
- Typescript
- Express
- SQL e SQLite
- Knex 
- Postman

# Acesso ao Projeto
## Pré Requisitos
È necessario ter instalado na máquina as seguintes ferramentas: <b>Git, Node.js.<b>

## Rodando o Back End (servidor)
```bash
# Clone este repositório
$ git clone <https://github.com/mariaritamonteiro/labecommerce-backend.git>

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npm run dev:server

# O servidor inciará na porta:3003 - acesse <http://localhost:3003>
```
# Desenvolvedor(a)
<img style="width:200px" src="./src/assents/img redme.jpg" >
<br><br>
<b>Maria Rita Monteiro<b>



