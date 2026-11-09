import { Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { DashboardProject } from "../../../domain/entity/dashboard_project";
import { FONT_STYLES } from "../../../../../assets/fonts/font_style";
import { Button } from "../../../../../shared/components/button";
import { ProjectCard } from "./project_card";

export type DashboardProjectsSectionProps = {
  projects: DashboardProject[];
};

export const DashboardProjectsSection = ({
  projects,
}: DashboardProjectsSectionProps) => {
  const { t } = useTranslation("dashboard");

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
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
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
};
