import { Order } from '@/entities/Order'
import { OrdersRepository } from '../orders-repository'
import { randomUUID } from 'crypto'
import { OrderCreateInput } from '@/types/OrderCreateInput'
import { Product } from '../../entities/Product'

export class InMemoryOrdersRepository implements OrdersRepository {
    public items: Order[] = []
    async create(data: OrderCreateInput): Promise<Order> {
        const order: Order = {
            id: data.id ?? randomUUID(),
            description: data.description,
            products: data.products,
            discountCoupon: data.discountCoupon,
            cpf: data.cpf
        }
        this.items.push(order)
        return order
    }

    async calculateTotalPriceOrder(orderId: string): Promise<number> {
        const order = await this.findById(orderId)
        const totalPrice : number = order.products.reduce((total : number, product : Product) : number => total += (product.amount * product.price), 0)
        const discount : number = order.discountCoupon ? totalPrice * order.discountCoupon.percentValue : 0
        return totalPrice - discount
    }

    async findById(orderId: string): Promise<Order> {
        const order: Order | undefined = this.items.find((order : Order) : boolean => order.id === orderId)
        if (!order)
            throw new Error('Order not found')
        return order
    }
}