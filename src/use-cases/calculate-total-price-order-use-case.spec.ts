import { InMemoryOrdersRepository } from '../repositories/in-memory/in-memory-orders-repository'
import { CalculateTotalPriceOrderUseCase } from "./calculate-total-price-order-use-case"
import { randomUUID } from 'node:crypto'
import { Product } from '@/entities/Product'

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
        const order = await orderRepository.create({
            description: 'Order 1',
            products,
            discountCoupon: null,
            cpf: '364.303.290-03'
        })
        const { totalPrice } = await sut.execute({ orderId: order.id })
        expect(totalPrice).toBe(1 * 100 + 2 * 200 + 3 * 100)
    })

    it('should ble able create an order with 3 products, associate cupom and calculate total price order', async () => {
        const products: Product[] = [
            { id: randomUUID(), amount: 1, price: 100, description: 'Product 1' },
            { id: randomUUID(), amount: 2, price: 200, description: 'Product 2' },
            { id: randomUUID(), amount: 3, price: 100, description: 'Product 3' }
        ]
        const discountCoupon = { id: randomUUID(), code: 'VALE20', percentValue: 0.50 }
        const order = await orderRepository.create(
            {
                description: 'Order 1',
                products,
                discountCoupon,
                cpf: '364.303.290-03'
            })
        const { totalPrice } = await sut.execute({ orderId: order.id })
        expect(order.products).toHaveLength(3)
        expect(order).toHaveProperty('id')
        expect(totalPrice).toEqual(400)

    })
})