import express from "express";
import authController from "../../controllers/v1/auth.controller";
import {
  createUserSchema,
  verifyEmailSchema,
  resendTokenSchema,
  loginSchema,
  adminLoginSchema,
} from "../../validations/auth.validation";
import { validate } from "../../middleware/validate";
import { authLimiter } from "../../middleware/rateLimiter";

const router = express.Router();

router.post(
  "/create-user",
  validate(createUserSchema),
  authController.createUser,
);

router.patch(
  "/verify-email",
  authLimiter,
  validate(verifyEmailSchema),
  authController.verifyEmail,
);

router.patch(
  "/resend-token",
  authLimiter,
  validate(resendTokenSchema),
  authController.resendToken,
);

router.post("/login", authLimiter, validate(loginSchema), authController.login);

router.post(
  "/admin/login",
  authLimiter,
  validate(adminLoginSchema),
  authController.adminLogin,
);

export default router;
