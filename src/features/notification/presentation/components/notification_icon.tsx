import type { NotificationType } from "../../domain/entity/notification_type";
import { NOTIFICATION_TYPE_STYLES } from "../utils/notification_type_styles";

type NotificationIconProps = {
  type: NotificationType;
};

export const NotificationIcon = ({ type }: NotificationIconProps) => {
  const style = NOTIFICATION_TYPE_STYLES[type];
  const Icon = style.icon;

  return (
    <span
      className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border ${style.badgeClassName}`}
    >
      <Icon size={16} strokeWidth={2} className={style.iconClassName} />
    </span>
  );
};
