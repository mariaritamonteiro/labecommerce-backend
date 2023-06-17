"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchProductsByName = exports.searchUsersByName = exports.getAllProducts = exports.getAllUsers = exports.products = exports.users = void 0;
exports.users = [
    {
        id: "01",
        name: "Maria",
        email: "mary@email.com",
        password: "12345",
        createdAt: new Date().toISOString()
    },
    {
        id: "02",
        name: "Gilmar",
        email: "gil@email.com",
        password: "56789",
        createdAt: new Date().toISOString()
    },
];
exports.products = [
    {
        id: "produto1",
        name: "livro",
        price: 50,
        description: "Marly e Eu",
        imageUrl: "algum site bacana"
    },
    {
        id: "produto2",
        name: "mesa",
        price: 250,
        description: "mesa de jantar",
        imageUrl: "algum site bacana"
    },
];
const createUser = (newUser) => {
    exports.users.push(newUser);
    console.log("Cadastro de novo usuario realizado com sucesso");
};
createUser({
    id: "03",
    name: "Henry",
    email: "baby@email.com",
    password: "12345",
    createdAt: new Date().toDateString()
});
const getAllUsers = () => {
    return exports.users;
};
exports.getAllUsers = getAllUsers;
const createProduct = (newProduct) => {
    exports.products.push(newProduct);
    console.log("Cadastro de novo produto realizado com sucesso");
};
createProduct({
    id: "produto3",
    name: "caixa",
    price: 400,
    description: "amplificada",
    imageUrl: "algum site bacana"
});
const getAllProducts = () => {
    return exports.products;
};
exports.getAllProducts = getAllProducts;
const searchUsersByName = (name) => {
    return exports.users.filter((user) => {
        return user.name.toLowerCase().includes(name.toLowerCase());
    });
};
exports.searchUsersByName = searchUsersByName;
const searchProductsByName = (name) => {
    return exports.products.filter((product) => {
        return product.name.toLowerCase().includes(name.toLowerCase());
    });
};
exports.searchProductsByName = searchProductsByName;
console.table((0, exports.searchProductsByName)("Mesa"));
//# sourceMappingURL=database.js.map