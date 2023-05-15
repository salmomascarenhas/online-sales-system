import { Product } from "@/entities/Product"
import { DiscountCoupon } from "@/entities/DiscountCoupon"


export type OrderCreateInput = {
    id?: string
    description: string
    products: Product[]
    discountCoupon?: DiscountCoupon | null
}