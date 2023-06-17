"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
console.table(database_1.users);
console.table(database_1.products);
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});
app.get("/ping", (req, res) => {
    res.send("Pong");
});
app.get("/users", (req, res) => {
    res.status(200).send(database_1.users);
});
app.get("/product", (req, res) => {
    res.status(200).send(database_1.products);
});
app.post("/user", (req, res) => {
    const { id, name, email, password, createdAt } = req.body;
    const newUser = {
        id,
        name,
        email,
        password,
        createdAt
    };
    database_1.users.push(newUser);
    res.status(201).send("cadastrado com sucesso!");
});
app.post("/user", (req, res) => {
    const { id, name, price, description, imageUrl } = req.body;
    const newProduct = {
        id,
        name,
        price,
        description,
        imageUrl,
    };
    database_1.products.push(newProduct);
    res.status(201).send("Produto cadastrado com sucesso!");
});
app.delete("/users/:id", (req, res) => {
    const id = req.params.id;
    const findUserIndex = database_1.users.findIndex((user) => {
        return user.id === id;
    });
    if (findUserIndex >= 0) {
        database_1.users.splice(findUserIndex, 1);
        res.status(200).send("item deletado com sucesso");
    }
    else {
        res.status(200).send("Account not default!");
    }
});
app.delete("/product/:id", (req, res) => {
    const id = req.params.id;
    const findProductsIndex = database_1.products.findIndex((product) => {
        return product.id === id;
    });
    if (findProductsIndex >= 0) {
        database_1.products.splice(findProductsIndex, 1);
        res.status(200).send("item deletado com sucesso");
    }
    else {
        res.status(200).send("Account not default!");
    }
});
app.put("/product/:id", (req, res) => {
    const id = req.params.id;
    const { id: newId, name, price, description, imagemUrl } = req.body;
    const findProducts = database_1.products.find((product) => {
        return product.id === id;
    });
    if (findProducts) {
        findProducts.id = newId || findProducts.id;
        findProducts.name = name || findProducts.name;
        findProducts.price = price || findProducts.price;
        findProducts.description = description || findProducts.description;
        findProducts.imageUrl = imagemUrl || findProducts.imageUrl;
        res.status(200).send("Atualização realizada com sucesso!");
    }
    else {
        res.status(200).send("Account not default!");
    }
});
//# sourceMappingURL=index.js.map