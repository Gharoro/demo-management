import mongoose from "mongoose";
import logger from "../utils/logger";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "");
    logger.info("MongoDB Connected");
  } catch (error) {
    logger.error(`Error: ${(error as Error).message}`);
    process.exit(1);
  }
};

export default connectDB;
