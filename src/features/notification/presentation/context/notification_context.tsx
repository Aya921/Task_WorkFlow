import { createContext } from "react";
import type { NotificationEntity } from "../../domain/entity/notification";

export type NotificationContextType = {
  isAcceptModalOpen: boolean;
  selectedNotification: NotificationEntity | undefined;
  openAcceptModal: (notification: NotificationEntity) => void;
  closeAcceptModal: () => void;
  markAsRead: (notificationId: string) => void;
};

export const NotificationContext = createContext<NotificationContextType | null>(null);
