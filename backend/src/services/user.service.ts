import { UserRole } from "../enums/user.enum";
import User from "../models/user.model";
import { AppError } from "../utils/appError";
import logger from "../utils/logger";

class UserService {
  private generateSixDigitToken(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  async checkUserExists(email: string) {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return {
        exists: false,
        isVerified: false,
        userId: null,
        verificationToken: null,
      };
    }
    return {
      exists: true,
      isVerified: user.isVerified,
      userId: user._id,
      verificationToken: user.verificationToken || null,
    };
  }

  async createUser(data: {
    firstName: string;
    lastName: string;
    email: string;
  }) {
    const user = await User.create({
      ...data,
      email: data.email.toLowerCase(),
    });
    const userObject = user.toObject();
    delete userObject.password;
    return userObject;
  }

  async generateVerificationToken(userId: string) {
    const token = this.generateSixDigitToken();
    await User.findByIdAndUpdate(userId, { verificationToken: token });
    return token;
  }

  async verifyEmail(email: string, token: string) {
    const user = await User.findOne({
      email: email.toLowerCase(),
      verificationToken: token,
    });
    if (!user) {
      throw new AppError("Invalid verification token", 400);
    }
    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();
    return {
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    };
  }

  async resendToken(email: string) {
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      throw new AppError("User not found", 404);
    }

    if (user.isVerified) {
      return { userId: user._id.toString(), isVerified: true };
    }

    const token = this.generateSixDigitToken();
    user.verificationToken = token;
    await user.save();

    return {
      userId: user._id.toString(),
      isVerified: false,
      verificationToken: token,
    };
  }

  async login(email: string) {
    const user = await User.findOne({
      email: email.toLowerCase(),
      isVerified: true,
    });
    if (!user) {
      logger.warn(
        `Failed login attempt: ${email.toLowerCase()} - User not found or not verified`,
      );
      throw new AppError("User not found or email not verified", 400);
    }
    return {
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    };
  }

  async adminLogin(email: string, password: string) {
    const normalizedEmail = email.toLowerCase();
    const user = await User.findOne({ email: normalizedEmail }).select(
      "+password",
    );

    if (!user || user.role !== UserRole.ADMIN) {
      logger.warn(
        `Failed admin login attempt: ${normalizedEmail} - User not found or not admin`,
      );
      throw new AppError("Invalid credentials", 401);
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      logger.warn(
        `Failed admin login attempt: ${normalizedEmail} - Invalid password`,
      );
      throw new AppError("Invalid credentials", 401);
    }

    logger.info(`Successful admin login: ${normalizedEmail}`);
    return {
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    };
  }
}

export default new UserService();
