import { Order } from '@/entities/Order'
import { OrdersRepository } from '../orders-repository'
import { randomUUID } from 'crypto'
import { OrderCreateInput } from '@/types/OrderCreateInput'

export class InMemoryOrdersRepository implements OrdersRepository {
    public items: Order[] = []
    async create(data: OrderCreateInput): Promise<Order> {
        const order: Order = {
            id: data.id ?? randomUUID(),
            description: data.description,
            products: data.products,
            discountCoupon: data.ticket
        }
        this.items.push(order)
        return order
    }

    async calculateTotalPriceOrder(orderId: string): Promise<number> {
        const order = await this.findById(orderId)
        const totalPrice = order.products.reduce((total, product) => total += (product.amount * product.price), 0)
        return totalPrice
    }

    async findById(orderId: string): Promise<Order> {
        const order = this.items.find(order => order.id === orderId)
        if (!order)
            throw new Error('Order not found')
        return order
    }
}