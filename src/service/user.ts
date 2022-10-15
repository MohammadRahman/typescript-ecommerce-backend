import { UserInput } from "./../models/user";
import { USER_MODEL } from "../models/user";
import { log } from "../utils/logger";

export async function createUserService(input: UserInput) {
  try {
    return await USER_MODEL.create(input);
  } catch (error: any) {
    log.error(error.message);
  }
}

export async function loginService(email: string) {
  try {
    return await USER_MODEL.findOne({ email });
  } catch (error: any) {
    throw new Error(error);
  }
}
// wanna check releases in action
