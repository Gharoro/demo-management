import { Response, NextFunction } from "express";
import { AppError } from "../utils/appError";
import { verifyAccessToken } from "../utils/jwt";
import { UserRole } from "../enums/user.enum";
import { AuthRequest } from "../interfaces/auth.interface";

export { AuthRequest };

export const authenticate = (
  req: AuthRequest,
  _res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(new AppError("Authorization token required", 401));
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyAccessToken(token);

    req.userId = decoded.userId;
    req.userEmail = decoded.email;
    req.userRole = decoded.role;

    next();
  } catch (error) {
    return next(new AppError("Invalid or expired token", 401));
  }
};

export const adminGuard = (
  req: AuthRequest,
  _res: Response,
  next: NextFunction,
) => {
  if (req.userRole !== UserRole.ADMIN) {
    return next(new AppError("Access denied. Admin privileges required", 403));
  }
  next();
};

export const verifiedGuard = (
  req: AuthRequest,
  _res: Response,
  next: NextFunction,
) => {
  // Note: JWT is only issued to verified users, so if they have a valid token,
  // they were verified at login time. This guard is for extra safety.
  next();
};
