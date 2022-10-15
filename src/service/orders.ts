import { OrderDocument } from "./../models/order";
import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import { OrderInput, ORDER_MODEL } from "../models/order";

export async function createOrderService(input: OrderInput) {
  try {
    return await ORDER_MODEL.create(input);
  } catch (error: any) {
    throw new Error(error.message);
  }
}
export async function findOneOrderDetails(query: OrderDocument["_id"]) {
  try {
    return await ORDER_MODEL.findById(query)
      .populate("userId")
      .populate("productId")
      .lean();
  } catch (error: any) {
    return "Invalid";
  }
}
export async function findAllOrderDetails() {
  try {
    return await ORDER_MODEL.find({});
    // .populate("userId")
    // .populate("productId");
  } catch (error: any) {
    throw new Error(error.message);
  }
}
export async function findOneAndUpdate(
  query: FilterQuery<OrderDocument>,
  update: UpdateQuery<OrderDocument>,
  options: QueryOptions
) {
  try {
    return await ORDER_MODEL.findOneAndUpdate(query, update, options);
  } catch (error) {
    console.log(error);
  }
}
