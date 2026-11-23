import { X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { FONT_STYLES } from "../../../../../assets/fonts/font_style";
import { getInitials } from "../../utils/get_initials";
import type { WorkspaceMember } from "../../../domain/entity/workspace_member";

type CreateProjectMemberChipProps = {
  member?: WorkspaceMember;
  canRemove: boolean;
  onRemove: () => void;
  email?: string;
};

export const CreateProjectMemberChip = ({
  member,
  canRemove,
  onRemove,
  email
}: CreateProjectMemberChipProps) => {
  const { t } = useTranslation("dashboard");

  return (
    <div className="flex min-w-0 items-center gap-1.5 rounded-lg border border-secondary-200 bg-white px-2 py-1 shadow-sm">
     {member ? (
      <>
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary-100 text-[9px] font-semibold text-primary-700">
        {getInitials(member.fullName)}
      </span>
      <span className={`${FONT_STYLES.caption} max-w-[6rem] truncate font-medium text-secondary-800`}
      >
        {member.fullName}
      </span>
      </>
     ) : (
      <span className={`${FONT_STYLES.caption} max-w-[6rem] truncate font-medium text-secondary-800`}
      >
        {email}
      </span>
     )}

      {canRemove ? (
        <button
          type="button"
          onClick={onRemove}
          aria-label={t("createProject.members.remove", {
            name: member?.fullName||email,
          })}
          className="rounded p-0.5 text-secondary-400 transition-colors hover:bg-secondary-100 hover:text-secondary-700"
        >
          <X size={12} strokeWidth={2} />
        </button>
      ) : null}
    </div>
  );
};
