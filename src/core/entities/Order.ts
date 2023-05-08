import { Product } from './Product'
import { Ticket } from './Ticket'
import { randomUUID } from 'node:crypto'
export class Order {
    id: string
    products: Product[]
    description: string
    total: number = 0
    ticket: Ticket | null

    constructor(products: Product[], description: string, ticket?: Ticket, id?: string) {
        this.id = id || randomUUID()
        this.products = products
        this.description = description
        this.ticket = ticket || null
    }

    calculateTotal() {
        this.total = this.products.reduce((total, product) => total + product.price, 0)
    }

    addProduct(product: Product) {
        this.products.push(product)
        this.calculateTotal()
    }

}