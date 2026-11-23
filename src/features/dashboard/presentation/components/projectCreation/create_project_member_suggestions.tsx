import { useTranslation } from "react-i18next";
import { FONT_STYLES } from "../../../../../assets/fonts/font_style";
import type { WorkspaceMember } from "../../../domain/entity/workspace_member";
import { SuggestionCard } from "./suggestion_card";

type CreateProjectMemberSuggestionsProps = {
  members: WorkspaceMember[];
  isLoading: boolean;
  query: string;
  onSelect: (member: WorkspaceMember) => void;
  externalSuggestion: string;
  onSelectExternalSuggestion: (email: string) => void;
};

export const CreateProjectMemberSuggestions = ({
  members,
  isLoading,
  query,
  onSelect,
  externalSuggestion,
  onSelectExternalSuggestion,
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

  

  if (externalSuggestion.length > 0) {
    return (
      <ul className="max-h-32 overflow-y-auto rounded-lg border border-secondary-200 bg-white shadow-sm">
        <SuggestionCard
          text={externalSuggestion}
          onSelectExternal={onSelectExternalSuggestion}
          isExternal={true}
        />
      </ul>
    );
  }

  return (
    <ul className="max-h-32 overflow-y-auto rounded-lg border border-secondary-200 bg-white shadow-sm">
      {members.map((member) => (
        <SuggestionCard
          key={member.fullName}
          text={member.fullName}
          workspaceMember={member}
          onSelect={onSelect}
          isExternal={false}
        />
      ))}
    </ul>
  );
};
