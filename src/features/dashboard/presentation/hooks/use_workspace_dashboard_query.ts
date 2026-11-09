import { useQuery } from "@tanstack/react-query";
import { getWorkspaceDashboardUseCase } from "../../../../di/dashboard/dashboard_di";
import i18n from "../../../../i18n";

export function useWorkspaceDashboardQuery(workspaceId: string | undefined) {
  return useQuery({
    queryKey: ["workspace-dashboard", workspaceId],
    queryFn: async () => {
      const response = await getWorkspaceDashboardUseCase(workspaceId!);
      console.log("response", response);

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
}
