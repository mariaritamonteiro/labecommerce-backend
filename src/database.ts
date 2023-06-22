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
    },

]

/* //createUser
const createUser = (newUser: TUsers): void => {
    users.push(newUser)
    console.log("Cadastro de novo usuario realizado com sucesso");
}
createUser({
    id: "03",
    name: "Henry",
    email: "baby@email.com",
    password: "12345",
    createdAt: new Date().toDateString()
})

//getAllUsers
export const getAllUsers = ()=>{
    return users
}


//createProduct
const createProduct = (newProduct: TProducts): void => {
    products.push(newProduct)
    console.log("Cadastro de novo produto realizado com sucesso");
}
createProduct({
    id: "produto3",
    name: "caixa",
    price: 400,
    description: "amplificada",
    imageUrl: "algum site bacana"
})

//getAllProducts 
export const getAllProducts =()=>{
    return products
}

//searchProductsByName 
export const searchUsersByName = ( name:string):TUsers[]=> {
    return users.filter((user)=>{
        return user.name.toLowerCase().includes(name.toLowerCase())
    })   
}

//searchProductsByName
export const searchProductsByName = ( name:string):TProducts[]=> {
    return products.filter((product)=>{
        return product.name.toLowerCase().includes(name.toLowerCase())
    })   
}
console.table(searchProductsByName("Mesa")) 
 */





