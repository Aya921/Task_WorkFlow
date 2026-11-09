import { useTranslation } from "react-i18next";
import type { DashboardProject } from "../../../domain/entity/dashboard_project";
import { FONT_STYLES } from "../../../../../assets/fonts/font_style";
import { ProjectMembersList } from "./project_members_list";
import { ProjectProgressBar } from "./project_progress_bar";

export type ProjectCardProps = {
  project: DashboardProject;
};

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const { t } = useTranslation("dashboard");

  return (
    <article className="flex h-full flex-col gap-4 rounded-2xl border border-secondary-200 bg-white p-5">
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-3">
          <h3 className={`${FONT_STYLES.h4} text-secondary-900`}>
            {project.name}
          </h3>
          {project.status === "archived" ? (
            <span className={`${FONT_STYLES.caption} rounded-full bg-secondary-100 px-2 py-0.5 font-semibold text-secondary-500`}>
              {t("projects.archived")}
            </span>
          ) : null}
        </div>
        {project.description ? (
          <p className={`${FONT_STYLES.bodySm} line-clamp-2 text-secondary-500`}>
            {project.description}
          </p>
        ) : null}
      </div>

      <ProjectProgressBar progress={project.progress} color={project.color} />

      <div className="mt-auto flex items-center justify-between gap-3">
        <ProjectMembersList members={project.members} />
        <span className={`${FONT_STYLES.caption} shrink-0 font-medium text-secondary-500`}>
          {t("projects.tasksCount", { count: project.totalTasks })}
        </span>
      </div>
    </article>
  );
};
