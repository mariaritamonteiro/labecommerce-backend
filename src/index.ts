import { products, users } from "./database";
import express, { Request, Response, response } from 'express'
import cors from 'cors';
import { TProducts, TUsers } from "./types";


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
    try {
        const name = req.query.name as string
        let response;
        if (name) {
            response = users.filter((user) => {
                return user.name.toLowerCase().includes(name.toLowerCase())
            })

        } else {
            response = users
        }
        res.status(200).send(response)
    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.status(500).send("error desconhecido")
        }
    }

})

//Get All Products
app.get("/products", (req: Request, res: Response) => {
    try {
        const name = req.query.name
        if (name !== undefined) {
            if (typeof name !== "string") {
                res.status(422)
                throw new Error("O valor precisa ser uma string")
            }
            const response = products.filter((product) => {
                return product.name.toLowerCase().includes(name.toLowerCase())
            })
            res.status(200).send(response)
        }

    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.status(500).send('Error desconhecido')
        }
    }

})

//Create User
app.post("/users", (req: Request, res: Response) => {
    try {
        const id = req.body.id as string
        const name = req.body.name 
        const email = req.body.email as string
        const password = req.body.password as string
        const createdAt = req.body.createdAt as string


        if(typeof name !== 'string') {
            res.status(400)
            throw new Error('O tipo do nome deve ser uma string');
        }
        
        const newUser: TUsers = {
            id,
            name,
            email,
            password,
            createdAt
        }
        users.push(newUser)
        res.status(201).send("cadastro realizado com sucesso!")
    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.status(500).send('Error desconhecido')
        }
    }


})

//Create Product
app.post("/products", (req: Request, res: Response) => {
    try {

        
        const id = req.body.id
        const name = req.body.name
        const price = req.body.price 
        const description = req.body.description 
        const imageUrl = req.body.imageUrl 

        if (name == undefined) {
            throw new Error("Informe o nome do produto");
            
        }
        if (price == undefined) {
            throw new Error("Informe o preço do produto");
            
        }
        if (price<=0) {
            throw new Error("O preço informado não é aceito");
            
        }
        if (description == undefined) {
            throw new Error("Informe a descrição do produto");
            
        }
        if (imageUrl == undefined) {
            throw new Error("Coloque a imagem do produto");
            
        }

        const newProduct: TProducts = {

            id,
            name,
            price,
            description,
            imageUrl,
        }
        products.push(newProduct)
        res.status(201).send("Produto cadastrado com sucesso!")

    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.status(500).send('Error desconhecido')
        }
    }


})

//Delete User by id
app.delete("/users/:id", (req: Request, res: Response) => {
    try {
        const id = req.params.id


        const findUserIndex = users.findIndex((user) => {
            return user.id === id
        })
        if (findUserIndex < 0) {
            res.statusCode = 404
            throw new Error('Conta inexistente!')
        }
        if (findUserIndex >= 0) {
            users.splice(findUserIndex, 1)
            res.status(200).send("user apagado com sucesso")
        } else {
            res.status(200).send("Account not default!")
        }
    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.status(500).send('Error desconhecido')
        }
    }


})

//Delete Product by id
app.delete("/product/:id", (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const findProductsIndex = products.findIndex((product) => {
            return product.id === id
        })
         
        if (findProductsIndex < 0) {
            res.statusCode = 404
            throw new Error('Conta inexistente!')
        }
        if (findProductsIndex >= 0) {
            products.splice(findProductsIndex, 1)
            res.status(200).send("item deletado com sucesso")

        } else {
            res.status(200).send("Account not default!")
        }

    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.status(500).send('Error desconhecido')
        }
    }

})

//Edit Product by id

app.put("/product/:id", (req: Request, res: Response) => {
    try {
        const id = req.params.id as string | undefined
        const newId = req.body as string | undefined
        const name = req.body as string | undefined
        const price = req.body as number | undefined
        const description = req.body as string | undefined
        const imagemUrl = req.body as string | undefined

        const findProducts = products.find((product) => {
            return product.id === id
        })
        if (findProducts === undefined) {
            res.status(400)
            throw new Error("O produto não existe, por isso não pode ser editado");
            
        }
        if (findProducts) {
            findProducts.id = newId || findProducts.id
            findProducts.name = name || findProducts.name
            findProducts.price = price || findProducts.price
            findProducts.description = description || findProducts.description
            findProducts.imageUrl = imagemUrl || findProducts.imageUrl

            res.status(200).send("Atualização realizada com sucesso!")
        } else {
            res.status(200).send("Account not default!")
        }
    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.status(500).send('Error desconhecido')
        }
    }

})






