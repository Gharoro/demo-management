import { apiClient } from "./client";
import type { CreateUserResponse, VerifyEmailResponse } from "../interfaces";

export const authApi = {
  createUser: async (data: {
    firstName: string;
    lastName: string;
    email: string;
  }): Promise<CreateUserResponse> => {
    const response = await apiClient.post("/auth/create-user", data);
    return response.data;
  },

  verifyEmail: async (data: {
    email: string;
    token: string;
  }): Promise<VerifyEmailResponse> => {
    const response = await apiClient.patch("/auth/verify-email", data);
    return response.data;
  },
};
