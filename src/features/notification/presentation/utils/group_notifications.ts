import type { Notification } from "../../domain/entity/notification";

export type NotificationGroupKey = "today" | "earlier";

export type NotificationGroup = {
  key: NotificationGroupKey;
  items: Notification[];
};

const isSameDay = (left: Date, right: Date) =>
  left.getFullYear() === right.getFullYear() &&
  left.getMonth() === right.getMonth() &&
  left.getDate() === right.getDate();

export const groupNotifications = (notifications: Notification[],): NotificationGroup[] => {
  const today: Notification[] = [];
  const earlier: Notification[] = [];
  const now = new Date();

  for (const notification of notifications) {
    const createdAt = new Date(notification.createdAt);
    if (isSameDay(createdAt, now)) {
      today.push(notification);
    } else {
      earlier.push(notification);
    }
  }

  const groups: NotificationGroup[] = [];
  if (today.length > 0) {
    groups.push({ key: "today", items: today });
  }
  if (earlier.length > 0) {
    groups.push({ key: "earlier", items: earlier });
  }
  return groups;
};
