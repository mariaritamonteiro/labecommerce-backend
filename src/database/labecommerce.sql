-- Active: 1689279655427@@127.0.0.1@3306

CREATE TABLE
    users (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        createdAt TEXT DEFAULT (DATETIME()) NOT NULL
    );

CREATE TABLE
    products (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        description TEXT NOT NULL,
        imageUrl TEXT NOT NULL
    );

CREATE TABLE
    purchases (
       id TEXT PRIMARY KEY NOT NULL,
        buyer TEXT NOT NULL,
        total_price REAL NOT NULL,
        created_at TEXT DEFAULT (DATETIME()) NOT NULL,
        FOREIGN KEY (buyer) REFERENCES users(id)
    );

CREATE TABLE
    purchases_products(
        purchase_id TEXT NOT NULL,
        product_id TEXT NOT NULL,
        quantity INTEGER NOT NULL,
        FOREIGN KEY (purchase_id) REFERENCES purchases(id) ON UPDATE CASCADE ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(id) ON UPDATE CASCADE ON DELETE CASCADE
    );

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

