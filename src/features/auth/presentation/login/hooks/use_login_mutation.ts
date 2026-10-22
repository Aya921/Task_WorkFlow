import { useMutation } from "@tanstack/react-query";
import { loginUserUseCase } from "../../../../../di/auth/auth_di";
import type { LoginCredentials } from "../../../domain/entity/login_credentials";

export const useLoginMutation = () => {
  const mutation = useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const response = await loginUserUseCase(credentials);

      if (!response.success) {
        throw new Error(
          response.message ?? "Failed to login. Please try again later.",
        );
      }

      return response.data;
    },
  });

  return {
    loginFn: mutation.mutate,
    isLoading: mutation.isPending,
    error: mutation.error?.message ?? null,
    data: mutation.data,
  };
};
