import { Order } from '../entities/Order'
import { OrdersRepository } from '../repositories/orders-repository'
import { Product } from '../entities/Product'
import { Ticket } from '../entities/DiscountCoupon'


interface CreateOrderUseCaseRequest {
    description: string
    products: Product[]
    ticket: Ticket | null
}

interface CreateOrderUseCaseReponse {
    order: Order
}

export class CreateOrderUsecase {
    constructor(private ordersRepository: OrdersRepository) { }

    async execute({
        description,
        products,
        ticket
    }: CreateOrderUseCaseRequest): Promise<CreateOrderUseCaseReponse> {
        const order = await this.ordersRepository.create({
            description,
            products,
            ticket
        })

        return { order }
    }
}