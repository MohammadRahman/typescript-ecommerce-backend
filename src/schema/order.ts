// import { createOrderSchema } from './order';
import { object, TypeOf, string, date, boolean, number, array } from "zod";

// export const createOrderSchema = {
//   body: object({
//     userId: string({ required_error: "user Id is required" }),
//     productId: string({ required_error: "Product Id is required" }),
//     status: boolean({ required_error: "select current status required" }),
//     price: number({ required_error: 'price is required' }).min(1)
//   }),
//   params: object({
//     id: string()
//   })
// }
// export type createOrderInput = TypeOf<typeof createOrderSchema.body>;
// export type orderParams = TypeOf<typeof createOrderSchema.params>;

const payload = {
  body: object({
    userId: string({ required_error: "user Id is required" }).min(1),
    productId: array(string({ required_error: 'add some products to your cart' })).min(1),
    status: boolean({ required_error: "select current status required" }),
    price: number({ required_error: 'price is required' }).min(1)
  })
}

const params = {
  params: object({
    id: string({ required_error: 'Id is required' })
  })
}

export const createOrderSchema = object({ ...payload })
const updateOrderSchema = object({ ...payload, ...params })
const findOrderSchema = object({ ...params })

export type CreateOrder = TypeOf<typeof createOrderSchema>
export type UpdateOrder = TypeOf<typeof updateOrderSchema>
export type FindOrder = TypeOf<typeof findOrderSchema>

