import { useCallback } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../hooks/use_auth";
import { useToast } from "../hooks/use_toast";
import { ROUTES } from "./route_path";
import { LazyLoadingAnimation } from "../animations/lazy_loading_animation";

export const ProtectedRoute = () => {
  const { t } = useTranslation("common");
  const {
    user,
    profile,
    sessionLoading,
    profileLoading,
    profileError,
    getProfile,
  } = useAuth();

  const { showToast } = useToast();

  const handleRetry = useCallback(() => {
    getProfile();
  }, [getProfile]);

  if (sessionLoading || (user && profileLoading)) {
    return <LazyLoadingAnimation />;
  }

  if (!user) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  if (profileError || !profile) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4">
        <p>{t("profile.loadFailed")}</p>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="cursor-pointer rounded-lg bg-primary-600 px-4 py-2 text-white"
            onClick={() => {
              showToast(t("profile.retrying"), "error");
              handleRetry();
            }}
          >
            {t("profile.tryAgain")}
          </button>

          <Link
            to={ROUTES.LOGIN}
            className="cursor-pointer rounded-lg border border-secondary-300 px-4 py-2 text-secondary-900"
          >
            {t("profile.goToLogin")}
          </Link>
        </div>
      </main>
    );
  }

  if (!profile.onboardingCompleted) {
    return (
      <Navigate
        to={`/signup/${profile.onboardingStep}`}
        replace
      />
    );
  }

  return <Outlet />;
};
