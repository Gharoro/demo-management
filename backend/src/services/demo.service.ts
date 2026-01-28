import DemoRequest from "../models/demorequest.model";
import auditLogService from "./auditlog.service";
import { AppError } from "../utils/appError";
import { DemoRequestStatus } from "../enums/demorequest.enum";
import { AuditAction } from "../enums/auditlog.enum";

class DemoService {
  async getDemoRequestsByUserId(
    userId: string,
    options: { page: number; limit: number; status?: string },
  ) {
    const query: Record<string, unknown> = { userId };

    if (options.status) {
      query.status = options.status;
    }

    const paginationOptions = {
      page: options.page,
      limit: options.limit,
      sort: { createdAt: -1 },
    };

    const result = await DemoRequest.paginate(query, paginationOptions);
    return result;
  }

  async createDemoRequest(
    userId: string,
    data: {
      jobTitle: string;
      companyName: string;
      country: string;
      phoneNumber: string;
      companyWebsite?: string;
      currentMonthlyProcessingVolume?: number;
      howDidYouHearAboutEnif?: string;
      description?: string;
    },
  ) {
    const demoRequest = await DemoRequest.create({
      userId,
      ...data,
    });
    return demoRequest;
  }

  async getAllDemoRequests(options: {
    page: number;
    limit: number;
    status?: string;
  }) {
    const query: Record<string, unknown> = {};

    if (options.status) {
      query.status = options.status;
    }

    const paginationOptions = {
      page: options.page,
      limit: options.limit,
      sort: { createdAt: -1 },
      populate: { path: "userId", select: "firstName lastName email" },
    };

    const result = await DemoRequest.paginate(query, paginationOptions);
    return result;
  }

  async getDemoRequestById(id: string) {
    const demoRequest = await DemoRequest.findById(id).populate(
      "userId",
      "firstName lastName email",
    );

    if (!demoRequest) {
      throw new AppError("Demo request not found", 404);
    }

    return demoRequest;
  }

  async updateDemoRequestStatus(id: string, status: string, adminId: string) {
    const validStatuses = Object.values(DemoRequestStatus);
    if (!validStatuses.includes(status as DemoRequestStatus)) {
      throw new AppError(
        `Invalid status. Must be one of: ${validStatuses.join(", ")}`,
        400,
      );
    }

    const demoRequest = await DemoRequest.findById(id);
    if (!demoRequest) {
      throw new AppError("Demo request not found", 404);
    }

    const oldStatus = demoRequest.status;
    demoRequest.status = status as DemoRequestStatus;
    await demoRequest.save();

    await auditLogService.createAuditLog({
      adminId,
      action: AuditAction.EDIT,
      demoRequestId: id,
      oldValue: oldStatus,
      newValue: status,
    });

    return demoRequest;
  }

  async deleteDemoRequest(id: string, adminId: string) {
    const demoRequest = await DemoRequest.findById(id);
    if (!demoRequest) {
      throw new AppError("Demo request not found", 404);
    }

    await DemoRequest.findByIdAndDelete(id);

    await auditLogService.createAuditLog({
      adminId,
      action: AuditAction.DELETE,
      demoRequestId: id,
    });
  }
}

export default new DemoService();
