import { useState } from "react";
import type { UseFormSetValue } from "react-hook-form";
import type { CreateProjectFormData } from "../../types/create_project_schema";

export const useExternalProjectMembers = (
  setValue: UseFormSetValue<CreateProjectFormData>,
) => {
  const [externalMembers, setExternalMembers] = useState<string[]>([]);

  const syncExternalMembers = (newExternalMembers: string[]) => {
    setExternalMembers(newExternalMembers);
    setValue("externalMemberEmails", newExternalMembers);
  };

  const handleAddExternalMember = (email: string) => {
    if (
      externalMembers.some((m) => m.toLowerCase() === email.toLowerCase())
    ) {
      return;
    }
    syncExternalMembers([...externalMembers, email]);
  };

  const handleRemoveExternalMember = (email: string) => {
    syncExternalMembers(
      externalMembers.filter((m) => m.toLowerCase() !== email.toLowerCase()),
    );
  };

  return {
    externalMembers,
    handleAddExternalMember,
    handleRemoveExternalMember,
  };
};
