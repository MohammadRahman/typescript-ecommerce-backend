import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { routes } from "../routes";

export async function createServer() {
  const app = express();
  app.use(express.json());
  var corsOptions = {
    credentials: true,
    origin: "http://localhost:3001",
    // optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  };

  app.use(cors());

  app.use(cookieParser());

  routes(app);

  return app;
}
