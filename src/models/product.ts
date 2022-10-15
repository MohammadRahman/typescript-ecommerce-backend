import mongoose from "mongoose";
import { CategoryDocument, CATERGORY } from "./category";
import { SubCategoryDocument, SUB_CATERGORY } from "./sub-category";
import { UserDocument, USER_MODEL } from "./user";

export interface ProductInput {
  name: string;
  price: number;
  image?: string;
  quantity?: number;
  category: CategoryDocument["_id"];
  subCategory: SubCategoryDocument["_id"];
  createdBy: UserDocument["_id"];
}
export interface ProductDocument extends ProductInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: String,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: USER_MODEL,
    },
    quantity: {
      type: Number,
      default: 1,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: CATERGORY,
    },
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: SUB_CATERGORY,
    },
  },
  { timestamps: true }
);
export const PRODUCT_MODEL = mongoose.model<ProductDocument>(
  "products",
  productSchema
);
