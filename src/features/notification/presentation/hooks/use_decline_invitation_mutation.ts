import { useMutation, useQueryClient } from "@tanstack/react-query";
import { declineProjectInvitationUseCase } from "../../../../di/notification/notification_di";
import i18n from "../../../../i18n";
import { NOTIFICATIONS_QUERY_KEY } from "../query/notification_query";

export const useDeclineInvitationMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (invitationId: string) => {
      const response = await declineProjectInvitationUseCase(invitationId);

      if (!response.success) {
        throw new Error(
          response.message ??
            i18n.t("common:notification.declineInvitationFailed"),
        );
      }
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: NOTIFICATIONS_QUERY_KEY });
    },
  });

  return {
    declineInvitation: mutation.mutate,
    isDeclining: mutation.isPending,
    declineError: mutation.error?.message ?? null,
  };
};
