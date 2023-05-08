import { randomUUID } from "node:crypto"

export class Product {
    id: string
    amount: number
    price: number
    description: string
    constructor(amount: number, price: number, description: string, id?: string,) {
        this.id = id || randomUUID()
        this.amount = amount
        this.price = price
        this.description = description
    }
}