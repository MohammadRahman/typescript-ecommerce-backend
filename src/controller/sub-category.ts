import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { SubcategoryInp } from "../schema/sub-category";
import { subCategoryService } from "../service/sub-category";

export async function createSubCategoryHandler(
  req: Request<{}, {}, SubcategoryInp["body"]>,
  res: Response
) {
  try {
    const subs = await subCategoryService(req.body);
    return res.status(StatusCodes.CREATED).json(subs);
  } catch (error) {
    console.log(error);
  }
}
