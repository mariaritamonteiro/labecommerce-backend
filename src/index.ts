import { products, searchProductsByName, users } from "./database";
import express, { Request, Response } from 'express'
import cors from 'cors';
import { TProducts, TUsers } from "./types";

/* console.table(users);
console.table(products); */

const app = express();
app.use(cors());
app.use(express.json());

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});

//testando aplicação
app.get("/ping", (req: Request, res: Response) => {
    res.send("Pong")
})

//Get All Users
app.get("/users", (req: Request, res: Response) => {
    res.status(200).send(users)
})

//Get All Products
app.get("/products", (req: Request, res: Response) => {
    res.status(200).send(products)
}) 

//Refatorar o GET /products
app.get("/product", (req: Request, res: Response) => {
    const name  = req.query.name as string
    let response
    if (name) {
        response = searchProductsByName(name)
    }else{
        response = products
    }
    res.status(200).send(response)
}) 


//Create User
app.post("/users", (req: Request, res: Response) => {
    const { id, name, email, password, createdAt } = req.body

    const newUser: TUsers = {
        id,
        name,
        email,
        password,
        createdAt
    }
    users.push(newUser)
    res.status(201).send("cadastro realizado com sucesso!")

})

//Create Product
app.post("/products", (req: Request, res: Response) => {
    const { id, name, price, description,
        imageUrl } = req.body

    const newProduct: TProducts = {

        id,
        name,
        price,
        description,
        imageUrl,
    }
    products.push(newProduct)
    res.status(201).send("Produto cadastrado com sucesso!")

})

//Delete User by id
app.delete("/users/:id", (req: Request, res: Response) => {
    const id = req.params.id

    const findUserIndex = users.findIndex((user)=>{
        return user.id === id
    })
    if (findUserIndex>=0) {
        users.splice(findUserIndex,1)
        res.status(200).send("user apagado com sucesso")
    }else {
        res.status(200).send("Account not default!")
    }

})

//Delete Product by id
app.delete("/product/:id", (req: Request, res: Response) => {
    const id = req.params.id

    const findProductsIndex = products.findIndex((product)=>{
        return product.id === id
    })
    if (findProductsIndex>=0) {
        products.splice(findProductsIndex,1)
        res.status(200).send("item deletado com sucesso")

    }else{
        res.status(200).send("Account not default!")
    }

})

//Edit Product by id

app.put("/product/:id", (req: Request, res: Response) => {
    const id = req.params.id
    const {id:newId, name,price, description, imagemUrl}= req.body

    const findProducts = products.find((product)=>{
        return product.id === id 
    })

    if (findProducts) {
        findProducts.id= newId|| findProducts.id
        findProducts.name = name || findProducts.name
        findProducts.price = price || findProducts.price
        findProducts.description = description || findProducts.description
        findProducts.imageUrl = imagemUrl || findProducts.imageUrl

        res.status(200).send("Atualização realizada com sucesso!")
    }else {
        res.status(200).send("Account not default!")
    }
})






