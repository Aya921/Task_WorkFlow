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
    onSuccess: () => {
      queryClient.setQueryData<NotificationEntity[]>(
        NOTIFICATIONS_QUERY_KEY,
        (current) => {
          if (!current) {
            return [];
          }

          const now = new Date().toISOString();
          return current.map((item) =>
            item.isRead ? item : { ...item, isRead: true, readAt: now },
          );
        },
      );
    },
  });

  return {
    markAsRead: markOne.mutate,
    markAllAsRead: markAll.mutate,
    isMarkingAsRead: markOne.isPending || markAll.isPending,
  };
};
