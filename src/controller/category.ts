import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { createCategory, getCategoryService } from "../service/category";
import { createCategoryInput } from "../schema/category";
// import { omit } from "../helpers";

export async function createCategoryHandler(
  req: Request<{}, {}, createCategoryInput["body"]>,
  res: Response
) {
  try {
    const category = await createCategory(req.body);
    // return res.send(omit(category?.toJSON(),['__v']));
    return res.status(StatusCodes.CREATED).send(category);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send(error);
  }
}
export async function getCategoryHadnler(req: Request, res: Response) {
  try {
    const category = await getCategoryService();
    return res.status(StatusCodes.OK).json(category);
  } catch (error) {
    console.log(error);
  }
}
