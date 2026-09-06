import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../../routes/route_path";
import { WorkSpaceCards } from "../components/workspace/workspace_cards";
import type { WorkspaceMode } from "../types/workspace_mode";
import { WorkSpaceInputField } from "../components/workspace/workspace_input_field";
import { AuthSectionHeader } from "../components/auth_header";
import { useCreateWorkSpaceMutation } from "../hooks/use_create_workspace_mutatuion";
import type { CreateWorkspaceRequest } from "../../../domain/entity/create_work_space_request";
import { useAuth } from "../../../../../hooks/use_auth";
import { WorkspaceCodeView } from "../components/workspace_code_view";
import { useSignupContext } from "../hooks/use_signup_context";
import { Button } from "../../../../../shared/components/button";
import { FONT_STYLES } from "../../../../../assets/fonts/font_style";
import { PageTransition } from "../layout/page_transtion";
import { motion } from "framer-motion";

export const CreateWorkSpacePage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation("signup");
  const [workspaceMode, setWorkspaceMode] = useState<WorkspaceMode>(null);
  const [inputValue, setInputValue] = useState("");
  const { user, getProfile } = useAuth();
  const { nextStep } = useSignupContext();
  const [isWorkSpaceCreatedSuccess, setIsWorkSpaceCreatedSuccess] =
    useState(false);

  const handleSelectWorkspace = (mode: WorkspaceMode) => {
    setWorkspaceMode(mode);
    setInputValue("");
  };

  const { createWorkSpaceFn, isLoading, data } = useCreateWorkSpaceMutation();

  const handleSubmit = (entity: CreateWorkspaceRequest) => {
    createWorkSpaceFn(entity, {
      onSuccess: () => {
        setIsWorkSpaceCreatedSuccess(true);
      },

      onError: (error) => {
        console.log(error.message);
      },
    });
  };

  const handleContinue = () => {
    // getProfile();
  };

  // Show success view if workspace was created
  if (isWorkSpaceCreatedSuccess) {
    return (
      <motion.div
        className="flex w-full flex-1 flex-col items-center justify-between gap-6 sm:gap-8 md:gap-10"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <WorkspaceCodeView
          inviteCode={data?.inviteCode ?? ""}
          onContinue={handleContinue}
        />
      </motion.div>
    );
  }

  // Show form view
  return (
    <PageTransition>
      <div className="flex w-full flex-1 flex-col items-center justify-between gap-6 sm:gap-8 md:gap-10">
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

        <Button
          onClick={() => {
            handleSubmit({
              name: inputValue,
              created_by: user?.id ?? "",
            });
          }}
          isLoading={isLoading}
          disabled={workspaceMode === null || inputValue.trim() === ""}
          activeClassName="bg-gradient-to-r from-primary-600 via-primary-500 to-violet-500 text-white shadow-lg shadow-primary-500/20 hover:shadow-xl hover:shadow-primary-500/30"
          disabledClassName="bg-slate-200 text-slate-500 cursor-not-allowed"
          className="w-full"
        >
          <span className={FONT_STYLES.button}>
            {t("workspace.buttons.continue")}
          </span>
        </Button>
      </div>
    </PageTransition>
  );
};
