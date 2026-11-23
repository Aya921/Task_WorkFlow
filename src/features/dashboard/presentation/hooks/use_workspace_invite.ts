import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getWorkspaceInviteUseCase,
  regenerateWorkspaceInviteUseCase,
} from "../../../../di/dashboard/dashboard_di";
import i18n from "../../../../i18n";
import type { WorkspaceInvite } from "../../domain/entity/workspace_invite";

export const workspaceInviteQueryKey = (workspaceId: string) =>
  ["workspace-invite", workspaceId] as const;

export const useWorkspaceInviteQuery = (workspaceId: string | undefined) => {
  return useQuery({
    queryKey: workspaceInviteQueryKey(workspaceId ?? ""),
    queryFn: async () => {
      const response = await getWorkspaceInviteUseCase(workspaceId!);

      if (!response.success || !response.data) {
        throw new Error(
          response.message ?? i18n.t("common:dashboard.workspaceInviteFailed"),
        );
      }

      return response.data;
    },
    enabled: Boolean(workspaceId),
  });
};

export const useRegenerateWorkspaceInviteMutation = (
  workspaceId: string | undefined,
) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      if (!workspaceId) {
        throw new Error(i18n.t("common:dashboard.workspaceInviteFailed"));
      }

      const response = await regenerateWorkspaceInviteUseCase(workspaceId);

      if (!response.success || !response.data) {
        throw new Error(
          response.message ?? i18n.t("common:dashboard.workspaceInviteFailed"),
        );
      }

      return response.data;
    },
    onSuccess: (invite: WorkspaceInvite) => {
      if (!workspaceId) {
        return;
      }

      queryClient.setQueryData(workspaceInviteQueryKey(workspaceId), invite);
    },
  });

  return {
    regenerateInvite: mutation.mutate,
    isRegenerating: mutation.isPending,
    regenerateError: mutation.error?.message ?? null,
  };
};
