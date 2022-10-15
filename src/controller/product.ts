import { Response } from "express";
import { Request } from "express";
import { StatusCodes } from "http-status-codes";
import { FindProduct, ProductBodyValidation } from "../schema/product";
import {
  createProductService,
  deleteProductService,
  findOneAndUpdateProductService,
  findOneProductDetails,
  getProductsService,
} from "../service/products";
import { USER_MODEL } from "../models/user";

export async function createProductHandler(
  req: Request<{}, {}, ProductBodyValidation["body"]>,
  res: Response
) {
  try {
    //! get userId
    //! const userId = res.locals.user._id
    //! const {otherfieldsOFbody} = req.body
    //! const product = await createProductService(...req.body, {user: userId})
    const product = await createProductService(req.body);
    return res.status(StatusCodes.OK).json({
      message: "Product created",
      product,
    });
  } catch (error) {
    console.log(error);
  }
}

export async function findOneProduct(
  req: Request<FindProduct["params"]>,
  res: Response
) {
  try {
    const { id } = req.params;
    const product = await findOneProductDetails(id);
    if (!product) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Nomeproduct found",
      });
    } else {
      return res.status(StatusCodes.OK).send(product);
    }

    //! return res.send(omit(product,'createdBy'))
  } catch (error) {
    console.log(error);
  }
}

export async function getAllProducts(req: Request, res: Response) {
  try {
    const products = await getProductsService();
    if (products.length < 0) {
      return res.send({ message: "No product found" });
    }
    res.status(StatusCodes.OK).json({
      message: "Success",
      products,
    });
  } catch (error) {}
}
export async function updateProduct(
  req: Request<FindProduct["params"]>,
  res: Response
) {
  try {
    //! check the userId, restrict users if the created user and updated user are not same,
    //!however if ther user role is admin could also update rproduct
    //! const userId = req.user.id

    const userId = "63009c44d517d6c60617915b";
    const { id } = req.params;
    //! get admin user users
    const adminUser = await USER_MODEL.findById({ _id: userId });
    const update = req.body;
    const product = await findOneProductDetails(id);
    if (String(product?.createdBy) !== userId && adminUser?.role !== "admin") {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "un-authorised",
      });
    }
    const updateProduct = await findOneAndUpdateProductService(
      { id },
      { ...update },
      { new: true }
    );
    return res
      .status(StatusCodes.OK)
      .json({ message: "productUpdated", updateProduct });
  } catch (error) {
    console.log(error);
  }
}

export async function deleteProductHandler(
  req: Request<FindProduct["params"]>,
  res: Response
) {
  try {
    const id = req.params.id;
    // ! add condition here that the user trying to dlete is the product owner!
    // ! or an Admin
    const product = await deleteProductService({ id });
    return res.status(StatusCodes.OK).json({
      message: "Product deleted!",
    });
  } catch (error) {
    console.log(error);
  }
}
