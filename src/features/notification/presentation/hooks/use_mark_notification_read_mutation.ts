import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  markAllNotificationsAsReadUseCase,
  markNotificationAsReadUseCase,
} from "../../../../di/notification/notification_di";
import i18n from "../../../../i18n";
import type { NotificationEntity } from "../../domain/entity/notification";
import { NOTIFICATIONS_QUERY_KEY } from "../query/notification_query";

export const useMarkNotificationReadMutation = () => {
  const queryClient = useQueryClient();

  const markOne = useMutation({
    mutationFn: async (notificationId: string) => {
      const response = await markNotificationAsReadUseCase(notificationId);

      if (!response.success || !response.data) {
        throw new Error(
          response.message ?? i18n.t("common:notification.updateFailed"),
        );
      }

      return response.data;
    },
    onSuccess: (updated) => {
      queryClient.setQueryData<NotificationEntity[]>(
        NOTIFICATIONS_QUERY_KEY,
        (current) =>
          current?.map((item) => (item.id === updated.id ? updated : item)) ??
          [],
      );
    },
  });

  const markAll = useMutation({
    mutationFn: async () => {
      const response = await markAllNotificationsAsReadUseCase();

      if (!response.success) {
        throw new Error(
          response.message ?? i18n.t("common:notification.updateFailed"),
        );
      }

      return response.data ?? [];
    },
    onSuccess: (updatedItems) => {
      // Only the rows the server actually updated (project invitations are skipped).
      const updatedById = new Map(updatedItems.map((item) => [item.id, item]));

      queryClient.setQueryData<NotificationEntity[]>(
        NOTIFICATIONS_QUERY_KEY,
        (current) =>
          current?.map((item) => updatedById.get(item.id) ?? item) ?? [],
      );
    },
  });

  return {
    markAsRead: markOne.mutate,
    markAllAsRead: markAll.mutate,
    isMarkingAsRead: markOne.isPending || markAll.isPending,
  };
};
