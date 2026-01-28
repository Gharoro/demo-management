import express from "express";
import demoController from "../../controllers/v1/demo.controller";
import auditLogController from "../../controllers/v1/auditlog.controller";
import { authenticate, adminGuard } from "../../middleware/auth";
import { validate } from "../../middleware/validate";
import {
  updateDemoRequestStatusSchema,
  demoRequestIdParamSchema,
} from "../../validations/demo.validation";

const router = express.Router();

router.get("/", authenticate, adminGuard, demoController.getAllDemoRequests);

router.get(
  "/audit-logs",
  authenticate,
  adminGuard,
  auditLogController.getAuditLogs,
);

router.get(
  "/:id",
  authenticate,
  adminGuard,
  validate(demoRequestIdParamSchema),
  demoController.getDemoRequestById,
);

router.patch(
  "/:id",
  authenticate,
  adminGuard,
  validate(updateDemoRequestStatusSchema),
  demoController.updateDemoRequestStatus,
);

router.delete(
  "/:id",
  authenticate,
  adminGuard,
  validate(demoRequestIdParamSchema),
  demoController.deleteDemoRequest,
);

export default router;
