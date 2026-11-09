import { Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { EmptyDashboardLottieAnimation } from "../../../../animations/empty_dashboard_animation";
import { useAuth } from "../../../../hooks/use_auth";
import { HighlightText } from "../../../../shared/components/highlight_text";
import { EmptyDashboard } from "../components/empty/empty_dashboard";
import { DashboardMetricsSection } from "../components/metrics/dashboard_metrics_section";
import { DashboardProjectsSection } from "../components/projects/dashboard_projects_section";
import { useWorkspaceDashboardQuery } from "../hooks/use_workspace_dashboard_query";

export const DashboardPage = () => {
  const { t } = useTranslation("dashboard");
  const { profile } = useAuth();
  const workspaceId = profile?.currentWorkspaceId ?? undefined;
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
      <main className="min-h-screen bg-background px-6 py-8 lg:px-10">
        <p className="text-sm text-secondary-500">{t("loading")}</p>
      </main>
    );
  }

  if (isError || !data || data.projects.length === 0) {
    return emptyDashboard;
  }

  return (
    <main className="min-h-screen bg-background px-6 py-8 lg:px-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
        <DashboardMetricsSection metrics={data.metrics} />
        <DashboardProjectsSection projects={data.projects} />
      </div>
    </main>
  );
};
