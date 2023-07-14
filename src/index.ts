
import express, { Request, Response } from 'express'
import cors from 'cors';
import { db } from './database/knex'
import { TProducts } from './types';




const app = express();
app.use(cors());
app.use(express.json());

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});



//Get All Users OK
app.get("/users", async (req: Request, res: Response) => {
    try {
        const result = await db.raw(`
    SELECT * FROM users;
    `)
        res.status(200).send(result)

        /* const result = await db("users") //metodo buier  
        res.status(200).send(result) */

    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.status(500).send("error desconhecido")
        }
    }
});
//Create User
app.post("/users", async (req: Request, res: Response) => {
    try {
        const id = req.body.id as string
        const name = req.body.name
        const email = req.body.email as string
        const password = req.body.password as string
        const created_at = req.body.createdAt as string


        if (typeof name !== 'string') {
            res.status(400)
            throw new Error('O tipo do nome deve ser uma string');
        }

        await db.raw(`
             INSERT INTO users(
                id,
                name,
                email,
                password,
                created_at
             )
             VALUES("${id}","${name}","${email}","${password}","${created_at}");
        `)
        res.status(200).send("cadastro realizado com sucesso!")

    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.status(500).send('Error desconhecido')
        }
    }

});
//Create Product
app.post("/products", async (req: Request, res: Response) => {
    try {


        const id = req.body.id
        const name = req.body.name
        const price = req.body.price
        const description = req.body.description
        const image_url = req.body.image_url

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
        if (image_url == undefined) {
            throw new Error("Coloque a imagem do produto");

        }

        await db.raw(`
        INSERT INTO products(
        id ,
        name ,
        price,
        description ,
        image_url 
        )
        VALUES("${id}","${name}","${price}","${description}","${image_url}");
   `)
        res.status(200).send( "Produto cadastrado com sucesso")

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
                throw new Error("O nome precisa ter mais de um caractere")
            }
        }

        const result = await db.raw(`
        SELECT *FROM products;
        `)
        res.status(200).send(result)

    } catch (error: any) {
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.status(500).send('Error desconhecido')
        }
    }

});
//Edit Product by id ok

app.put("/products/:id", async (req: Request, res: Response) => {
    try {
        const idToEdit = req.params.id

        const newId = req.body.id as string | undefined
        const name = req.body.name as string | undefined
        const price = req.body.price as number | undefined
        const newDescription = req.body.description as string | undefined
        const newImageUrl = req.body.image_url as string | undefined

        const [product] = await db("products").where({ id: idToEdit })
        if (product) {
            await db.update({
                id: newId || product.id,
                name: name || product.name,
                price: price || product.price,
                description: newDescription || product.description,
                image_url: newImageUrl || product.imageUrl

            })
                .from("products").where({ id: idToEdit })

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


//Create purchase
app.post("/purchases", async (req: Request, res: Response) => {
    try {
        const { id, buyer, products} = req.body

        const order = []
        let total_price = 0;

        for(let product of products){
            const [productExs]= await db("products").where({id: product.id})
            total_price = total_price + productExs.price * product.quantity
        }
      

        await db.raw(`
        INSERT INTO newPurchases(
            id,
            buyer,
            total_price
        )
        VALUES("${id}","${buyer}","${total_price}");
   `)



        await db("purchases").insert(products)
        for(let product of products){
            const newPurchasesProd = {
                purchases_id:id,
                product_id: product.id,
                quantity: product.quantity,
            }
           await db("purchases_products").insert(newPurchasesProd)
        }

        res.status(201).send("Pedido realizado com sucesso")

    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.status(500).send('Error desconhecido')
        }
    }
});


//Delete purchase by id
app.delete("/purchases/:id", async (req: Request, res: Response) => {
    try {
      const idToDelete = req.params.id
      const [purchase] = await db("purchases").where({id: idToDelete});
      if (!purchase) {
        res.status(400)
        throw new Error("Id not found!")
      }
      await db("purchases").del().where({id:idToDelete})
      res.status(200).send("purchases deleted successfuly!")
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
            throw new Error("Need to pass an Id.")
        }

        const [purchase] = await db("purchases").where("purchases.id", idToSearch)
        if (!purchase) {
            res.status(404)
            throw new Error("Id not found.")
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
            createAt: purchase.createAt,
            products: prodList

        }

        res.status(200).send(result)
    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.status(500).send('Error desconhecido')
        }
    }
});






//Get purchases by id
/* app.delete("/users/:id", (req: Request, res: Response) => {
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
}) */

//Delete Product by id
 /* app.delete("/product/:id", (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const findProductsIndex = products.findIndex((product) => {
            returnid === id
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
  */

//delete product
/* app.get("/products/:id", async (req:Request, res:Response)=>{
    try {
       const idToDelete = req.params.id;
       const [product] = await db("products").where({id: idToDelete});
      if (!product) {
        res.status(400)
        throw new Error('id not found!')
      } 
      await db("products").del().where({id: idToDelete});
      res.status(200).send('produto deletado com sucesso');

    } catch (error) {
        if (res.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        } else {
            res.status(500).send('Error desconhecido');
        }
    }
});
  */

//Get Purchases by id
/* app.get("/purchases/:id", async (req:Request, res:Response)=>{
    try {
        const idToSearch = req.params.id;

        if (idToSearch === "id") {
            throw new Error ("Need to pass an Id.")
        }

        const [purchases] = await db("purchases").where("purchases.id", idToSearch)
        if (!purchases) {
            res.status(404)
            throw new Error ("Id not found.")
        }

        const lista = await db("purchases_products").where({purchases_id: idToSearch})
 

        const prodList = []

        for (let product of lista) {
            const [prod] = await db("products").where({
                id: product.product_id
            })
            prodList.push(prod)
        }

        const [user] = await db("users").where({id: purchases.buyer})
 
        const result = {
            
            purchase_id: purchases.id,
            buyerId: user.id,
            buyerName: user.name,
            buyerEmail: user.email,
            totalPrice:purchases.total_price,
            createAt: purchases.createAt,
            products: prodList

        }

        res.status(200).send(result)
    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.status(500).send('Error desconhecido')
        }
    }
});
 */







