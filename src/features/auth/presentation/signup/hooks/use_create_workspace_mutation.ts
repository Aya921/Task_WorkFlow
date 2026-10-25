import { useMutation } from "@tanstack/react-query";
import { createWorkSpaceUseCase } from "../../../../../di/auth/auth_di";
import type { CreateWorkspaceRequest } from "../../../domain/entity/create_work_space_request";
import i18n from "../../../../../i18n";

export const useCreateWorkSpaceMutation = () => {
  const mutation = useMutation({
    mutationFn: async (entity: CreateWorkspaceRequest) => {
      const response = await createWorkSpaceUseCase(entity);

      if (!response.success) {
        throw new Error(
          response.message ?? i18n.t("common:auth.createWorkspaceFailed"),
        );
      }

      return response.data;
    },
  });

  return {
    createWorkSpaceFn: mutation.mutate,
    isLoading: mutation.isPending,
    error: mutation.error?.message ?? null,
    data: mutation.data,
  };
};
