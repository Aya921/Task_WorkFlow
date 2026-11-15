import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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
import type {
  CreateProjectMember,
  ProjectMemberRole,
} from "./create_project_member";
import { CreateProjectMembersSection } from "./create_project_members_section";
import { CreateProjectPreview } from "./create_project_preview";
import {
  DEFAULT_PROJECT_COLOR,
  type ProjectColorOption,
} from "./project_colors";

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

  const [selectedColor, setSelectedColor] =
    useState<ProjectColorOption>(DEFAULT_PROJECT_COLOR);
  const [members, setMembers] = useState<CreateProjectMember[]>(() => {
    if (!profile) {
      return [];
    }

    return [
      {
        id: profile.userId,
        name: profile.userName,
        email: profile.userEmail,
        role: "projectLead",
      },
    ];
  });

  const {
    formState: { errors },
    register,
    handleSubmit,
    setValue,
    watch,
  } = useForm<CreateProjectFormData>({
    resolver: zodResolver(dashboardCreateProjectSchema(t)),
    mode: "onSubmit",
    defaultValues: {
      projectName: "",
      projectDescription: "",
      projectColor: DEFAULT_PROJECT_COLOR.color,
      projectMembers: [],
    },
  });

  const projectName = watch("projectName");
  const projectDescription = watch("projectDescription");

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const syncMembers = (nextMembers: CreateProjectMember[]) => {
    setMembers(nextMembers);
    setValue(
      "projectMembers",
      nextMembers
        .filter((member) => member.id !== profile?.userId)
        .map((member) => member.id),
      { shouldValidate: true },
    );
  };

  const handleSelectColor = (color: ProjectColorOption) => {
    setSelectedColor(color);
    setValue("projectColor", color.color, { shouldValidate: true });
  };

  const handleAddMember = (workspaceMember: WorkspaceMember) => {
    if (members.some((member) => member.id === workspaceMember.userId)) {
      return;
    }

    syncMembers([
      ...members,
      {
        id: workspaceMember.userId,
        name: workspaceMember.fullName,
        email: workspaceMember.email ?? undefined,
        role: "contributor",
      },
    ]);
  };

  const handleRoleChange = (id: string, role: ProjectMemberRole) => {
    syncMembers(
      members.map((member) =>
        member.id === id ? { ...member, role } : member,
      ),
    );
  };

  const handleRemoveMember = (id: string) => {
    if (id === profile?.userId) {
      return;
    }
    syncMembers(members.filter((member) => member.id !== id));
  };

  const onSubmit = (data: CreateProjectFormData) => {
    console.log("data is ", { ...data, members });
  };

  return (
    <div
      className="fixed inset-0 z-40 flex items-end justify-center bg-black/50 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      role="presentation"
      onClick={onClose}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        role="dialog"
        aria-modal="true"
        aria-label={t("createProject.title")}
        onClick={(event) => event.stopPropagation()}
        className="flex max-h-[100dvh] w-full max-w-3xl flex-col overflow-hidden rounded-t-2xl bg-white shadow-xl sm:max-h-[92vh] sm:rounded-2xl"
      >
        <div className="flex flex-col gap-5 overflow-y-auto p-4 sm:gap-6 sm:p-6 md:p-8">
          <CreateProjectHeader onClose={onClose} />

          <div className="flex w-full flex-col gap-5 sm:gap-6">
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
            onAdd={handleAddMember}
            onRoleChange={handleRoleChange}
            onRemove={handleRemoveMember}
          />

          <CreateProjectPreview
            name={projectName}
            color={selectedColor.color}
            members={members}
          />
        </div>

        <div className="border-t border-secondary-100 bg-white p-4 sm:px-6 sm:py-5 md:px-8">
          <CreateProjectFooter onCancel={onClose} />
        </div>
      </form>
    </div>
  );
};
