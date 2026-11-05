import { Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { EmptyDashboardLottieAnimation } from "../../../animations/empty_dashboard_animation";
import { HighlightText } from "../../../shared/components/highlight_text";
import { EmptyDashboard } from "../components/dashboard/empty_dashboard";
export const DashboardPage = () => {
  const { t } = useTranslation("dashboard");
 
  // first create the page when the dashboard is empty

  return (
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

  // then create the page when the dashboard is not empty for person who create workspace

  // then create the page when the dashboard is not empty for person who join workspace
};
