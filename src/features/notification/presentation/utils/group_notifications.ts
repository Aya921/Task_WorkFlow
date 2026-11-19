import type { NotificationEntity } from "../../domain/entity/notification";

export type NotificationGroupKey = "today" | "earlier";

export type NotificationGroup = {
  key: NotificationGroupKey;
  items: NotificationEntity[];
};

const isSameDay = (left: Date, right: Date) =>
  left.getFullYear() === right.getFullYear() &&
  left.getMonth() === right.getMonth() &&
  left.getDate() === right.getDate();

export const groupNotifications = (notifications: NotificationEntity[],): NotificationGroup[] => {
  const today: NotificationEntity[] = [];
  const earlier: NotificationEntity[] = [];
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
