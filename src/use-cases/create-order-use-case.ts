import { Order } from '../entities/Order'
import { OrdersRepository } from '../repositories/orders-repository'
import { Product } from '../entities/Product'
import { DiscountCoupon } from '../entities/DiscountCoupon'


interface CreateOrderUseCaseRequest {
    description: string
    products: Product[]
    discountCoupon: DiscountCoupon | null
}

interface CreateOrderUseCaseReponse {
    order: Order
}

export class CreateOrderUsecase {
    constructor(private ordersRepository: OrdersRepository) { }

    async execute({
        description,
        products,
        discountCoupon
    }: CreateOrderUseCaseRequest): Promise<CreateOrderUseCaseReponse> {
        const order = await this.ordersRepository.create({
            description,
            products,
            discountCoupon
        })

        return { order }
    }
}