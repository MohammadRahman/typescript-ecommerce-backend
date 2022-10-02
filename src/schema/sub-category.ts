import { object, string, TypeOf } from "zod";

export const subCategory = object({
  body: object({
    name: string({ required_error: "Name is required" }),
    category: string(),
  }),
});

export type SubcategoryInp = TypeOf<typeof subCategory>;
