import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNotificationUseCase } from "../../../../di/notification/notification_di";
import i18n from "../../../../i18n";
import type { NotificationEntity } from "../../domain/entity/notification";
import { NOTIFICATIONS_QUERY_KEY } from "../query/notification_query";

export const useDeleteNotificationMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (notificationId: string) => {
      const response = await deleteNotificationUseCase(notificationId);

      if (!response.success) {
        throw new Error(
          response.message ?? i18n.t("common:notification.deleteFailed"),
        );
      }

      return notificationId;
    },
    onSuccess: (notificationId) => {
      queryClient.setQueryData<NotificationEntity[]>(
        NOTIFICATIONS_QUERY_KEY,
        (current) => current?.filter((item) => item.id !== notificationId) ?? [],
      );
    },
  });

  return {
    deleteNotification: mutation.mutate,
    isDeleting: mutation.isPending,
    deleteError: mutation.error?.message ?? null,
    resetDeleteError: mutation.reset,
  };
};
