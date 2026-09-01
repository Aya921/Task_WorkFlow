import { useState } from "react";
import { useTranslation } from "react-i18next";
import { NavigationButtons } from "../components/navigation_btns";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../../routes/route_path";
import { WorkSpaceCards } from "../components/workspace/workspace_cards";
import type { WorkspaceMode } from "../types/workspace_mode";
import { WorkSpaceInputField } from "../components/workspace/workspace_input_field";
import { AuthSectionHeader } from "../components/auth_header";
import { useCreateWorkSpaceMutation } from "../hooks/use_create_workspace_mutatuion";
import type { CreateWorkspaceRequest } from "../../../domain/entity/create_work_space_request";
import { useAuth } from "../../../../../hooks/use_auth";
import { WorkspaceCodeView } from "../components/WorkspaceCodeView";
import { StorageKeys } from "../../../../../constants/storage_keys";
import { useSignupContext } from "../hooks/use_signup_context";



export const CreateWorkSpacePage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation("signup");
  const [workspaceMode, setWorkspaceMode] = useState<WorkspaceMode>(null);
  const [inputValue, setInputValue] = useState("");
  const { user,getProfile } = useAuth();
  const { nextStep } = useSignupContext();
  const [isWorkSpaceCreatedSuccess, setIsWorkSpaceCreatedSuccess] = useState(()=>{
    const storedWorkspaceId = sessionStorage.getItem(StorageKeys.WORKSPACE_Id);
    return storedWorkspaceId !== null && storedWorkspaceId !== "";
  });

  const handleSelectWorkspace = (mode: WorkspaceMode) => {
    setWorkspaceMode(mode);
    setInputValue("");
  };

  const { createWorkSpaceFn, isLoading } = useCreateWorkSpaceMutation();

  const handleSubmit = (entity: CreateWorkspaceRequest) => {
    createWorkSpaceFn(entity, {
      onSuccess: (data) => {
        setIsWorkSpaceCreatedSuccess(true);
        sessionStorage.setItem(StorageKeys.WORKSPACE_Id, data?.inviteCode ?? "");
        getProfile(); 
      
      },

      onError: (error) => {
        console.log(error.message);
      },
    });
  };

  const handleContinue = () => {
    const nextKeyStep = nextStep();
    console.log("next step is", nextKeyStep);
   
    navigate(`/signup/${nextKeyStep}`);
  };

  // Show success view if workspace was created
  if (isWorkSpaceCreatedSuccess) {
    return (
      <div className="flex w-full flex-col items-center justify-between gap-6 sm:gap-8 md:gap-10">
       

        <WorkspaceCodeView
          inviteCode={sessionStorage.getItem(StorageKeys.WORKSPACE_Id) ?? ""}
          onContinue={handleContinue}
         
        />
      </div>
    );
  }

  // Show form view
  return (
    <div className="flex w-full flex-col items-center justify-between gap-6 sm:gap-8 md:gap-10">
      <AuthSectionHeader
        className="text-center"
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
        isNextLoading={isLoading}
        onBack={() => {
          
          navigate(ROUTES.VERIFICATION);
        }}
        onNext={() => {
          handleSubmit({
            name: inputValue,
            created_by: user?.id ?? "",
          });
        }}
      />
    </div>
  );
};
