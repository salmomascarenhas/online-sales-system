import { Product } from './Product'
import { Ticket } from './Ticket'

export type Order = {
    description: string
    products: Product[]
    ticket?: Ticket | null
}