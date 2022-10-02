import { CategoryInput, CATERGORY } from "../models/category";

export async function createCategory(input: CategoryInput) {
  try {
    return await CATERGORY.create(input);
  } catch (error) {
    return console.log(error);
  }
}
export async function getCategoryService() {
  try {
    return await CATERGORY.find({}).lean();
  } catch (error) {
    return console.log(error);
  }
}
