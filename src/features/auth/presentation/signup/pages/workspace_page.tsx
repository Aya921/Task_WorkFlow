
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { NavigationButtons } from "../components/navigation_btns";
import { useSignupContext } from "../hooks/use_signup_context";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../../routes/route_path";
import { WorkSpaceHeader } from "../components/workspace/workspace_header";
import { WorkSpaceCards } from "../components/workspace/workspace_cards";
import type { WorkspaceMode } from "../types/workspace_mode";
import { WorkSpaceInputField } from "../components/workspace/workspace_input_field";

export const CreateWorkSpacePage = () => {
  const { previousStep } = useSignupContext();
  const navigate = useNavigate();
  const { t } = useTranslation("signup");
  const [workspaceMode, setWorkspaceMode] = useState<WorkspaceMode>(null);
  const [inputValue,setInputValue]=useState<string>("");

  console.log("input value is",inputValue)

  return (
    <div className="flex w-full flex-col items-center justify-between gap-6 sm:gap-8 md:gap-10">

      <WorkSpaceHeader />

      <WorkSpaceCards
        handleSelectWorkSpace={setWorkspaceMode}
        workSpaceMode={workspaceMode}
      />

      {workspaceMode !== null && (
        <WorkSpaceInputField workSpaceMode={workspaceMode} handleInputValue={(value)=>setInputValue(value)} />
      )}

      <NavigationButtons
   
        backLabel={t("workspace.buttons.back")}
        nextLabel={t("workspace.buttons.continue")}
        isNextDisabled={workspaceMode === null||inputValue===""}
        onBack={() => {
          previousStep();
          navigate(ROUTES.VERIFICATION);
        }}
        onNext={() => {
          // if join workspace is true then call api of join
          // else call the api of create
        }}
      />
    </div>
  );
};
