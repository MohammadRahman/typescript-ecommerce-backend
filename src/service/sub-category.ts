import { SubCategoryInput, SUB_CATERGORY } from "../models/sub-category";

export async function subCategoryService(input: SubCategoryInput) {
  try {
    return await SUB_CATERGORY.create(input);
  } catch (error) {
    console.log(error);
  }
}
