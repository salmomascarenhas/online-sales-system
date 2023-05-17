import { randomUUID } from 'node:crypto'
import { Product } from '../entities/Product'
import { InMemoryOrdersRepository } from '../repositories/in-memory/in-memory-orders-repository'
import { CreateOrderUsecase } from './create-order-use-case'

let orderRepository: InMemoryOrdersRepository
let sut: CreateOrderUsecase

describe('Create Order )UseCase', () => {
    beforeEach(() => {
        orderRepository = new InMemoryOrdersRepository()
        sut = new CreateOrderUsecase(orderRepository)
    })

    it('should be able create an order with 3 products', async () => {
        const products: Product[] = [
            { id: randomUUID(), amount: 1, price: 100, description: 'Product 1' },
            { id: randomUUID(), amount: 2, price: 200, description: 'Product 2' },
            { id: randomUUID(), amount: 3, price: 100, description: 'Product 3' }
        ]
        const { order } = await sut.execute({
            description: 'Order 1',
            products,
            discountCoupon: null,
            cpf: '364.303.290-03'
        })
        expect(order.products).toHaveLength(3)
        expect(order).toHaveProperty('id')
    })

    it('should not be able create order with invalid cpf', async () => {
        const products: Product[] = [
            { id: randomUUID(), amount: 1, price: 100, description: 'Product 1' },
            { id: randomUUID(), amount: 2, price: 200, description: 'Product 2' },
            { id: randomUUID(), amount: 3, price: 100, description: 'Product 3' }
        ]
        await expect(sut.execute({
            description: 'Order 1',
            products,
            discountCoupon: null,
            cpf: '364.303.290-00'
        })).rejects.toThrowError('Invalid CPF')
    })
})