
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { NavigationButtons } from "../components/navigation_btns";
import { useSignupContext } from "../hooks/use_signup_context";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../../routes/route_path";
import { WorkSpaceCards } from "../components/workspace/workspace_cards";
import type { WorkspaceMode } from "../types/workspace_mode";
import { WorkSpaceInputField } from "../components/workspace/workspace_input_field";
import { AuthSectionHeader } from "../components/auth_header";

export const CreateWorkSpacePage = () => {
  const { previousStep, nextStep } = useSignupContext();
  const navigate = useNavigate();
  const { t } = useTranslation("signup");
  const [workspaceMode, setWorkspaceMode] = useState<WorkspaceMode>(null);
  const [inputValue, setInputValue] = useState("");

  const handleSelectWorkspace = (mode: WorkspaceMode) => {
    setWorkspaceMode(mode);
    setInputValue("");
  };

  return (
    <div className="flex w-full flex-col items-center justify-between gap-6 sm:gap-8 md:gap-10">
      <AuthSectionHeader
        title={t("workspace.title")}
        description={t("workspace.description")}
      />

      <WorkSpaceCards
        handleSelectWorkSpace={handleSelectWorkspace}
        workSpaceMode={workspaceMode}
      />

      {workspaceMode !== null && (
        <WorkSpaceInputField
          workSpaceMode={workspaceMode}
          handleInputValue={setInputValue}
        />
      )}

      <NavigationButtons
        backLabel={t("workspace.buttons.back")}
        nextLabel={t("workspace.buttons.continue")}
        isNextDisabled={workspaceMode === null || inputValue.trim() === ""}
        onBack={() => {
          previousStep();
          navigate(ROUTES.VERIFICATION);
        }}
        onNext={() => {
          nextStep();
          navigate(ROUTES.CONNECT_GITHUB);
        }}
      />
    </div>
  );
};
