import { TUsers, TProducts } from "./types";

export const users: TUsers[] = [
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
]

export const products: TProducts[] = [
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

]

function creatUser(id: string, name: string, email: string, password: string, createdAt: string) {
    const newUsers = {
        id: id,
        name: name,
        email: email,
        password: password,
        createdAt: createdAt
    }
    users.push(newUsers)
    return (    
        console.log("Cadastro realizado com sucesso")
    )
}

function getAllUsers() {
    return creatUser("03", "Henry", "baby@email.com", "09564", new Date().toDateString());
}
getAllUsers()


function createProduct(id: string, name: string, price: number, description: string, imageUrl: string) {
    const newProduct = {
        id: id,
        name: name,
        price: price,
        description: description,
        imageUrl: imageUrl
    }
    products.push(newProduct)
    return (
        console.log("Produto criado com sucesso")

    )
}

function getAllProducts() {
    return createProduct("produto3", "caixa", 400, "amplificada", "algum site bacana")
}
getAllProducts()

export const searchUser = (products:TProducts[], name:string):TProducts[]=> {
    return products.filter((user)=>{
        return user.name.toLowerCase() === name.toLowerCase()
    })   
}
console.table(searchUser(products,"Mesa"))






