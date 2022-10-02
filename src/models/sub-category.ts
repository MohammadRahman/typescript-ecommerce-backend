import mongoose from "mongoose";
import { CategoryDocument, CATERGORY } from "./category";

export interface SubCategoryInput {
  name: string;
  category: CategoryDocument["_id"];
}
export interface SubCategoryDocument
  extends SubCategoryInput,
    mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const subCategorySchema = new mongoose.Schema(
  {
    name: String,
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: CATERGORY,
    },
  },
  { timestamps: true }
);

export const SUB_CATERGORY = mongoose.model<SubCategoryDocument>(
  "SubCategory",
  subCategorySchema
);
