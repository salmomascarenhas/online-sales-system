import { Product } from './Product'
import { Ticket } from './Ticket'

export type Order = {
    id?: string
    description: string
    products: Product[]
    ticket?: Ticket | null
}