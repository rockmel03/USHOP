import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

export async function connectDB() {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      `\nMongoDB connect!! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.error("mongoDB connection Failed", error);
    process.exit(1);
  }
}
