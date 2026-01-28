import { z } from "zod";
import { DemoRequestStatus } from "../enums/demorequest.enum";

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

export const createDemoRequestSchema = z.object({
  body: z.object({
    jobTitle: z
      .string({ error: "Job title is required" })
      .min(1, "Job title is required"),
    companyName: z
      .string({ error: "Company name is required" })
      .min(1, "Company name is required"),
    country: z
      .string({ error: "Country is required" })
      .min(1, "Country is required"),
    phoneNumber: z
      .string({ error: "Phone number is required" })
      .min(1, "Phone number is required"),
    companyWebsite: z.string().optional(),
    currentMonthlyProcessingVolume: z
      .number({ error: "Processing volume must be a number" })
      .optional(),
    howDidYouHearAboutEnif: z.string().optional(),
    description: z.string().optional(),
  }),
});

export const updateDemoRequestStatusSchema = z.object({
  params: z.object({
    id: z
      .string({ error: "Demo request ID is required" })
      .regex(objectIdRegex, "Invalid demo request ID format"),
  }),
  body: z.object({
    status: z.enum(
      [
        DemoRequestStatus.PENDING,
        DemoRequestStatus.CONTACTED,
        DemoRequestStatus.SCHEDULED,
        DemoRequestStatus.COMPLETED,
      ],
      {
        message: `Status must be one of: ${Object.values(DemoRequestStatus).join(", ")}`,
      },
    ),
  }),
});

export const demoRequestIdParamSchema = z.object({
  params: z.object({
    id: z
      .string({ error: "Demo request ID is required" })
      .regex(objectIdRegex, "Invalid demo request ID format"),
  }),
});
