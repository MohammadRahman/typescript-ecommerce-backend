import request from "supertest";
import { createServer } from "../utils/createServer";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

const app = createServer();

beforeAll(async () => {
  const mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});
afterAll(async () => {
  await mongoose.disconnect();
  await mongoose.connection.close();
});
describe("Product", () => {
  it("should return 404", async () => {
    const productId = "product-123";
    await request(app).get(`/api/1.0.0/get/products/${productId}`).expect(404);
  });
});
// later need to add tests files
