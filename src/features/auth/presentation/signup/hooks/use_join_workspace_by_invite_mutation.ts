import { useMutation } from "@tanstack/react-query";
import { joinWorkspaceByInviteUseCase } from "../../../../../di/auth/auth_di";
import type { JoinWorkspaceByInviteRequest } from "../../../domain/entity/join_workspace_by_invite_request";
import i18n from "../../../../../i18n";

export const useJoinWorkspaceByInviteMutation = () => {
  const mutation = useMutation({
    mutationFn: async (entity: JoinWorkspaceByInviteRequest) => {
      const response = await joinWorkspaceByInviteUseCase(entity);

      if (!response.success) {
        throw new Error(
          response.message ?? i18n.t("common:auth.joinWorkspaceFailed"),
        );
      }

      if (response.data === false) {
        throw new Error(i18n.t("common:auth.invalidInviteCode"));
      }

      return response.data;
    },
  });

  return {
    joinWorkspaceByInviteFn: mutation.mutate,
    isLoading: mutation.isPending,
    error: mutation.error?.message ?? null,
    data: mutation.data,
  };
};
