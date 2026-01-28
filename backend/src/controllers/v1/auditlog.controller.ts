import { Response, NextFunction } from "express";
import { AuthRequest } from "../../interfaces/auth.interface";
import auditLogService from "../../services/auditlog.service";
import { ApiResponse } from "../../utils/response";

const MAX_LIMIT = 100;

class AuditLogController {
  async getAuditLogs(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const page = Math.max(1, parseInt(req.query.page as string) || 1);
      const limit = Math.min(
        MAX_LIMIT,
        Math.max(1, parseInt(req.query.limit as string) || 10),
      );
      const action = req.query.action as string | undefined;

      const result = await auditLogService.getAuditLogs({
        page,
        limit,
        action,
      });

      res
        .status(200)
        .json(
          ApiResponse.success(result, "Audit logs retrieved successfully", 200),
        );
    } catch (error) {
      next(error);
    }
  }
}

export default new AuditLogController();
