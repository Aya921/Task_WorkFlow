import { useQuery } from "@tanstack/react-query";
import { getProfileUseCase } from "../../../../../di/auth/auth_di";
import i18n from "../../../../../i18n";

export function useProfile(userId: string | undefined) {
  return useQuery({
    queryKey: ["profile", userId],
    queryFn: async () => {
      const response = await getProfileUseCase(userId!);

      if (!response.success) {
        throw new Error(
          response.message ?? i18n.t("common:profile.loadFailedRetry"),
        );
      }

      if (!response.data) {
        throw new Error(i18n.t("common:profile.notFound"));
      }

      return response.data;
    },
    enabled: !!userId,
  });
}
