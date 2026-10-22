import { useState } from "react";
import { useTranslation } from "react-i18next";
import { WorkSpaceCards } from "../components/workspace/workspace_cards";
import type { WorkspaceMode } from "../types/workspace_mode";
import { WorkSpaceInputField } from "../components/workspace/workspace_input_field";
import { AuthSectionHeader } from "../components/auth_header";
import { useCreateWorkSpaceMutation } from "../hooks/use_create_workspace_mutation";
import { useJoinWorkspaceByInviteMutation } from "../hooks/use_join_workspace_by_invite_mutation";
import type { CreateWorkspaceRequest } from "../../../domain/entity/create_work_space_request";
import { useAuth } from "../../../../../hooks/use_auth";
import { WorkspaceCodeView } from "../components/workspace_code_view";
import { Button } from "../../../../../shared/components/button";
import { FONT_STYLES } from "../../../../../assets/fonts/font_style";
import { PageTransition } from "../layout/page_transition";
import { motion } from "framer-motion";

export const CreateWorkSpacePage = () => {
  const { t } = useTranslation("signup");
  const [workspaceMode, setWorkspaceMode] = useState<WorkspaceMode>(null);
  const [inputValue, setInputValue] = useState("");
  const { user, getProfile } = useAuth();

  const [isWorkSpaceCreatedSuccess, setIsWorkSpaceCreatedSuccess] =
    useState(false);

  const handleSelectWorkspace = (mode: WorkspaceMode) => {
    setWorkspaceMode(mode);
    setInputValue("");
  };

  const { createWorkSpaceFn, isLoading, data } = useCreateWorkSpaceMutation();
  const { joinWorkspaceByInviteFn, isLoading: isJoiningWorkspace } =
    useJoinWorkspaceByInviteMutation();

  const handleSubmit = (entity: CreateWorkspaceRequest) => {
    if (workspaceMode === "join") {
      joinWorkspaceByInviteFn(
        { code: inputValue },
        {
          onSuccess: (joined) => {
            if (joined) {
              
              getProfile();
            }
          },
        },
      );
      return;
    }

    createWorkSpaceFn(entity, {
      onSuccess: () => {
        setIsWorkSpaceCreatedSuccess(true);
      },
    });
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
        <WorkspaceCodeView inviteCode={data?.inviteCode ?? ""} />
      </motion.div>
    );
  }

  // Show form view
  return (
    <PageTransition>
      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-between gap-6 sm:gap-8">
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
          isLoading={isLoading || isJoiningWorkspace}
          disabled={workspaceMode === null || inputValue.trim() === ""}
          activeClassName="bg-primary-600 text-white shadow-sm hover:bg-primary-700 hover:shadow-md"
          disabledClassName="cursor-not-allowed bg-secondary-200 text-secondary-500"
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
