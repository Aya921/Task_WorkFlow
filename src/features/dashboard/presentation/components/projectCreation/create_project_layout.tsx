import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { InputField } from "../../../../../shared/components/input_field";
import { FONT_STYLES } from "../../../../../assets/fonts/font_style";
import { useAuth } from "../../../../../hooks/use_auth";
import {
  dashboardCreateProjectSchema,
  type CreateProjectFormData,
} from "../../../types/create_project_schema";
import type { WorkspaceMember } from "../../../domain/entity/workspace_member";
import { useWorkspaceDashboardQuery } from "../../hooks/use_workspace_dashboard_query";
import { CreateProjectColorSection } from "./create_project_color_section";
import { CreateProjectDescriptionField } from "./create_project_description_field";
import { CreateProjectFooter } from "./create_project_footer";
import { CreateProjectHeader } from "./create_project_header";
import { CreateProjectInvitationExpiryField } from "./create_project_invitation_expiry_field";
import {
  DEFAULT_INVITATION_EXPIRY,
  getInvitationExpiryHours,
} from "./invitation_expiry_options";
import { CreateProjectMembersSection } from "./create_project_members_section";
import { CreateProjectPreview } from "./create_project_preview";
import {
  DEFAULT_PROJECT_COLOR,
  type ProjectColorOption,
} from "./project_colors";
import { useAddProjectMutation } from "../../hooks/use_add_project_mutation";

type CreateProjectLayoutProps = {
  onClose: () => void;
};

export const CreateProjectLayout = ({ onClose }: CreateProjectLayoutProps) => {
  const { t } = useTranslation("dashboard");
  const { profile } = useAuth();
  const workspaceId = profile?.currentWorkspaceId ?? undefined;
  const { data: dashboard, isLoading: isLoadingWorkspaceMembers } =
    useWorkspaceDashboardQuery(workspaceId);
  const workspaceMembers = dashboard?.members ?? [];

  const [selectedColor, setSelectedColor] = useState<ProjectColorOption>(
    DEFAULT_PROJECT_COLOR,
  );
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
  const {  addProjectFn, isLoading} = useAddProjectMutation();

  const {
    formState: { errors },
    register,
    handleSubmit,
    setValue,
    control,
  } = useForm<CreateProjectFormData>({
    resolver: zodResolver(dashboardCreateProjectSchema(t)),
    mode: "onSubmit",
    defaultValues: {
      projectName: "",
      projectDescription: "",
      projectColor: DEFAULT_PROJECT_COLOR.color,
      projectMembers: [],
      invitationExpiry: DEFAULT_INVITATION_EXPIRY,
    },
  });

  const projectName = useWatch({ control, name: "projectName" });
  const projectDescription = useWatch({ control, name: "projectDescription" });

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const syncMembers = (nextMembers: WorkspaceMember[]) => {
    setMembers(nextMembers); // using in the ui to display the members
    setValue(
      // will sent in the form to the backend and we remove the current user from the list because
      "projectMembers",
      nextMembers
        .filter((member) => member.userId !== profile?.userId)
        .map((member) => member.userId),
      { shouldValidate: true },
    );
  };

  const handleSelectColor = (color: ProjectColorOption) => {
    setSelectedColor(color);
    setValue("projectColor", color.color, { shouldValidate: true });
  };

  const handleAddMember = (workspaceMember: WorkspaceMember) => {
    // if the member is already in the list, we don't add them again
    if (members.some((member) => member.userId === workspaceMember.userId)) {
      return;
    }

    syncMembers([
      ...members,
      {
        userId: workspaceMember.userId,
        fullName: workspaceMember.fullName,
        email: workspaceMember.email,
        role: "member",
      },
    ]);
  };

  const handleRemoveMember = (id: string) => {
    if (id === profile?.userId) {
      return;
    }
    syncMembers(members.filter((member) => member.userId !== id));
  };

  const onSubmit = (data: CreateProjectFormData) => {
   
    if(workspaceId) {
      addProjectFn({
        workspaceId,
        name: data.projectName,
        description: data.projectDescription,
        color: data.projectColor,
        memberIds:data.projectMembers, // TODO: remove this after testing
        invitationExpiresInHours: getInvitationExpiryHours(data.invitationExpiry),
      });
    }
  };

  return (
    <div
      className="fixed inset-0 z-40 flex items-end justify-center bg-black/50 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={onClose}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        role="dialog"
        aria-modal="true"
        aria-label={t("createProject.title")}
        onClick={(event) => event.stopPropagation()}
        className="flex max-h-[100dvh] w-full max-w-xl flex-col overflow-hidden rounded-t-2xl bg-white shadow-xl sm:max-h-[88vh] sm:rounded-xl"
      >
        <div className="flex flex-col gap-3 overflow-y-auto p-3 sm:gap-4 sm:p-5">
          <CreateProjectHeader onClose={onClose} />

          <div className="flex w-full flex-col gap-3 sm:gap-4">
            <InputField
              label={t("createProject.fields.name.label")}
              labelClassName={`block ${FONT_STYLES.overline} text-secondary-900`}
              type="text"
              autoComplete="off"
              placeholder={t("createProject.fields.name.placeholder")}
              fieldSize="sm"
              status={errors.projectName ? "error" : "default"}
              message={
                errors.projectName?.message ??
                t("createProject.fields.name.hint")
              }
              {...register("projectName")}
            />

            <CreateProjectDescriptionField
              value={projectDescription}
              errorMessage={errors.projectDescription?.message}
              registration={register("projectDescription")}
            />
          </div>

          <CreateProjectColorSection
            selectedColor={selectedColor}
            onSelect={handleSelectColor}
          />

          <CreateProjectMembersSection
            members={members}
            workspaceMembers={workspaceMembers}
            isLoadingWorkspaceMembers={isLoadingWorkspaceMembers}
            currentUserId={profile?.userId}
            onAdd={handleAddMember}
            onRemove={handleRemoveMember}
          />

          <CreateProjectInvitationExpiryField
            registration={register("invitationExpiry")}
            errorMessage={errors.invitationExpiry?.message}
          />

          <CreateProjectPreview
            name={projectName}
            color={selectedColor.color}
            members={members}
          />
        </div>

        <div className="border-t border-secondary-100 bg-white p-3 sm:px-5 sm:py-3">
          <CreateProjectFooter onCancel={onClose} isSubmitting={isLoading} />
        </div>
      </form>
    </div>
  );
};
