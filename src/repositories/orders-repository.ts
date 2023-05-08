import { Order } from '../entities/Order'
export interface OrdersRepository {
    create(data: Order): Promise<Order>
}