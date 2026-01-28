import { z } from "zod";

export const createUserSchema = z.object({
  body: z.object({
    firstName: z
      .string({ error: "First name is required" })
      .min(1, "First name is required"),
    lastName: z
      .string({ error: "Last name is required" })
      .min(1, "Last name is required"),
    email: z
      .string({ error: "Email is required" })
      .email("Please enter a valid email address"),
  }),
});

export const verifyEmailSchema = z.object({
  body: z.object({
    email: z
      .string({ error: "Email is required" })
      .email("Please enter a valid email address"),
    token: z
      .string({ error: "Verification token is required" })
      .length(6, "Verification token must be 6 digits"),
  }),
});

export const resendTokenSchema = z.object({
  body: z.object({
    email: z
      .string({ error: "Email is required" })
      .email("Please enter a valid email address"),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z
      .string({ error: "Email is required" })
      .email("Please enter a valid email address"),
  }),
});

export const adminLoginSchema = z.object({
  body: z.object({
    email: z
      .string({ error: "Email is required" })
      .email("Please enter a valid email address"),
    password: z
      .string({ error: "Password is required" })
      .min(1, "Password is required"),
  }),
});
