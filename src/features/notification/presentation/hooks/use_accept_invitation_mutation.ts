import { useMutation, useQueryClient } from "@tanstack/react-query";
import { acceptProjectInvitationUseCase } from "../../../../di/notification/notification_di";
import i18n from "../../../../i18n";
import { NOTIFICATIONS_QUERY_KEY } from "../query/notification_query";
import type { AcceptInvitationInput } from "../../domain/entity/accept_invitation_data";


export const useAcceptInvitationMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ invitationId, jobTitle }: AcceptInvitationInput) => {
      const response = await acceptProjectInvitationUseCase(
        invitationId,
        jobTitle,
      );

      if (!response.success) {
        throw new Error(
          response.message ??
            i18n.t("common:notification.acceptInvitationFailed"),
        );
      }
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: NOTIFICATIONS_QUERY_KEY });
      void queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });

  return {
    acceptInvitation: mutation.mutate,
    isAccepting: mutation.isPending,
    acceptError: mutation.error?.message ?? null,
    resetAcceptError: mutation.reset,
  };
};
