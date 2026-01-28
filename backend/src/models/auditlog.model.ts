import mongoose, { Schema, Document } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { IAuditLog } from "../interfaces/auditlog.interface";
import { AuditAction } from "../enums/auditlog.enum";

const auditLogSchema: Schema = new Schema(
  {
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    action: {
      type: String,
      enum: Object.values(AuditAction),
      required: true,
      index: true,
    },
    demoRequestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DemoRequest",
      required: true,
      index: true,
    },
    oldValue: {
      type: String,
    },
    newValue: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

auditLogSchema.index({ createdAt: -1 });
auditLogSchema.index({ adminId: 1, action: 1 });

auditLogSchema.plugin(mongoosePaginate);

interface AuditLogModel<T extends Document> extends mongoose.PaginateModel<T> {}

const AuditLog = mongoose.model<IAuditLog>(
  "AuditLog",
  auditLogSchema,
) as AuditLogModel<IAuditLog>;

export default AuditLog;
