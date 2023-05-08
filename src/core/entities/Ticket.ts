import { randomUUID } from 'node:crypto'
export class Ticket {
    id: string
    name: string
    price: number

    constructor(name: string, price: number, id?: string) {
        this.id = id || randomUUID()
        this.name = name
        this.price = price
    }
} 