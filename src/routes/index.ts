import { Express, Response, Request } from "express";
import { processRequestBody } from "zod-express-middleware";
import {
  createCategoryHandler,
  getCategoryHadnler,
} from "../controller/category";
import {
  createOrderHandler,
  findAllOrdersDetail,
  findOneAndUpdateOrder,
  findOneOrderHandler,
} from "../controller/orders";
import {
  createProductHandler,
  deleteProductHandler,
  findOneProduct,
  getAllProducts,
  updateProduct,
} from "../controller/product";
import { createSubCategoryHandler } from "../controller/sub-category";
import { createUserHandler, loginHandler } from "../controller/user";
import { requireAdmin, requireSignIn } from "../middlewares/authorization";
import { validate } from "../middlewares/validateResource";
import { createCategorySchema } from "../schema/category";
import { createOrderSchema } from "../schema/order";
// import { createOrderSchema } from "../schema/order";
import { CreateProductSchema, getProduct } from "../schema/product";
import { subCategory } from "../schema/sub-category";
import { createUserSchema, userLogInSchema } from "../schema/userSchmea";

export const routes = (app: Express) => {
  app.get("/health-check", (req: Request, res: Response) => {
    res.sendStatus(200);
  });
  /*Health check*/

  app.get("/api/v1/user", (req, res) => {
    return res.send(res.locals.user);
  });
  /*Authentication Routes*/
  // create user
  app.post("/api/1.0.0/users", validate(createUserSchema), createUserHandler);
  // user login
  app.post("/api/1.0.0/user", validate(userLogInSchema), loginHandler);
  /* Product Route */
  //Create new Product
  app.post(
    "/api/1.0.0/product",
    validate(CreateProductSchema),
    createProductHandler
  );
  // Get all Products
  app.get("/api/1.0.0/get/products", getAllProducts);
  app.get("/api/1.0.0/get/product/:id", validate(getProduct), findOneProduct);
  // update one Product
  app.put(
    "/api/1.0.0/product/update/:id",
    // validate(CreateProductSchema),
    updateProduct
  );
  app.delete(
    "/api/1.0.0/product/delete/:id",
    // validate(CreateProductSchema),
    deleteProductHandler
  );

  /* OrderRoutes*/
  app.post(
    "/api/1.0.0/orders",
    validate(createOrderSchema),
    createOrderHandler
  );
  app.get("/api/1.0.0/get/order/:id", findOneOrderHandler),
    app.put("/api/1.0.0/update/order/:id", findOneAndUpdateOrder),
    app.get("/api/1.0.0/get/all/orders", findAllOrdersDetail),
    /*Protecte Routes*/

    // requires sign-in
    app.get(
      "/api/1.0.0/private",
      requireSignIn,
      (req: Request, res: Response) => {
        res.send("Logged In route");
      }
    );
  app.get(
    "/api/1.0.0/admin",
    requireSignIn,
    requireAdmin,
    (req: Request, res: Response) => {
      res.send("Logged In as admin");
    }
  );
  /*Category Routes*/
  app.post(
    "/api/1.0.0/create/category",
    validate(createCategorySchema),
    createCategoryHandler
  );
  app.get("/api/1.0.0/get/category", getCategoryHadnler);
  /*SubCategory Routes*/
  app.post(
    "/api/1.0.0/create/sub-category",
    validate(subCategory),
    createSubCategoryHandler
  );
};
