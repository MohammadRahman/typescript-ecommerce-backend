import { NextFunction } from "express";
import { Response } from "express";
import { Request } from "express";
import { StatusCodes } from "http-status-codes";

export function requireSignIn(req: Request, res: Response, next: NextFunction) {
  const user = res.locals.user;
  if (!user) return res.sendStatus(StatusCodes.FORBIDDEN);
  return next();
}

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const user = res.locals.user;
  if (!user.role.includes("admin"))
    return res.sendStatus(StatusCodes.FORBIDDEN);
  return next();
}
