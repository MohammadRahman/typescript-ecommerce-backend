import mongoose from "mongoose";
import { config } from "./config";
import { log } from "./logger";
export async function ConnetDb() {
  try {
    const con = await mongoose.connect(config.DATABASE_URL);
    log.info(`database connected`);
  } catch (error: any) {
    log.error(error.message);
    process.exit(1);
  }
}
