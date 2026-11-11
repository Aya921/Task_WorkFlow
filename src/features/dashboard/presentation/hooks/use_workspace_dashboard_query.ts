import { useQuery } from "@tanstack/react-query";

import { dashboardQueryOptions } from "../query/dashboard_query";

export function useWorkspaceDashboardQuery(workspaceId: string | undefined) {
  return useQuery({
    ...dashboardQueryOptions(workspaceId!),
    enabled: !!workspaceId,
   
  });
}
