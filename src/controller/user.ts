import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { createSigntoken } from "../helpers";
import { CreateUserInput, LogInInput } from "../schema/userSchmea";
import { createUserService, loginService } from "../service/user";

async function createUserHandler(
  req: Request<{}, {}, CreateUserInput["body"]>,
  res: Response
) {
  try {
    const user = await createUserService(req.body);
    return res.send(user);
  } catch (e: any) {
    return res.status(400).json(e.errors);
  }
}

async function loginHandler(
  req: Request<{}, {}, LogInInput["body"]>,
  res: Response
) {
  try {
    const { email, password } = req.body;
    const user = await loginService(email);
    if (!user || !(await user.comparePassword(password))) {
      return res.status(StatusCodes.BAD_REQUEST).send("Invalid Credentials");
    }
    const payload = user.toJSON();
    const jwtToken = createSigntoken(payload);
    res.cookie("accessToken", jwtToken, {
      maxAge: 3.154e10, // 1 year
      httpOnly: true, // that will not let javascript access on cookie
      domain: "localhost",
      path: "/api/1.0.0/user",
      sameSite: "strict",
      secure: false,
    });
    return res.status(StatusCodes.OK).json({ message: "success", jwtToken });
  } catch (error: any) {
    throw new Error(error);
  }
}

export { createUserHandler, loginHandler };
