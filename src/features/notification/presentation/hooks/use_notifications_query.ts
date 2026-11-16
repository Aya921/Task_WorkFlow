import { useQuery } from "@tanstack/react-query";
import { notificationsQueryOptions } from "../query/notification_query";

export const useNotificationsQuery = () => {
  return useQuery(notificationsQueryOptions());
};
