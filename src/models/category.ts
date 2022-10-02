// import { CategoryInput } from './category';
import mongoose from "mongoose";


export enum CategoryEnum {
  Tv = 'tv',
  It = 'it',
  Phones = 'phone',
  Audion = 'audio',
  Appliance = 'appliance',
  Housekeeping = 'housekeeping',
  Kitchen = 'kitchen',
  Entertainment = 'entertainment'

}
export interface CategoryInput {
  name: CategoryEnum;
}
export interface CategoryDocument extends CategoryInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      enum: Object.values(CategoryEnum),
    }
  }, { timestamps: true });

export const CATERGORY = mongoose.model<CategoryDocument>(
  "Category",
  categorySchema
);
