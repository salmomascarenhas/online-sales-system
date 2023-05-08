import { Order } from '@/entities/Order'
import { OrdersRepository } from '../orders-repository'
import { randomUUID } from 'crypto'

export class InMemoryOrderRepository implements OrdersRepository {
    public items: Order[] = []

    async create(data: Order): Promise<Order> {
        const order: Order = {
            id: data.id ?? randomUUID(),
            description: data.description,
            products: data.products,
            ticket: data.ticket
        }
        this.items.push(order)
        return order
    }
}