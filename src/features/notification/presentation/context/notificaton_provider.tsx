import { useCallback, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { NotificationContext } from "./notification_context";
import type { NotificationEntity } from "../../domain/entity/notification";
import { useMarkNotificationReadMutation } from "../hooks/use_mark_notification_read_mutation";

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<
    NotificationEntity | undefined
  >(undefined);
  const { markAsRead } = useMarkNotificationReadMutation();

  const openAcceptModal = useCallback((notification: NotificationEntity) => {
    setSelectedNotification(notification);
    setIsAcceptModalOpen(true);
  }, []);

  const closeAcceptModal = useCallback(() => {
    setIsAcceptModalOpen(false);
    setSelectedNotification(undefined);
  }, []);

  const notificationValues = useMemo(
    () => ({
      isAcceptModalOpen,
      selectedNotification,
      openAcceptModal,
      closeAcceptModal,
      markAsRead,
    }),
    [
      isAcceptModalOpen,
      selectedNotification,
      openAcceptModal,
      closeAcceptModal,
      markAsRead,
    ],
  );

  return (
    <NotificationContext.Provider value={notificationValues}>
      {children}
    </NotificationContext.Provider>
  );
};
