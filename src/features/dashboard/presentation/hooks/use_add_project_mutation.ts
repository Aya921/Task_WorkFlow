import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProjectUseCase } from "../../../../di/dashboard/dashboard_di";
import i18n from "../../../../i18n";
import type { AddProjectRequest } from "../../domain/entity/add_project_request";

export const useAddProjectMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (request: AddProjectRequest) => {
      const response = await addProjectUseCase(request);

      if (!response.success) {
        throw new Error(
          response.message ?? i18n.t("common:dashboard.createProjectFailed"),
        );
      }

      return response.data;
    },
    onSuccess: (data) => {
      if (!data?.workspaceId) {
        return;
      }

      void queryClient.invalidateQueries({
        queryKey: ["dashboard", data.workspaceId],
      });
    },
  });

  return {
    addProjectFn: mutation.mutate,
    addProjectAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    error: mutation.error?.message ?? null,
    data: mutation.data,
  };
};
