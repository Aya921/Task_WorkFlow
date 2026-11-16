import { Plus, UserRoundPlus } from "lucide-react";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FONT_STYLES } from "../../../../../assets/fonts/font_style";
import { InputField } from "../../../../../shared/components/input_field";
import type { WorkspaceMember } from "../../../domain/entity/workspace_member";
import { CreateProjectMemberChip } from "./create_project_member_chip";
import { CreateProjectMemberSuggestions } from "./create_project_member_suggestions";

type CreateProjectMembersSectionProps = {
  members: WorkspaceMember[];
  workspaceMembers: WorkspaceMember[];
  isLoadingWorkspaceMembers: boolean;
  currentUserId?: string;
  onAdd: (member: WorkspaceMember) => void;
  onRemove: (id: string) => void;
};

export const CreateProjectMembersSection = ({
  members,
  workspaceMembers,
  isLoadingWorkspaceMembers,
  currentUserId,
  onAdd,
  onRemove,
}: CreateProjectMembersSectionProps) => {
  const { t } = useTranslation("dashboard");
  const [query, setQuery] = useState("");

  const suggestions = useMemo(() => {
    const assignedIds = new Set(members.map((member) => member.userId));
    const normalizedQuery = query.trim().toLowerCase();

    return workspaceMembers.filter((member) => {
      if (assignedIds.has(member.userId)) {
        return false;
      }

      if (!normalizedQuery) {
        return false;
      }

      const nameMatch = member.fullName.toLowerCase().includes(normalizedQuery);
      const emailMatch = member.email?.toLowerCase().includes(normalizedQuery);
      return nameMatch || Boolean(emailMatch);
    });
  }, [members, query, workspaceMembers]);

  const resolveMemberFromQuery = () => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) {
      return null;
    }

    return (
      suggestions.find(
        (member) =>
          member.fullName.toLowerCase() === normalizedQuery ||
          member.email?.toLowerCase() === normalizedQuery,
      ) ??
      suggestions[0] ??
      null
    );
  };

  const handleAdd = () => {
    const member = resolveMemberFromQuery();
    if (!member) {
      return;
    }
    onAdd(member);
    setQuery("");
  };

  const handleSelect = (member: WorkspaceMember) => {
    onAdd(member);
    setQuery("");
  };

  return (
    <div className="flex w-full flex-col gap-2.5">
      <div className="flex flex-wrap items-center gap-2">
        <h3 className={`${FONT_STYLES.overline} text-secondary-900`}>
          {t("createProject.members.label")}
        </h3>
        <span
          className={`${FONT_STYLES.caption} rounded-full bg-secondary-100 px-2 py-0.5 font-semibold text-secondary-500`}
        >
          {t("createProject.members.assigned", { count: members.length })}
        </span>
      </div>

      <div className="flex flex-col gap-1.5">
        <InputField
          label={t("createProject.members.searchLabel")}
          labelClassName="sr-only"
          icon={UserRoundPlus}
          iconPosition="start"
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              handleAdd();
            }
          }}
          autoComplete="off"
          placeholder={t("createProject.members.searchPlaceholder")}
          fieldSize="sm"
          inputAccessory={
            <button
              type="button"
              onClick={handleAdd}
              className="inline-flex h-full items-center gap-1 rounded-md bg-secondary-900 px-2.5 text-[11px] font-bold text-white"
            >
              <Plus size={12} strokeWidth={2.5} />
              {t("createProject.members.add")}
            </button>
          }
        />

        <CreateProjectMemberSuggestions
          members={suggestions}
          isLoading={isLoadingWorkspaceMembers}
          query={query}
          onSelect={handleSelect}
        />
      </div>

      {members.length > 0 ? (
        <div className="flex flex-wrap gap-1.5">
          {members.map((member) => (
            <CreateProjectMemberChip
              key={member.userId}
              member={member}
              canRemove={member.userId !== currentUserId}
              onRemove={() => onRemove(member.userId)}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};
