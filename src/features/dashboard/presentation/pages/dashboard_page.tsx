import { Plus } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { EmptyDashboardLottieAnimation } from "../../../../animations/empty_dashboard_animation";
import { useAuth } from "../../../../hooks/use_auth";
import { HighlightText } from "../../../../shared/components/highlight_text";
import { EmptyDashboard } from "../components/empty/empty_dashboard";
import { DashboardMetricsSection } from "../components/metrics/dashboard_metrics_section";
import { DashboardProjectsSection } from "../components/projects/dashboard_projects_section";
import { DashboardRecentTasksSection } from "../components/recent_tasks/dashboard_recent_tasks_section";
import { DashboardSkeleton } from "../components/skeleton/dashboard_skeleton";
import { DashboardWelcomeBanner } from "../components/welcome/dashboard_welcome_banner";
import { useWorkspaceDashboardQuery } from "../hooks/use_workspace_dashboard_query";
import { getDashboardContainerVariants } from "../motion/dashboard_motion";

export const DashboardPage = () => {
  const { t } = useTranslation("dashboard");
  const { profile } = useAuth();
  const reduceMotion = Boolean(useReducedMotion());
  const workspaceId = profile?.currentWorkspaceId ?? undefined;
  const workspaceRole = profile?.currentWorkspaceRole ?? "member";
  const { data, isLoading, isError } = useWorkspaceDashboardQuery(workspaceId);

  const emptyDashboard = (
    <EmptyDashboard
      header={{
        sectionLabel: t("empty.sectionLabel"),
        workspaceName: "Acme Studio",
        badgeLabel: t("empty.badgeLabel"),
        subtitle: t("empty.subtitle"),
      }}
      animation={<EmptyDashboardLottieAnimation />}
      cta={{
        title: (
          <>
            {t("empty.ctaTitlePrefix")}{" "}
            <HighlightText>{t("empty.ctaTitleHighlight")}</HighlightText>
          </>
        ),
        description: t("empty.description"),
        primaryAction: {
          label: t("empty.createProject"),
          icon: Plus,
        },
      }}
    />
  );

  if (isLoading) {
    return (
      <main className="relative min-h-screen overflow-hidden bg-background px-6 py-8 lg:px-10">
        <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-8">
          <DashboardWelcomeBanner userName={profile?.userName} />
          <DashboardSkeleton />
        </div>
      </main>
    );
  }

  if (!workspaceId || isError || !data || data.projects.length === 0) {
    return emptyDashboard;
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-background px-6 py-8 lg:px-10">
      <motion.div
        className="relative mx-auto flex w-full max-w-7xl flex-col gap-8"
        variants={getDashboardContainerVariants(reduceMotion)}
        initial="hidden"
        animate="show"
      >
        <DashboardWelcomeBanner userName={profile?.userName} />
        <DashboardMetricsSection metrics={data.metrics} />
        <DashboardProjectsSection projects={data.projects} workspaceRole={workspaceRole} />
        <DashboardRecentTasksSection
          tasks={data.recentTasks}
          projects={data.projects}
          totalTasks={data.metrics.totalTasks}
        />
      </motion.div>
    </main>
  );
};
