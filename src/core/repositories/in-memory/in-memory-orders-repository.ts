import { Order } from '@/core/entities/Order'
import { OrdersRepository } from '../orders-repository'

export class InMemoryOrderRepository implements OrdersRepository {
    public items: Order[] = []

    async create(data: Order): Promise<Order> {
        const order: Order = {
            description: data.description,
            products: data.products,
            ticket: data.ticket
        }
        this.items.push(order)
        return order
    }
}