import { Product } from "@/entities/Product"
import { DiscountCoupon } from "@/entities/DiscountCoupon"
import { CPF } from "../common/value-objects/cpf.vo"


export type OrderCreateInput = {
    id?: string
    description: string
    products: Product[]
    discountCoupon?: DiscountCoupon | null
    cpf: CPF
}