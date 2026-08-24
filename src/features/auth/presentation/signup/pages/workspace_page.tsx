import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { NavigationButtons } from "../components/navigation_btns";
import { useSignupContext } from "../hooks/use_signup_context";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../../routes/route_path";
import { WorkSpaceCards } from "../components/workspace/workspace_cards";
import type { WorkspaceMode } from "../types/workspace_mode";
import { WorkSpaceInputField } from "../components/workspace/workspace_input_field";
import { AuthSectionHeader } from "../components/auth_header";
import { useCreateWorkSpaceMutation } from "../hooks/use_create_workspace_mutatuion";
import type { CreateWorkspaceRequest } from "../../../domain/entity/create_work_space_request";
import { supabase } from "../../../../../core/supabase/supabase_client";
import type { AuthResponse, User, UserResponse } from "@supabase/supabase-js";

export const CreateWorkSpacePage = () => {
  const { previousStep } = useSignupContext();
  const navigate = useNavigate();
  const { t } = useTranslation("signup");
  const [workspaceMode, setWorkspaceMode] = useState<WorkspaceMode>(null);
  const [inputValue, setInputValue] = useState("");
  const [userBase,setUserBase]=useState<User|null>(null);

  const handleSelectWorkspace = (mode: WorkspaceMode) => {
    setWorkspaceMode(mode);
    setInputValue("");
  };

  const { createWorkSpaceFn, data } = useCreateWorkSpaceMutation();

  const handleSubmit = (entity: CreateWorkspaceRequest) => {
    createWorkSpaceFn(entity, {
      onSuccess: () => {
        console.log(data?.inviteCode);
      },

      onError: (error) => {
        console.log(error.message);
      },
    });
  };
  useEffect(() => {
    const loadUser = async () => {
      const { data:{user} } = await supabase.auth.getUser();
     
      setUserBase(user)
    };

    loadUser();
  }, []);

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
        onBack={() => {
          previousStep();
          navigate(ROUTES.VERIFICATION);
        }}
        onNext={() => {
          // nextStep();
          // navigate(ROUTES.CONNECT_GITHUB);
          handleSubmit({
            name: inputValue,
            created_by: userBase?.id ?? "",
          });
        }}
      />
    </div>
  );
};
