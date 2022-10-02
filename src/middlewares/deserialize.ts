import { Response, NextFunction, Request } from "express";
import { verifyJwt } from "../helpers";

export async function deserialiseUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const accessToken = (
    req.headers.authorization ||
    req.cookies.accessToken ||
    ""
  ).replace(/^Bearer\s/, "");
  if (!accessToken) return next();
  const decoded = verifyJwt(accessToken);
  if (decoded) {
    res.locals.user = decoded; // same as req.user = decoded
  }
  return next();
}
