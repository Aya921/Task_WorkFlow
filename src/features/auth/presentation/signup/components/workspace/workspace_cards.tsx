import { HousePlus, UserPlus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { WorkspaceOptionCard } from "./workspace_option_card";
import type { WorkspaceMode } from "../../types/workspace_mode";

type WorkSpaceCardsProps = {
  handleSelectWorkSpace: (mode: WorkspaceMode) => void;
  workSpaceMode: WorkspaceMode;
};

export const WorkSpaceCards = ({ handleSelectWorkSpace, workSpaceMode }: WorkSpaceCardsProps) => {
  const { t } = useTranslation("signup");

  return (
   <div className="flex w-full flex-col gap-4 md:flex-row md:gap-6">
        <WorkspaceOptionCard
          title={t("workspace.create.title")}
          description={t("workspace.create.description")}
          icon={HousePlus}
          selected={workSpaceMode === "create"}
          onClick={() => handleSelectWorkSpace("create")}
        />

        <WorkspaceOptionCard
          title={t("workspace.join.title")}
          description={t("workspace.join.description")}
          icon={UserPlus}
          variant="rose"
          selected={workSpaceMode === "join"}
          onClick={() => handleSelectWorkSpace("join")}
        />
      </div>
  );
};
