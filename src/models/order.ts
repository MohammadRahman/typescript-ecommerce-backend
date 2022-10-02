import { ProductDocument, PRODUCT_MODEL } from "./product";
import { UserDocument, USER_MODEL } from "./user";
import { Schema, Document, model } from "mongoose";
// import mongoose from "mongoose";
import moment from "moment";

export interface OrderInput {
  status: boolean;
  userId: UserDocument["_id"];
  productId: ProductDocument["_id"];
  price: number

}
export interface OrderDocument extends OrderInput, Document {
  createdAt: Date;
  updatedAt: Date;
  expiresAt: Date;
}

const orderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: USER_MODEL,
    },
    productId: [{
      type: Schema.Types.ObjectId,
      ref: PRODUCT_MODEL,
    }],
    status: {
      type: Boolean,
      default: false,
    },
    price: Number,
    expiresAt: {
      type: Date,
      default: () => moment().add(30, 'days').calendar()
    },
  },
  { timestamps: true }
);

export const ORDER_MODEL = model<OrderDocument>("Orders", orderSchema);
