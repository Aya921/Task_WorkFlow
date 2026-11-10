import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import type { DashboardProject } from "../../../domain/entity/dashboard_project";
import { FONT_STYLES } from "../../../../../assets/fonts/font_style";
import {
  DASHBOARD_CARD_HOVER,
  DASHBOARD_CARD_HOVER_TRANSITION,
  getDashboardItemVariants,
} from "../../motion/dashboard_motion";
import { formatRelativeTime } from "../../utils/format_relative_time";
import { ProjectMembersList } from "./project_members_list";
import { ProjectProgressBar } from "./project_progress_bar";

export type ProjectCardProps = {
  project: DashboardProject;
};

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const { t, i18n } = useTranslation("dashboard");
  const reduceMotion = Boolean(useReducedMotion());
  const lastUpdatedLabel = formatRelativeTime(
    project.lastTaskUpdatedAt,
    i18n.language,
  );

  return (
    <motion.article
      variants={getDashboardItemVariants(reduceMotion)}
      whileHover={reduceMotion ? undefined : DASHBOARD_CARD_HOVER}
      transition={DASHBOARD_CARD_HOVER_TRANSITION}
      className="flex h-full flex-col gap-4 rounded-2xl border border-secondary-200 bg-white p-5"
    >
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <span className="relative inline-flex size-3 items-center justify-center">
            <motion.span
              className="absolute inline-flex size-3 rounded-full opacity-40"
              style={{ backgroundColor: project.color || "#000" }}
              animate={
                reduceMotion
                  ? undefined
                  : { scale: [1, 1.55, 1], opacity: [0.35, 0.15, 0.35] }
              }
              transition={
                reduceMotion
                  ? undefined
                  : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
              }
            />
            <span
              className="relative size-3 rounded-full"
              style={{ backgroundColor: project.color || "#000" }}
            />
          </span>
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

      <div className="mt-auto flex items-end justify-between gap-3">
        <ProjectMembersList members={project.members} />
        <div className={`${FONT_STYLES.caption} flex shrink-0 text-end font-black text-secondary-500`}>
          <p>{t("projects.tasksCount", { count: project.totalTasks })}</p>
          <span className="relative mx-3 flex items-center justify-center">
            <span className="absolute inline-flex size-2 animate-ping rounded-full bg-green-600" />
            <span className="absolute size-2 rounded-full bg-green-500" />
          </span>
          {lastUpdatedLabel ? (
            <p>{t("projects.updatedAt", { time: lastUpdatedLabel })}</p>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
};
