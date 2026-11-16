import { useTranslation } from "react-i18next";
import { FONT_STYLES } from "../../../../../assets/fonts/font_style";
import { getInitials } from "../../utils/get_initials";
import type { WorkspaceMember } from "../../../domain/entity/workspace_member";

type CreateProjectMemberSuggestionsProps = {
  members: WorkspaceMember[];
  isLoading: boolean;
  query: string;
  onSelect: (member: WorkspaceMember) => void;
};

export const CreateProjectMemberSuggestions = ({
  members,
  isLoading,
  query,
  onSelect,
}: CreateProjectMemberSuggestionsProps) => {
  const { t } = useTranslation("dashboard");

  if (isLoading) {
    return (
      <p className={`${FONT_STYLES.caption} text-secondary-400`}>
        {t("createProject.members.loading")}
      </p>
    );
  }

  if (query.trim().length === 0) {
    return null;
  }

  if (members.length === 0) {
    return (
      <p className={`${FONT_STYLES.caption} text-secondary-400`}>
        {t("createProject.members.noResults")}
      </p>
    );
  }

  return (
    <ul className="max-h-32 overflow-y-auto rounded-lg border border-secondary-200 bg-white shadow-sm">
      {members.map((member) => (
        <li key={member.userId}>
          <button
            type="button"
            onClick={() => onSelect(member)}
            className="flex w-full items-center gap-2 px-2.5 py-1.5 text-start transition-colors hover:bg-secondary-50"
          >
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary-100 text-[9px] font-semibold text-primary-700">
              {getInitials(member.fullName)}
            </span>
            <span className="min-w-0 flex-1">
              <span
                className={`${FONT_STYLES.caption} block truncate font-medium text-secondary-900`}
              >
                {member.fullName}
              </span>
              {member.email ? (
                <span className="block truncate text-[10px] text-secondary-400">
                  {member.email}
                </span>
              ) : null}
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
};
