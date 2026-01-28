import express from "express";
import demoController from "../../controllers/v1/demo.controller";
import { authenticate } from "../../middleware/auth";
import { validate } from "../../middleware/validate";
import { createDemoRequestSchema } from "../../validations/demo.validation";

const router = express.Router();

router.get("/", authenticate, demoController.listDemoRequests);

router.post(
  "/",
  authenticate,
  validate(createDemoRequestSchema),
  demoController.createDemoRequest,
);

export default router;
