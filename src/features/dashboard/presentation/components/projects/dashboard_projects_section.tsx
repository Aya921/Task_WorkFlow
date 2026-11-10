import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import type { DashboardProject } from "../../../domain/entity/dashboard_project";
import { FONT_STYLES } from "../../../../../assets/fonts/font_style";
import { Button } from "../../../../../shared/components/button";
import {
  getDashboardGroupVariants,
  getDashboardItemVariants,
} from "../../motion/dashboard_motion";
import { ProjectCard } from "./project_card";
import {
  ProjectStatusFilter,
  type ProjectStatusFilterValue,
} from "./project_status_filter";

export type DashboardProjectsSectionProps = {
  projects: DashboardProject[];
};

export const DashboardProjectsSection = ({
  projects,
}: DashboardProjectsSectionProps) => {
  const { t } = useTranslation("dashboard");
  const reduceMotion = Boolean(useReducedMotion());
  const [statusFilter, setStatusFilter] =
    useState<ProjectStatusFilterValue>("active");

  const filteredProjects = useMemo(() => {
    if (statusFilter === "all") {
      return projects;
    }

    return projects.filter((project) => project.status === statusFilter);
  }, [projects, statusFilter]);

  return (
    <motion.section
      variants={getDashboardItemVariants(reduceMotion)}
      className="space-y-4"
    >
      <motion.div
        variants={getDashboardItemVariants(reduceMotion)}
        className="flex flex-wrap items-center justify-between gap-3"
      >
        <div>
          <p className={`${FONT_STYLES.overline} text-secondary-400`}>
            {t("projects.sectionLabel")}
          </p>
          <h2 className={`${FONT_STYLES.h3} text-secondary-900`}>
            {t("projects.title")}
          </h2>
        </div>

        <Button
          type="button"
          wrapperClassName="inline-flex"
          className="rounded-xl px-4 py-2 text-sm font-semibold"
          activeClassName="bg-primary-600 text-white hover:bg-primary-700"
        >
          <Plus className="h-4 w-4" aria-hidden />
          <span>{t("projects.newProject")}</span>
        </Button>
      </motion.div>

      <motion.div variants={getDashboardItemVariants(reduceMotion)}>
        <ProjectStatusFilter
          value={statusFilter}
          onChange={setStatusFilter}
        />
      </motion.div>

      {filteredProjects.length === 0 ? (
        <p className={`${FONT_STYLES.bodySm} text-secondary-500`}>
          {t("projects.emptyFilter")}
        </p>
      ) : (
        <motion.div
          variants={getDashboardGroupVariants(reduceMotion)}
          className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3"
        >
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>
      )}
    </motion.section>
  );
};
