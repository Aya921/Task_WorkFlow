import type { LucideIcon } from "lucide-react";
import {
  AtSign,
  Bell,
  CheckCircle2,
  ClipboardList,
  FolderKanban,
  Mail,
  UserMinus,
  UserPlus,
} from "lucide-react";
import type { NotificationType } from "../../domain/entity/notification_type";

type NotificationTypeStyle = {
  icon: LucideIcon;
  iconClassName: string;
  badgeClassName: string;
};

export const NOTIFICATION_TYPE_STYLES: Record<
  NotificationType,
  NotificationTypeStyle
> = {
  project_invitation: {
    icon: Mail,
    iconClassName: "text-primary-600",
    badgeClassName: "bg-primary-50 border-primary-100",
  },
  task_assigned: {
    icon: ClipboardList,
    iconClassName: "text-sky-600",
    badgeClassName: "bg-sky-50 border-sky-100",
  },
  task_updated: {
    icon: AtSign,
    iconClassName: "text-amber-600",
    badgeClassName: "bg-amber-50 border-amber-100",
  },
  task_completed: {
    icon: CheckCircle2,
    iconClassName: "text-emerald-600",
    badgeClassName: "bg-emerald-50 border-emerald-100",
  },
  task_due_soon: {
    icon: Bell,
    iconClassName: "text-rose-600",
    badgeClassName: "bg-rose-50 border-rose-100",
  },
  project_updated: {
    icon: FolderKanban,
    iconClassName: "text-indigo-600",
    badgeClassName: "bg-indigo-50 border-indigo-100",
  },
  member_joined: {
    icon: UserPlus,
    iconClassName: "text-teal-600",
    badgeClassName: "bg-teal-50 border-teal-100",
  },
  member_removed: {
    icon: UserMinus,
    iconClassName: "text-secondary-600",
    badgeClassName: "bg-secondary-100 border-secondary-200",
  },
};
