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

--tentar editar o created_at PARA  created_at TEXT NOT NULL DEFAULT(datetime('now','localtime'))
    


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
        '20-02-1998'
    ), (
        '02',
        'Gilmar',
        'love@email.com',
        'love1234',
        '20-22-1596'
    ), (
        '03',
        'Henry',
        'lovetia@gmail.com',
        'baby153',
        '30-03-1589'
    ), (
        '04',
        'Alladin',
        'catlove@gmail.com',
        'cat153',
        '14-52-6952'
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
    ), (
        '006',
        'manga',
        70,
        'de vez é melhor ainda',
        'desse jeito na imagem!!'
    );

--Visualizando a estrutura da tabela

SELECT *FROM users;

-- Delete User By Id

-- deleção de user

DELETE FROM users WHERE id = '01';

-- Delete Products By Id

-- deleção de product

DELETE FROM products WHERE id = '001' ;

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
WHERE id = '005';

--EXERCICIO 27/06

CREATE TABLE
    purchases (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        buyer TEXT NOT NULL,
        total_price REAL NOT NULL,
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (buyer) REFERENCES users(id)
    );

DROP TABLE purchases;

SELECT *FROM purchases;

INSERT INTO
    purchases (id, buyer, total_price)
VALUES ('P001', '02', 50), ('P002', '03', 60), ('P003', '01', 40), ('P004', '04', 40);

UPDATE purchases SET total_price = 80 WHERE id = 'P001';

SELECT
    users.id AS userId,
    purchases.id AS orderId,
    users.name,
    users.email,
    purchases.total_price,
    purchases.created_at
FROM purchases
    JOIN users ON purchases.buyer = users.id;

CREATE TABLE purchases_products(
    purchase_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY (purchase_id) REFERENCES  purchases(id),
	FOREIGN KEY (product_id) REFERENCES  products(id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
);

INSERT INTO purchases_products(
  purchase_id,
  product_id,
  quantity
)VALUES('P001','006',2),('P002','004',5),('P003','002',1);


SELECT *FROM products
LEFT JOIN purchases_products ON products.id = purchases_products.product_id
LEFT JOIN purchases ON purchases.id = purchases_products.purchase_id;

UPDATE users
SET id = '04'
WHERE id = 'U004';




