import { TUsers, TProducts } from "./types";

export const arrayDeusuarios: Array<TUsers> = [
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

export const arrayDeProdutos: Array<TProducts> = [
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

