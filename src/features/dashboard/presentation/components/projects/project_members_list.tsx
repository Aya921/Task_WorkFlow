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
  const getTwoCharacters = (name: string) => {
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {visibleMembers.map((member) => (
        
        <div
        key={member.id}
         className="size-6 rounded-full border border-primary-200  text-[10px] font-medium text-primary-700 bg-primary-50 flex items-center justify-center">
          {getTwoCharacters(member.fullName)}
          
        </div>
      ))}
      {remainingCount > 0 ? (
        <span className={`${FONT_STYLES.caption} font-medium text-secondary-400`}>
          +{remainingCount}
        </span>
      ) : null}
    </div>
  );
};
