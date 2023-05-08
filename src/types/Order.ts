import { Product } from "@/entities/Product"
import { Ticket } from "@/entities/Ticket"


export type OrderCreateInput = {
    id?: string
    description: string
    products: Product[]
    ticket?: Ticket | null
}