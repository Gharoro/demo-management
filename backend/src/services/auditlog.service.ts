import AuditLog from "../models/auditlog.model";
import { AuditAction } from "../enums/auditlog.enum";

class AuditLogService {
  async getAuditLogs(options: {
    page: number;
    limit: number;
    action?: string;
  }) {
    const query: Record<string, unknown> = {};

    if (options.action) {
      query.action = options.action;
    }

    const paginationOptions = {
      page: options.page,
      limit: options.limit,
      sort: { createdAt: -1 },
      populate: [
        { path: "adminId", select: "firstName lastName email" },
        { path: "demoRequestId", select: "companyName jobTitle status" },
      ],
    };

    const result = await AuditLog.paginate(query, paginationOptions);
    return result;
  }

  async createAuditLog(data: {
    adminId: string;
    action: AuditAction;
    demoRequestId: string;
    oldValue?: string;
    newValue?: string;
  }) {
    const auditLog = await AuditLog.create(data);
    return auditLog;
  }
}

export default new AuditLogService();
