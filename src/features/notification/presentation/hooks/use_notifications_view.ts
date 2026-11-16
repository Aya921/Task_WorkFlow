import { useMemo, useState } from "react";
import type { NotificationFilter } from "../types/notification_filter";
import { groupNotifications } from "../utils/group_notifications";
import { useMarkNotificationReadMutation } from "./use_mark_notification_read_mutation";
import { useNotificationsQuery } from "./use_notifications_query";

export const useNotificationsView = () => {
  const { data: notifications = [], isLoading, isError, error, refetch } =
    useNotificationsQuery();
  const { markAsRead, markAllAsRead, isMarkingAsRead } =
    useMarkNotificationReadMutation();
  const [filter, setFilter] = useState<NotificationFilter>("all");

  const unreadCount = useMemo(
    () => notifications.filter((item) => !item.isRead).length,
    [notifications],
  );

  const visibleNotifications = useMemo(() => {
    if (filter === "unread") {
      return notifications.filter((item) => !item.isRead);
    }
    return notifications;
  }, [filter, notifications]);

  const groups = useMemo(
    () => groupNotifications(visibleNotifications),
    [visibleNotifications],
  );

  const acceptInvitation = (id: string) => {
    // TODO: wire accept invitation use case
    markAsRead(id);
  };

  const declineInvitation = (id: string) => {
    // TODO: wire decline invitation use case
    markAsRead(id);
  };

  return {
    filter,
    setFilter,
    unreadCount,
    groups,
    hasNotifications: visibleNotifications.length > 0,
    isLoading,
    isError,
    errorMessage: error instanceof Error ? error.message : null,
    refetch,
    isMarkingAsRead,
    markAsRead,
    markAllAsRead,
    acceptInvitation,
    declineInvitation,
  };
};
