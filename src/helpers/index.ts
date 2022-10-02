import jwt from "jsonwebtoken";
import { config } from "../utils/config";

export function createSigntoken(payload: string | Buffer | object) {
  return jwt.sign(payload, config.JWT_SECRET, { expiresIn: "15min" });
}

export function verifyJwt(token: string) {
  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    return decoded;
  } catch (error) {
    return null;
  }
}

export function omit<T>(obj: T, property: keyof T | (keyof T)[]) {
  if (Array.isArray(property)) {
    const entries = Object.entries(obj).filter((item) => {
      const [key] = item;

      return !property.includes(key as keyof T);
    });

    return Object.fromEntries(entries);
  }

  const { [property]: unused, ...rest } = obj;

  return rest;
}

export default omit;
