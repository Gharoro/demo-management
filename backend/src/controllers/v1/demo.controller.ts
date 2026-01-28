import { Response, NextFunction } from "express";
import { AuthRequest } from "../../interfaces/auth.interface";
import demoService from "../../services/demo.service";
import { ApiResponse } from "../../utils/response";

const MAX_LIMIT = 100;

class DemoController {
  async listDemoRequests(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.userId as string;
      const page = Math.max(1, parseInt(req.query.page as string) || 1);
      const limit = Math.min(
        MAX_LIMIT,
        Math.max(1, parseInt(req.query.limit as string) || 10),
      );
      const status = req.query.status as string | undefined;

      const result = await demoService.getDemoRequestsByUserId(userId, {
        page,
        limit,
        status,
      });

      res
        .status(200)
        .json(
          ApiResponse.success(
            result,
            "Demo requests retrieved successfully",
            200,
          ),
        );
    } catch (error) {
      next(error);
    }
  }

  async createDemoRequest(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.userId as string;

      const demoRequest = await demoService.createDemoRequest(userId, req.body);

      res
        .status(201)
        .json(
          ApiResponse.success(
            { demoRequest },
            "Demo request submitted successfully",
            201,
          ),
        );
    } catch (error) {
      next(error);
    }
  }

  async getAllDemoRequests(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const page = Math.max(1, parseInt(req.query.page as string) || 1);
      const limit = Math.min(
        MAX_LIMIT,
        Math.max(1, parseInt(req.query.limit as string) || 10),
      );
      const status = req.query.status as string | undefined;

      const result = await demoService.getAllDemoRequests({
        page,
        limit,
        status,
      });

      res
        .status(200)
        .json(
          ApiResponse.success(
            result,
            "Demo requests retrieved successfully",
            200,
          ),
        );
    } catch (error) {
      next(error);
    }
  }

  async getDemoRequestById(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { id } = req.params;

      const demoRequest = await demoService.getDemoRequestById(id);

      res
        .status(200)
        .json(
          ApiResponse.success(
            demoRequest,
            "Demo request retrieved successfully",
            200,
          ),
        );
    } catch (error) {
      next(error);
    }
  }

  async updateDemoRequestStatus(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const adminId = req.userId as string;

      const demoRequest = await demoService.updateDemoRequestStatus(
        id,
        status,
        adminId,
      );

      res
        .status(200)
        .json(
          ApiResponse.success(
            demoRequest,
            "Demo request status updated successfully",
            200,
          ),
        );
    } catch (error) {
      next(error);
    }
  }

  async deleteDemoRequest(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const adminId = req.userId as string;

      await demoService.deleteDemoRequest(id, adminId);

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export default new DemoController();
