// import { ProductBodyValidation } from './product';
import { boolean, number, object, string, TypeOf } from "zod";

// export const createProductSchema = object({
//   body: object({
//     name: string({ required_error: "Product name is required" }),
//     price: number({ required_error: "Product price is required" }),
//     image: string({ required_error: "Product image is required" }),
//     createdBy: string({ required_error: "User id is required" }),
//     category: string({ required_error: "User id is required" }),
//     subCategory: string({ required_error: "User id is required" }),
//   }),
// });

// export type CreateProductInput = TypeOf<typeof createProductSchema>;

export const productSchema = {
  body: object({
    name: string({ required_error: "Product Title is required" }),
    price: number({ required_error: "Set the price for the product" }),
    image: string().optional(),
    quantity: number({ required_error: "Set the quantity for the product" }),
    createdBy: string({ required_error: "User Id is required" }),
    category: string({ required_error: "Set the category" }),
    subCategory: string({ required_error: "set the sub category" }),
  }),
  params: object({
    productId: string(),
  }),
};
// export type ProductBodyValidation = TypeOf<typeof productSchema.body>;
export type ProductId = TypeOf<typeof productSchema.params>;

const payload = {
  body: object({
    name: string({ required_error: "Product Title is required" }),
    price: number({ required_error: "Set the price for the product" }),
    image: string().optional(),
    quantity: number({
      required_error: "Set the quantity for the product",
    }).optional(),
    createdBy: string({ required_error: "User Id is required" }),
    category: string({ required_error: "Set the category" }),
    subCategory: string({ required_error: "set the sub category" }),
  }),
};
const params = {
  params: object({
    id: string(),
  }),
};

// const updatePayload = {
//   body: object({
//     name: string({ required_error: 'Product Title is required' }),
//     price: number({ required_error: 'Set the price for the product' }),
//     image: string().optional(),
//     quantity: number({ required_error: 'Set the quantity for the product' }).optional(),
//   })
// }

export const CreateProductSchema = object({
  ...payload,
});
const UpdateProduct = object({
  ...params,
  ...payload,
});
export const getProduct = object({
  ...params,
});

export type ProductBodyValidation = TypeOf<typeof CreateProductSchema>;
export type UpdateProductValidation = TypeOf<typeof UpdateProduct>;
export type FindProduct = TypeOf<typeof getProduct>;

// export const findOneProductAndUpdate = object({
//   body: object({
//     name: string(),
//     price: number(),
//     image: string(),
//     createdBy: string(),
//   }),
// });
// export type ProductUpDate = TypeOf<typeof findOneProductAndUpdate>;
