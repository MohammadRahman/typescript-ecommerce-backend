import { envSchema } from "env-schema";
import { Static, Type } from "@sinclair/typebox";
import dotenv from "dotenv";
dotenv.config();

const schema = Type.Object({
  PORT: Type.Number({
    default: process.env.PORT,
  }),
  //   HOST: Type.String({
  //     default: "0.0.0.0",
  //   }),
  SALT: Type.Number({
    default: process.env.SALT,
  }),
  //   EXPIRES_IN: Type.String({
  //     default: "7d",
  //   }),
  JWT_SECRET: Type.String({
    default: process.env.JWT_SECRET,
  }),
  DATABASE_URL: Type.String(),
});

type Env = Static<typeof schema>;

export const config = envSchema<Env>({
  schema,
  dotenv: true,
});
