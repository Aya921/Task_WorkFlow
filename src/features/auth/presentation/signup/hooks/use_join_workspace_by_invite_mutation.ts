import { useMutation } from "@tanstack/react-query";
import { joinWorkspaceByInviteUseCase } from "../../../../../di/auth/auth_di";
import type { JoinWorkspaceByInviteRequest } from "../../../domain/entity/join_workspace_by_invite_request";

export const useJoinWorkspaceByInviteMutation = () => {
  const mutation = useMutation({
    mutationFn: async (entity: JoinWorkspaceByInviteRequest) => {
      const response = await joinWorkspaceByInviteUseCase(entity);

      if (!response.success) {
        throw new Error(
          response.message ?? "Failed to join workspace. Please try again later.",
        );
      }
      if(response.data===false){
        throw new Error(
          "Invalid invite code. Please check the code and try again.",
        );
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