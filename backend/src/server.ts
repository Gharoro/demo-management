import http from "http";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { createTerminus, HealthCheckError } from "@godaddy/terminus";
import app from "./app";
import connectDB from "./config/db";
import logger from "./utils/logger";

dotenv.config();

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

const onSignal = async () => {
  logger.info("Server is starting cleanup...");
  await mongoose.disconnect();
  logger.info("Cleanup finished, server is shutting down");
};

const onHealthCheck = async () => {
  if (mongoose.connection.readyState !== 1) {
    throw new HealthCheckError("mongodb disconnected", []);
  }
};

const options = {
  healthChecks: {
    "/health": onHealthCheck,
    verbatim: true,
  },
  onSignal,
};

createTerminus(server, options);

connectDB().then(() => {
  server.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
  });
});
