import { Plus, UserRoundPlus } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
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
  externalMembers: string[];
  onAddExternalMember: (email: string) => void;
  onRemove: (id: string) => void;
  onRemoveExternalMember: (email: string) => void;
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const CreateProjectMembersSection = ({
  members,
  workspaceMembers,
  isLoadingWorkspaceMembers,
  currentUserId,
  onAdd,
  onRemove,
  externalMembers,
  onAddExternalMember,
  onRemoveExternalMember,
}: CreateProjectMembersSectionProps) => {
  const { t } = useTranslation("dashboard");
  const [query, setQuery] = useState("");

  const suggestions: WorkspaceMember[] = useMemo(() => {
    // remove from workspaceMembers the members that are already in the members array or the current user
    const filteredMembers = workspaceMembers.filter(
      (member) =>
        members.every((m) => m.userId !== member.userId) &&
        member.userId !== currentUserId,
    );

    // now search for the members in the workspaceMembers by name or email
    const suggestionMembers = filteredMembers.filter(
      (member) =>
        member.fullName.toLowerCase().includes(query.toLowerCase()) ||
        member.email.toLowerCase().includes(query.toLowerCase()),
    );

    return suggestionMembers;
  }, [query, workspaceMembers, members, currentUserId]);


  const email=query.trim().toLowerCase();

  const externalSuggestions: string = useMemo(() => {
    // test if the query is a valid email
    if (
      emailRegex.test(email) &&
      !externalMembers.some(
        (memberEmail) => memberEmail.toLowerCase() === email,
      ) &&
      suggestions.length === 0 &&
      workspaceMembers.every(
        (member) => member.email.toLowerCase() !== email,
      )
    ) {
      return email;
    }
    return "";
  }, [email, externalMembers, suggestions, workspaceMembers]);

  const handleAddExternalMember = useCallback(
    (email: string) => {
      if (emailRegex.test(email.trim().toLowerCase())) {
        onAddExternalMember(email);
        setQuery("");
      }
    },
    [onAddExternalMember],
  );

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
          {t("createProject.members.assigned", {
            count: members.length + externalMembers.length,
          })}
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
              if (suggestions.length > 0) {
                handleSelect(suggestions[0]);
              }
              if (externalSuggestions.length > 0) {
                handleAddExternalMember(externalSuggestions);
              }
            }
          }}
          autoComplete="off"
          placeholder={t("createProject.members.searchPlaceholder")}
          fieldSize="sm"
          inputAccessory={
            <button
              type="button"
              disabled={
                suggestions.length === 0 && externalSuggestions.length === 0
              }
              onClick={() => {
                if (suggestions.length > 0) {
                  handleSelect(suggestions[0]);
                }
                if (externalSuggestions.length > 0) {
                  handleAddExternalMember(externalSuggestions);
                }
              }}
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
          externalSuggestion={externalSuggestions}
          onSelectExternalSuggestion={handleAddExternalMember}
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
        {externalMembers.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            {externalMembers.map((email) => (
              <CreateProjectMemberChip
                key={email}
                email={email}
                canRemove={true}
                onRemove={() => {
                  onRemoveExternalMember(email);
                }}
              />
            ))}
          </div>
        ) : null}
      </div>
    
  );
};
