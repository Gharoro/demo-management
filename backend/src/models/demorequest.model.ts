import mongoose, { Document, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { IDemoRequest } from "../interfaces/demorequest.interface";
import { DemoRequestStatus } from "../enums/demorequest.enum";

const demoRequestSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    jobTitle: {
      type: String,
    },
    companyName: {
      type: String,
    },
    country: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    companyWebsite: {
      type: String,
    },
    currentMonthlyProcessingVolume: {
      type: Number,
    },
    howDidYouHearAboutEnif: {
      type: String,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: Object.values(DemoRequestStatus),
      default: DemoRequestStatus.PENDING,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

demoRequestSchema.index({ userId: 1, status: 1 });
demoRequestSchema.index({ createdAt: -1 });

demoRequestSchema.plugin(mongoosePaginate);

interface DemoRequestModel<
  T extends Document,
> extends mongoose.PaginateModel<T> {}

const DemoRequest = mongoose.model<IDemoRequest>(
  "DemoRequest",
  demoRequestSchema,
) as DemoRequestModel<IDemoRequest>;

export default DemoRequest;
