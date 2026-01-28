import mongoose, { Document } from "mongoose";
import { AuditAction } from "../enums/auditlog.enum";

export interface IAuditLog extends Document {
  adminId: mongoose.Types.ObjectId;
  action: AuditAction;
  demoRequestId: mongoose.Types.ObjectId;
  oldValue?: string;
  newValue?: string;
  createdAt: Date;
}
