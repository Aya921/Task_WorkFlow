import type { DashboardMember } from "../../../domain/entity/dashboard_members";
import { FONT_STYLES } from "../../../../../assets/fonts/font_style";

export type ProjectMembersListProps = {
  members: DashboardMember[];
  maxVisible?: number;
};

export const ProjectMembersList = ({
  members,
  maxVisible = 3,
}: ProjectMembersListProps) => {
  if (members.length === 0) {
    return null;
  }

  const visibleMembers = members.slice(0, maxVisible);
  const remainingCount = members.length - visibleMembers.length;

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {visibleMembers.map((member) => (
        <span
          key={member.id}
          className={`${FONT_STYLES.caption} rounded-full border border-secondary-200 bg-secondary-50 px-2 py-0.5 font-medium text-secondary-700`}
        >
          {member.fullName}
        </span>
      ))}
      {remainingCount > 0 ? (
        <span className={`${FONT_STYLES.caption} font-medium text-secondary-400`}>
          +{remainingCount}
        </span>
      ) : null}
    </div>
  );
};
