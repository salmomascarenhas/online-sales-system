import { Product } from '../entities/Product'
import { InMemoryOrderRepository } from '../repositories/in-memory/in-memory-orders-repository'
import { CreateOrderUsecase } from './create-order-use-case'

let orderRepository: InMemoryOrderRepository
let sut: CreateOrderUsecase

describe('Create Order )UseCase', () => {
    beforeEach(() => {
        orderRepository = new InMemoryOrderRepository()
        sut = new CreateOrderUsecase(orderRepository)
    })

    it('should ble able create an order with 3 products', async () => {
        const products: Product[] = [
            { amount: 1, price: 100, description: 'Product 1' },
            { amount: 2, price: 200, description: 'Product 2' },
            { amount: 3, price: 100, description: 'Product 3' }
        ]
        const { order } = await sut.execute({
            description: 'Order 1',
            products,
            ticket: null
        })
        expect(order.products).toHaveLength(3)
    })
})