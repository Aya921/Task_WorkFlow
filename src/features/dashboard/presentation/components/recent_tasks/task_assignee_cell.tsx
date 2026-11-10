import type { DashboardMember } from "../../../domain/entity/dashboard_members";
import { FONT_STYLES } from "../../../../../assets/fonts/font_style";
import { getInitials } from "../../utils/get_initials";

export type TaskAssigneeCellProps = {
  assignee: DashboardMember | null;
};

export const TaskAssigneeCell = ({ assignee }: TaskAssigneeCellProps) => {
  if (!assignee) {
    return (
      <span className={`${FONT_STYLES.caption} text-secondary-400`}>—</span>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-xs font-semibold text-primary-700">
        {getInitials(assignee.fullName)}
      </span>
      <span className={`${FONT_STYLES.caption} hidden font-medium text-secondary-700 xl:inline`}>
        {assignee.fullName}
      </span>
    </div>
  );
};
