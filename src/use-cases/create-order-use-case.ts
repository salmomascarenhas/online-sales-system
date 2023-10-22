import { Order } from '../entities/Order'
import { OrdersRepository } from '../repositories/orders-repository'
import { Product } from '../entities/Product'
import { DiscountCoupon } from '../entities/DiscountCoupon'
import { CPF } from '../common/value-objects/cpf.vo'


interface CreateOrderUseCaseRequest {
    description: string
    products: Product[]
    discountCoupon: DiscountCoupon | null,
    cpf: CPF
}

interface CreateOrderUseCaseReponse {
    order: Order
}

export class CreateOrderUsecase {
    constructor(private ordersRepository: OrdersRepository) { }

    async execute({
        description,
        products,
        discountCoupon,
        cpf
    }: CreateOrderUseCaseRequest): Promise<CreateOrderUseCaseReponse> {
        const order = await this.ordersRepository.create({
            description,
            products,
            discountCoupon,
            cpf
        })
        return { order }
    }
}