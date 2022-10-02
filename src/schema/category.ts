import { nativeEnum, object, string, TypeOf } from "zod";
import { CategoryEnum } from "../models/category";
export const createCategorySchema = object({
  body: object({
    name: nativeEnum(CategoryEnum),
  }),
});

export type createCategoryInput = TypeOf<typeof createCategorySchema>;
