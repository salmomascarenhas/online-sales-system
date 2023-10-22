import { randomUUID } from 'node:crypto'
import { Product } from '../entities/Product'
import { InMemoryOrdersRepository } from '../repositories/in-memory/in-memory-orders-repository'
import { CreateOrderUsecase } from './create-order-use-case'
import { CPF, InvalidCPFError } from '../common/value-objects/cpf.vo'

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
            cpf: new CPF('364.303.290-03')
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
        try {
        const order = sut.execute({
            description: 'Order 1',
            products,
            discountCoupon: null,
            cpf: new CPF('364.303.290-04')
        });
        // Se chegou aqui, o CPF é válido, o que é um erro neste teste.
        fail('Expected an InvalidCPFError');
        } catch (error) {
        expect(error).toBeInstanceOf(InvalidCPFError);
        }
    })
})