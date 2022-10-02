import { QueryOptions, UpdateQuery, FilterQuery } from "mongoose";
import {
  ProductDocument,
  ProductInput,
  PRODUCT_MODEL,
} from "../models/product";

export async function createProductService(input: ProductInput) {
  try {
    return await PRODUCT_MODEL.create(input);
  } catch (error: any) {
    return 'Server error';
  }
}
export async function getProductsService() {
  try {
    return await PRODUCT_MODEL.find({}).lean();
  } catch (error: any) {
    return 'Server Error';
  }
}
export async function findOneProductDetails(query: ProductDocument['_id']) {
  // try {
  return await PRODUCT_MODEL.findById(query)
  // ? later add populate to display all the objectId's
  // .populate('userId').populate('productId').lean();

  // bug why try-catch block is'nt allowing certain feature
  // } catch (error: any) {
  //   return 'Invalid'
  // }
}
export async function findOneAndUpdateProductService(
  queryParams: FilterQuery<ProductDocument['_id']>, updateFileds: UpdateQuery<ProductDocument>, otherOptions: QueryOptions
) {
  try {
    return await PRODUCT_MODEL.findOneAndUpdate(queryParams, updateFileds, otherOptions);
  } catch (error: any) {
    throw new error
  }
}

export async function deleteProductService(query: FilterQuery<ProductDocument['_id']>) {
  try {
    return await PRODUCT_MODEL.findOneAndDelete(query)
  } catch (error) {
    console.log(error)
  }
}