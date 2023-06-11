"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchUser = exports.arrayDeProdutos = exports.arrayDeUsuarios = void 0;
exports.arrayDeUsuarios = [
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
exports.arrayDeProdutos = [
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
    }
];
function creatUser(id, name, email, password, createdAt) {
    const newObj = {
        id: id,
        name: name,
        email: email,
        password: password,
        createdAt: createdAt
    };
    exports.arrayDeUsuarios.push(newObj);
    return (console.log("Cadastro realizado com sucesso"));
}
function getAllUsers() {
    return creatUser("03", "Henry", "baby@email.com", "09564", new Date().toDateString());
}
getAllUsers();
function createProduct(id, name, price, description, imageUrl) {
    const newProduct = {
        id: id,
        name: name,
        price: price,
        description: description,
        imageUrl: imageUrl
    };
    exports.arrayDeProdutos.push(newProduct);
    return (console.log("Produto criado com sucesso"));
}
function getAllProducts() {
    return createProduct("produto3", "caixa", 400, "amplificada", "algum site bacana");
}
getAllProducts();
const searchUser = (arrayDeProdutos, name) => {
    return arrayDeProdutos.filter((user) => {
        return user.name.toLowerCase() === name.toLowerCase();
    });
};
exports.searchUser = searchUser;
console.table((0, exports.searchUser)(exports.arrayDeProdutos, "Mesa"));
//# sourceMappingURL=database.js.map