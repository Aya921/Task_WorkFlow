import { X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { FONT_STYLES } from "../../../../../assets/fonts/font_style";
import { getInitials } from "../../utils/get_initials";
import {
  PROJECT_MEMBER_ROLES,
  type CreateProjectMember,
  type ProjectMemberRole,
} from "./create_project_member";

type CreateProjectMemberChipProps = {
  member: CreateProjectMember;
  onRoleChange: (role: ProjectMemberRole) => void;
  onRemove: () => void;
};

export const CreateProjectMemberChip = ({
  member,
  onRoleChange,
  onRemove,
}: CreateProjectMemberChipProps) => {
  const { t } = useTranslation("dashboard");
  const isLead = member.role === "projectLead";

  return (
    <div className="flex min-w-0 items-center gap-2 rounded-xl border border-secondary-200 bg-white px-2.5 py-2 shadow-sm">
      {member.avatarUrl ? (
        <img
          src={member.avatarUrl}
          alt=""
          className="h-8 w-8 rounded-full object-cover"
        />
      ) : (
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-[11px] font-semibold text-primary-700">
          {getInitials(member.name)}
        </span>
      )}

      <span
        className={`${FONT_STYLES.bodySm} max-w-[7rem] truncate font-medium text-secondary-800 sm:max-w-[9rem]`}
      >
        {member.name}
      </span>

      <label className="sr-only" htmlFor={`role-${member.id}`}>
        {t("createProject.members.roleLabel", { name: member.name })}
      </label>
      <select
        id={`role-${member.id}`}
        value={member.role}
        onChange={(event) =>
          onRoleChange(event.target.value as ProjectMemberRole)
        }
        className={`${FONT_STYLES.caption} rounded-md border px-2 py-1 font-semibold outline-none ${
          isLead
            ? "border-primary-200 bg-primary-50 text-primary-700"
            : "border-secondary-200 bg-secondary-50 text-secondary-600"
        }`}
      >
        {PROJECT_MEMBER_ROLES.map((role) => (
          <option key={role} value={role}>
            {t(`createProject.members.roles.${role}`)}
          </option>
        ))}
      </select>

      {!isLead ? (
        <button
          type="button"
          onClick={onRemove}
          aria-label={t("createProject.members.remove", { name: member.name })}
          className="rounded-md p-1 text-secondary-400 transition-colors hover:bg-secondary-100 hover:text-secondary-700"
        >
          <X size={14} strokeWidth={2} />
        </button>
      ) : null}
    </div>
  );
};
