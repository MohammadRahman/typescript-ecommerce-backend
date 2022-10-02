import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { config } from "../utils/config";

export interface UserInput {
  name: string;
  email: string;
  password: string;
}
export interface UserDocument extends UserInput, mongoose.Document {
  comparePassword(suppliedPassword: string): Promise<boolean>;
  role: string;
}

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    text: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "guest", "editor"],
    default: "admin",
  },
});
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(config.SALT);
  this.password = await bcrypt.hash(this.password, salt);
  return next();
});
userSchema.methods.comparePassword = async function (
  suppliedPassword: string
): Promise<boolean> {
  return await bcrypt
    .compare(suppliedPassword, this.password)
    .catch((e) => false);
};

export const USER_MODEL = mongoose.model<UserDocument>("users", userSchema);
