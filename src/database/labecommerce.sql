-- Active: 1689279655427@@127.0.0.1@3306

--Criando a tabela USERS

CREATE TABLE
    users (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TEXT DEFAULT(DATETIME('now', 'localtime')) NOT NULL
    );

CREATE TABLE
    products (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        description TEXT NOT NULL,
        image_url TEXT NOT NULL
    );

CREATE TABLE
    purchases (
        id TEXT TEXT PRIMARY KEY UNIQUE NOT NULL,
        buyer TEXT NOT NULL,
        total_price REAL NOT NULL,
        created_at TEXT DEFAULT(DATETIME('now', 'localtime')) NOT NULL,
        FOREIGN KEY (buyer) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
    );

CREATE TABLE
    purchases_products(
        purchase_id TEXT NOT NULL,
        product_id TEXT NOT NULL,
        quantity INTEGER NOT NULL,
        FOREIGN KEY (purchase_id) REFERENCES purchases(id) ON UPDATE CASCADE ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(id) ON UPDATE CASCADE ON DELETE CASCADE
    );

INSERT INTO
    users (id, name, email, password)
VALUES (
        'c001',
        'Fulana',
        'fulana@email.com',
        '123456'
    ), (
        'c002',
        'Fulano',
        'fulano@email.com',
        '123456'
    ), (
        'c003',
        'Sicrana',
        'sicrana@email.com',
        '123456'
    ), (
        'c004',
        'Fayra',
        'fayra@email.com',
        '123456'
    );

INSERT INTO
    products (
        id,
        name,
        price,
        description,
        image_url
    )
VALUES (
        'p001',
        'mouse',
        100,
        'esrdxfcghvbj',
        'image'
    ), (
        'p002',
        'teclado',
        300,
        'dsfcgjkn',
        'image'
    ), (
        'p003',
        'PC',
        400,
        'fdcghvbjn',
        'image'
    ), (
        'p004',
        'mouse gamer',
        700,
        'esrdxfcghvbj',
        'image'
    ), (
        'p005',
        'teclado gamer',
        900,
        'dsfcgjkn',
        'image'
    ), (
        'p006',
        'PC gamer',
        1000,
        'fdcghvbjn',
        'image'
    );

INSERT INTO
    purchases(id, buyer, total_price)
VALUES ('P001', 'c001', 300), ('P002', 'c003', 400), ('P003', 'c002', 500);

INSERT INTO
    purchases_products(
        purchase_id,
        product_id,
        quantity
    )
VALUES ('P001', 'p001', 2), ('P002', 'p002', 3), ('P003', 'p003', 4);

SELECT
    users.id AS userId,
    purchases.id AS orderId,
    users.name,
    users.email,
    purchases.total_price,
    purchases.created_at
FROM purchases
    JOIN users ON purchases.buyer = users.id;

SELECT *
FROM products
    LEFT JOIN purchases_products ON products.id = purchases_products.product_id
    LEFT JOIN purchases ON purchases.id = purchases_products.purchase_id;

SELECT *FROM users;    
SELECT *FROM products;    
SELECT *FROM purchases;    
SELECT *FROM purchases_products;    