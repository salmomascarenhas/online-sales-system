import { OrdersRepository } from "../repositories/orders-repository"

interface CalculateTotalPriceOrderUseCaseRequest {
    orderId: string
}

interface CalculateTotalPriceOrderUseCaseResponse {
    totalPrice: number
}

export class CalculateTotalPriceOrderUseCase {
    constructor(private ordersRepository: OrdersRepository) { }

    async execute({ orderId }: CalculateTotalPriceOrderUseCaseRequest): Promise<CalculateTotalPriceOrderUseCaseResponse> {
        const totalPrice = await this.ordersRepository.calculateTotalPriceOrder(orderId)
        return { totalPrice }
    }

}