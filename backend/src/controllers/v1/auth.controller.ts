import { Request, Response, NextFunction } from "express";
import userService from "../../services/user.service";
import { ApiResponse } from "../../utils/response";
import { generateAccessToken } from "../../utils/jwt";

class AuthController {
  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { firstName, lastName, email } = req.body;

      const userCheck = await userService.checkUserExists(email.toLowerCase());

      if (userCheck.exists && userCheck.isVerified) {
        return res.status(200).json(
          ApiResponse.success(
            {
              userId: userCheck.userId,
              isVerified: true,
            },
            "User already verified",
            200,
          ),
        );
      }

      if (userCheck.exists && !userCheck.isVerified) {
        return res.status(200).json(
          ApiResponse.success(
            {
              userId: userCheck.userId,
              isVerified: false,
              verificationToken: userCheck.verificationToken,
            },
            "Please verify your email to continue",
            200,
          ),
        );
      }

      const user = await userService.createUser({
        firstName,
        lastName,
        email: email.toLowerCase(),
      });

      const verificationToken = await userService.generateVerificationToken(
        user._id.toString(),
      );

      res.status(201).json(
        ApiResponse.success(
          {
            userId: user._id,
            isVerified: false,
            verificationToken,
          },
          "Please verify your email to continue",
          201,
        ),
      );
    } catch (error) {
      next(error);
    }
  }

  async verifyEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, token } = req.body;

      await userService.verifyEmail(email.toLowerCase(), token);

      res
        .status(200)
        .json(
          ApiResponse.success(
            { isVerified: true },
            "Email verified successfully",
            200,
          ),
        );
    } catch (error) {
      next(error);
    }
  }

  async resendToken(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;

      const result = await userService.resendToken(email.toLowerCase());

      if (result.isVerified) {
        return res
          .status(200)
          .json(
            ApiResponse.success(
              { userId: result.userId, isVerified: true },
              "User is already verified",
              200,
            ),
          );
      }

      res.status(200).json(
        ApiResponse.success(
          {
            userId: result.userId,
            verificationToken: result.verificationToken,
          },
          "Verification token sent",
          200,
        ),
      );
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;

      const user = await userService.login(email.toLowerCase());

      const accessToken = generateAccessToken({
        userId: user.userId,
        email: user.email,
        role: user.role,
      });

      res
        .status(200)
        .json(ApiResponse.success({ accessToken }, "Login successful", 200));
    } catch (error) {
      next(error);
    }
  }

  async adminLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      const user = await userService.adminLogin(email.toLowerCase(), password);

      const accessToken = generateAccessToken({
        userId: user.userId,
        email: user.email,
        role: user.role,
      });

      res
        .status(200)
        .json(
          ApiResponse.success({ accessToken }, "Admin login successful", 200),
        );
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
