
import express, { Request, Response } from 'express'
import cors from 'cors';
import { db } from './database/knex'
import { TPurchases, TUsers, TProducts } from './types';

const app = express();
app.use(cors());
app.use(express.json());

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});


//Get All Users 
app.get("/users", async (req: Request, res: Response) => {
    try {
        const result = await db("users")
        res.status(200).send(result)
    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.status(500).send("Error desconhecido.")
        }
    }
});
//Create User
app.post("/users", async (req: Request, res: Response) => {
    try {
        const { id, name, email, password } = req.body

        if (!id || !name || !email || !password) {
            res.status(400)
            throw new Error("Preencha todos os campos para cadastrar o novo usuário.")
        }

        const newUser: TUsers = {
            id,
            name,
            email,
            password,
            createdAt: new Date().toISOString()
        }

        await db("users").insert(newUser)
        res.status(201).send("cadastro realizado com sucesso!")

    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.status(500).send('Error desconhecido')
        }
    }

});
//Create Products
app.post("/products", async (req: Request, res: Response) => {
    try {


        const { id, name, price, description, imageUrl } = req.body

        const newProduct: TProducts = {
            id: id,
            name: name,
            price: price,
            description: description,
            imageUrl: imageUrl
        }

        if (!id || !name || !price || !description || !imageUrl) {
            res.status(400)
            throw new Error("Preencha todos os campos para recadastrar o novo produto.")
        }

        if (name == undefined) {
            throw new Error("Informe o nome do produto");

        }
        if (price == undefined) {
            throw new Error("Informe o preço do produto");

        }
        if (price <= 0) {
            throw new Error("O preço informado não é aceito");

        }
        if (description == undefined) {
            throw new Error("Informe a descrição do produto");

        }
        if (imageUrl == undefined) {
            throw new Error("Coloque a imagem do produto");

        }

        await db("products").insert(newProduct)
        res.status(200).send("Produto cadastrado com sucesso")

    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.status(500).send('Error desconhecido')
        }
    }
});
//Get All Products
app.get("/products", async (req: Request, res: Response) => {
    try {

        const name = req.query.name
        if (name !== undefined) {
            if (typeof name !== "string") {
                res.status(422)
                throw new Error("O nome precisa der uma string")
            }
            if (!name || name.length < 1) {
                res.status(400)
                throw new Error("O nome precisa ter mais de um caractere")
            }
            const response = await db("products").where("name", "LIKE", `%${name}%`)
            res.status(200).send(response);

        }
        const result = await db("products")
        res.status(200).send(result)
    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.status(500).send('Error desconhecido')
        }
    }

});
//Edit Product by id 
app.put("/products/:id", async (req: Request, res: Response) => {
    try {
        const idToEdit = req.params.id

        const { name, price, description, imageUrl } = req.body;

        const [product] = await db("products").where({ id: idToEdit })
        if (product) {
            const updateProduct = {
                name: name || product.name,
                price: price || product.price,
                description: description || product.description,
                imageUrl: imageUrl || product.imageUrl
            }
            await db("products").update(updateProduct).where({ id: idToEdit })
        } else {
            res.status(404)
            throw new Error("Produto não encontrado.");
        }
        res.status(200).send("Produto alterado com sucesso.");

    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.status(500).send('Error desconhecido')
        }
    }

});
//Create purchase
app.post("/purchases", async (req: Request, res: Response) => {
    try {
        const { id, buyer, products } = req.body;
        let total_price = 0;

        for (let product of products) {
            try {
                const priceArr = await db('products').select('price').where({ id: product.id });

                const price = parseFloat(priceArr[0].price);

                if (!isNaN(price)) {
                    total_price += price * product.quantity
                } else {
                    res.status(400)
                    throw new Error("Não é possível acessar os preços.")
                }
            } catch (error) {
                if (req.statusCode === 200) {
                    res.status(500);
                }
                if (error instanceof Error) {
                    res.send(error.message);
                } else {
                    res.status(500).send("Error desconhecido");
                }
            }
        }
        const newPurchase: TPurchases = {
            id: id,
            buyer: buyer,
            total_price: total_price
        }
        await db("purchases").insert(newPurchase)
        for (let product of products) {
            const newPurchaseProducts = {
                purchase_id: id,
                product_id: product.id,
                quantity: product.quantity
            }
            await db("purchases_products").insert(newPurchaseProducts)
        }
        res.status(201).send("Pedido realizado com sucesso!")
    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message);
        } else {
            res.status(500).send("Error desconhecido");
        }
    }
});
//Delete purchase by id
app.delete("/purchases/:id", async (req: Request, res: Response) => {
    try {
        const idToDelete = req.params.id
        const [purchase] = await db("purchases").where({ id: idToDelete });
        if (!purchase) {
            res.status(400)
            throw new Error("id não encontrado!")
        }
        await db("purchases").del().where({ id: idToDelete })
        res.status(200).send("compras excluídas com sucesso!")
    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.status(500).send('Error desconhecido')
        }
    }
});
//Get Purchases by id
app.get("/purchases/:id", async (req: Request, res: Response) => {
    try {
        const idToSearch = req.params.id;
        if (idToSearch === "id") {
            throw new Error("Precisa passar um ID.")
        }
        const [purchase] = await db("purchases").where("purchases.id", idToSearch)
        if (!purchase) {
            res.status(404)
            throw new Error("ID não encontrado.")
        }
        const lista = await db("purchases_products").where({ purchase_id: idToSearch })
        const prodList = []
        for (let product of lista) {
            const [prod] = await db("products").where({
                id: product.product_id
            })
            prodList.push(prod)
        }
        const [user] = await db("users").where({ id: purchase.buyer })
        const result = {
            purchase_id: purchase.id,
            buyerId: user.id,
            buyerName: user.name,
            buyerEmail: user.email,
            totalPrice: purchase.total_price,
            createdAt: purchase.createdAt,
            products: prodList
        }
        res.status(200).send(result);
    } catch (error) {
        if (req.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        } else {
            res.status(500).send("Erro desconhecido");
        }
    }
});
//Get All Purchases
app.get("/purchases", async (req: Request, res: Response) => {
    try {
        const result = await db("purchases")
        res.status(200).send(result)
    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.status(500).send('Error desconhecido')
        }
    }
});






