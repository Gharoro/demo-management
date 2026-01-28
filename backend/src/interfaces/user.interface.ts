import { Document } from "mongoose";
import { UserRole } from "../enums/user.enum";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  role: UserRole;
  verificationToken?: string;
  isVerified: boolean;
  comparePassword(enteredPassword: string): Promise<boolean>;
  createdAt: Date;
  updatedAt: Date;
}
