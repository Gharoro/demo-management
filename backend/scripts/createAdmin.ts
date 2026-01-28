import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../src/models/user.model";
import { UserRole } from "../src/enums/user.enum";
import logger from "../src/utils/logger";

dotenv.config();

interface AdminInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const createAdmin = async (admin: AdminInput) => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "");
    logger.info("Connected to MongoDB");

    const existingUser = await User.findOne({ email: admin.email });
    if (existingUser) {
      logger.error(`User with email ${admin.email} already exists`);
      await mongoose.disconnect();
      process.exit(1);
    }

    const newAdmin = await User.create({
      firstName: admin.firstName,
      lastName: admin.lastName,
      email: admin.email,
      password: admin.password,
      role: UserRole.ADMIN,
      isVerified: true,
    });

    logger.info(`Admin user created: ${newAdmin.email}`);

    await mongoose.disconnect();
    logger.info("Disconnected from MongoDB");
    process.exit(0);
  } catch (error) {
    logger.error("Error creating admin:", error);
    await mongoose.disconnect();
    process.exit(1);
  }
};

const args = process.argv.slice(2);
if (args.length < 4) {
  logger.error(
    "Usage: npx tsx scripts/createAdmin.ts <firstName> <lastName> <email> <password>",
  );
  process.exit(1);
}

const [firstName, lastName, email, password] = args;

createAdmin({ firstName, lastName, email, password });
