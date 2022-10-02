import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";
import { USER_MODEL } from "../models/user";
import { CreateOrder, FindOrder, UpdateOrder } from "../schema/order";
import { createOrderService, findAllOrderDetails, findOneAndUpdate, findOneOrderDetails } from "../service/orders";

export async function createOrderHandler(
  req: Request<{}, {}, CreateOrder['body']>,
  res: Response
) {
  try {
    // const additionalId = req.params.id,
    // const userId = res.locals.user._id
    // const body = req.body
    // const order = await createOrderService({...body,userId: userId})
    const order = await createOrderService(req.body);
    return res.status(200).json({
      message: "order created",
      order
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
}
export async function findOneOrderHandler(
  req: Request<FindOrder['params'], {}, {}>,
  res: Response
) {
  const { id } = req.params
  try {
    const order = await findOneOrderDetails(id);
    console.log(req.params.id)
    if (!order) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Not found"
      })
    }
    return res.status(200).json({
      message: "order details",
      order
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function findAllOrdersDetail(req: Request, res: Response) {
  try {
    const orders = await findAllOrderDetails()
    return res.status(StatusCodes.OK).json(orders)
  } catch (error) {

  }
}

export async function findOneAndUpdateOrder(req: Request<UpdateOrder['params']>, res: Response) {
  try {
    const orderId = req.params.id
    const update = req.body
    // const userId = req.user
    // const isAdmin = await USER_MODEL.findOne(userId)

    // if (!isAdmin?.role.includes('admin')) {
    //   return res.status(StatusCodes.FORBIDDEN).json({
    //     message: 'Admin Access'
    //   })
    // }
    const updateOrder = await findOneAndUpdate({ orderId }, { ...update }, { new: true })
    res.send(updateOrder)
  } catch (error) {
    console.log(error)
  }
}