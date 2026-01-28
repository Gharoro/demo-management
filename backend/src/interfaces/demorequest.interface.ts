import mongoose, { Document } from "mongoose";
import { DemoRequestStatus } from "../enums/demorequest.enum";

export interface IDemoRequest extends Document {
  userId: mongoose.Types.ObjectId;
  jobTitle: string;
  companyName: string;
  country: string;
  phoneNumber: string;
  companyWebsite: string;
  currentMonthlyProcessingVolume: number;
  howDidYouHearAboutEnif: string;
  description: string;
  status: DemoRequestStatus;
  createdAt: Date;
  updatedAt: Date;
}
