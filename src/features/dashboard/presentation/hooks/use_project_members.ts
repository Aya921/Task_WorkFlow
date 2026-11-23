import { useState } from "react";
import type { UseFormSetValue } from "react-hook-form";
import type { Profile } from "../../../auth/domain/entity/profile";
import type { WorkspaceMember } from "../../domain/entity/workspace_member";
import type { CreateProjectFormData } from "../../types/create_project_schema";

export const useProjectMembers = (
  profile: Profile | null | undefined,
  setValue: UseFormSetValue<CreateProjectFormData>,
) => {
  const [members, setMembers] = useState<WorkspaceMember[]>(() => {
    if (!profile) {
      return [];
    }

    return [
      {
        userId: profile.userId,
        fullName: profile.userName,
        email: profile.userEmail,
        role: "owner",
      } as WorkspaceMember,
    ];
  });

  const syncMembers = (newMembers: WorkspaceMember[]) => {
    setMembers(newMembers);
    const addedMembers = newMembers.filter((m) => m.userId !== profile?.userId);
    setValue(
      "projectMembers",
      addedMembers.map((m) => m.userId),
    );
  };

  const handleAddMember = (member: WorkspaceMember) => {
    if (members.some((m) => m.userId === member.userId)) {
      return;
    }
    syncMembers([...members, member]);
  };

  const handleRemoveMember = (id: string) => {
    if (id === profile?.userId) {
      return;
    }
    syncMembers(members.filter((m) => m.userId !== id));
  };

  return { members, handleAddMember, handleRemoveMember };
};
