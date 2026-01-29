import { apiClient } from "./client";
import type {
  CreateDemoRequestPayload,
  CreateDemoRequestResponse,
} from "../interfaces";

export const demoApi = {
  createDemoRequest: async (
    data: CreateDemoRequestPayload,
  ): Promise<CreateDemoRequestResponse> => {
    const response = await apiClient.post("/demo", data);
    return response.data;
  },
};
