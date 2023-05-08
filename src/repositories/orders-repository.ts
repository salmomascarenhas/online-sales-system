import { OrderCreateInput } from '@/types/Order'
import { Order } from '../entities/Order'
export interface OrdersRepository {
    calculateTotalPriceOrder(orderId: string): Promise<number>
    findById(orderId: string): Promise<Order | null>
    create(data: OrderCreateInput): Promise<Order>
}