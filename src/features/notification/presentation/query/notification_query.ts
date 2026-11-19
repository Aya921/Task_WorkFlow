import { queryOptions } from "@tanstack/react-query";
import { getNotificationsUseCase } from "../../../../di/notification/notification_di";
import i18n from "../../../../i18n";

export const NOTIFICATIONS_QUERY_KEY = ["notifications"] as const;

export const notificationsQueryOptions = () =>
  queryOptions({
    queryKey: NOTIFICATIONS_QUERY_KEY,
    queryFn: async () => {
      const response = await getNotificationsUseCase();
    

      if (!response.success) {
        throw new Error(
          response.message ?? i18n.t("common:notification.loadFailed"),
        );
      }

      return response.data ?? [];
    },
  });
