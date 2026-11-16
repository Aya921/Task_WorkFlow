// dashboard_query.ts
import { queryOptions } from "@tanstack/react-query";
import { getWorkspaceDashboardUseCase } from "../../../../di/dashboard/dashboard_di";
import i18n from "../../../../i18n";

export const dashboardQueryOptions = (workspaceId: string) =>
  queryOptions({
    queryKey: ["dashboard", workspaceId],
    queryFn: async () => {
      const response = await getWorkspaceDashboardUseCase(workspaceId);

      if (!response.success) {
        throw new Error(
          response.message ?? i18n.t("common:dashboard.loadFailed"),
        );
      }

      if (!response.data) {
        throw new Error(i18n.t("common:dashboard.notFound"));
      }

      return response.data;
    },
    enabled: !!workspaceId,
  });
