import { useMutation } from "@tanstack/react-query";
import { updateOnboardingStepUseCase } from "../../../../../di/auth/auth_di";
import type { UpdateOnboardingStepRequest } from "../../../domain/entity/update_onboarding_step_request";

export const useUpdateOnboardingStepMutation = () => {
  const mutation = useMutation({
    mutationFn: async (entity: UpdateOnboardingStepRequest) => {
      const response = await updateOnboardingStepUseCase(entity);

      if (!response.success) {
        throw new Error(
          response.message ??
            "Failed to update onboarding step. Please try again later.",
        );
      }

      return response.data;
    },
  });

  return {
    updateOnboardingStepFn: mutation.mutate,
    isLoading: mutation.isPending,
    error: mutation.error?.message ?? null,
    data: mutation.data,
  };
};
