import { InMemoryOrdersRepository } from '../repositories/in-memory/in-memory-orders-repository'
import { CalculateTotalPriceOrderUseCase } from "./calculate-total-price-order-use-case"
import { randomUUID } from 'node:crypto'

let orderRepository: InMemoryOrdersRepository
let sut: CalculateTotalPriceOrderUseCase

describe(' Calculate Total Price Order UseCase', () => {
    beforeEach(() => {
        orderRepository = new InMemoryOrdersRepository()
        sut = new CalculateTotalPriceOrderUseCase(orderRepository)
    })

    it('should be able calculate total price order', async () => {
        const products = [
            { id: randomUUID(), amount: 1, price: 100, description: 'Product 1' },
            { id: randomUUID(), amount: 2, price: 200, description: 'Product 2' },
            { id: randomUUID(), amount: 3, price: 100, description: 'Product 3' }
        ]

        const order = await orderRepository.create({ description: 'Order 1', products, ticket: null })
        const { totalPrice } = await sut.execute({ orderId: order.id })
        expect(totalPrice).toBe(1 * 100 + 2 * 200 + 3 * 100)
    })
})