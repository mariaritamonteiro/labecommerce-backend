-- Active: 1687455032482@@127.0.0.1@3306
--Criando a tabela USERS
CREATE TABLE
    users (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TEXT NOT NULL
    );

--Inserir dados na tabela
INSERT INTO
    users(
        id,
        name,
        email,
        password,
        created_at
    )
VALUES (
        '01',
        'Maria',
        'marylinda@gmail.com',
        'mary123',
        'hoje-agora'
    ), (
        '02',
        'Gilmar',
        'love@email.com',
        'love1234',
        'hoje-agora-smpre'
    ), (
        '03',
        'Henry',
        'lovetia@gmail.com',
        'baby153',
        'hoje-e-eternamente'
    );

--Para visualzar a estrutura da tabela
SELECT *FROM users;

--Deletar tabela inteira
DROP TABLE users;

--Visualizarr estrutura da tabela
PRAGMA table_info ('users');

--Criando a tabela PRODUCTS
CREATE TABLE
    products (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        description TEXT NOT NULL,
        image_url TEXT NOT NULL
    );

--Inserindo dados na tabela
INSERT INTO
    products (
        id,
        name,
        price,
        description,
        image_url
    )
VALUES (
        '001',
        'maça',
        25,
        'como, mas me da fomee',
        'olha ela aii'
    ), (
        '002',
        'laranja',
        30,
        'gosto das docinhas',
        'igual essa'
    ), (
        '003',
        'uva',
        40,
        'só não gosto do preço',
        'belas e caras'
    ), (
        '004',
        'morango',
        50,
        'muito caro pro meu bolso',
        'viu ai'
    ), (
        '005',
        'maracuja',
        60,
        'amo o suco dele',
        'dilicinha demais!!'
    );

--Visualizando a estrutura da tabela
SELECT *FROM products;

-- Get All User
-- retorna todas as pessoas cadastradas
SELECT name FROM users;

-- Get All Products (funcionalida 1)
-- retorna todos os produtos cadastradas
SELECT name FROM products;

-- Get all Products (funcionalida 2)
-- retorna todos os produtos que possuem no seu nome "gosto"
SELECT name FROM products
WHERE 

-- Create user
-- criar uma nova pessoa na Tabela
INSERT INTO
    users (
        id,
        name,
        email,
        password,
        created_at
    )
VALUES (
        '04',
        'Alladin',
        'catlove@gmail.com',
        'cat153',
        'amo-muito-meu-nenem'
    );

-- Create Product
-- criar um novo produto na tabela
INSERT INTO
    products (
        id,
        name,
        price,
        description,
        image_url
    )
VALUES (
        '006',
        'manga',
        70,
        'de vez é melhor ainda',
        'desse jeito na imagem!!'
    );

-- Delete User By Id
-- deleção de user
DELETE FROM users
WHERE id = '01';   

-- Delete Products By Id
-- deleção de product
DELETE FROM products
WHERE id = '001' ;

-- Edit Product By id
-- Edição de produto por id
-- query editando colunas do item
UPDATE products
SET 
    id = '0001',
    name = 'januticaba',
    price = 100,
    description = 'a minha fruta preferida',
    image_url = 'pena que só a vejo por foto'
WHERE id = '005'    