import { Product } from './Product'
import { DiscountCoupon } from './DiscountCoupon'
import { CPF } from '../common/value-objects/cpf.vo'

export type Order = {
    id: string
    description: string
    products: Product[]
    discountCoupon?: DiscountCoupon | null
    cpf: CPF
}