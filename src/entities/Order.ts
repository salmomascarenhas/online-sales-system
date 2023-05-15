import { Product } from './Product'
import { DiscountCoupon } from './DiscountCoupon'

export type Order = {
    id: string
    description: string
    products: Product[]
    discountCoupon?: DiscountCoupon | null
}