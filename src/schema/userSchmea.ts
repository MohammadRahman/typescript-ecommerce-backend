import { object, string, TypeOf } from "zod";

export const createUserSchema = object({
  body: object({
    name: string({ required_error: "Name is required" }),
    email: string({ required_error: "Email is required" }).email(
      "Not a valid email"
    ),
    password: string({ required_error: "Password is required" }).min(
      6,
      "password has to be 6 chars"
    ),
  }),
});
export type CreateUserInput = TypeOf<typeof createUserSchema>;

export const userLogInSchema = object({
  body: object({
    email: string({ required_error: "Email is required" }),
    password: string({ required_error: "Password is required" }),
  }),
});

export type LogInInput = TypeOf<typeof userLogInSchema>;
