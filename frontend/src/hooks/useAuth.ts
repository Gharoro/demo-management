import { useMutation } from "@tanstack/react-query";
import { authApi } from "../api/auth";
import { demoApi } from "../api/demo";

export const useCreateUser = () => {
  return useMutation({
    mutationFn: authApi.createUser,
  });
};

export const useVerifyEmail = () => {
  return useMutation({
    mutationFn: authApi.verifyEmail,
  });
};

export const useCreateDemoRequest = () => {
  return useMutation({
    mutationFn: demoApi.createDemoRequest,
  });
};
