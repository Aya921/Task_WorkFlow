import { Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../../../hooks/use_auth";
import { ROUTES } from "../../../../routes/route_path";
import { LazyLoadingAnimation } from "../../../../animations/lazy_loading_animation";
import { HomePage } from "../../../home/pages/home_page";

export const InitialAuthRedirect = () => {
  const { t } = useTranslation("common");
  const {
    user,
    profile,
    sessionLoading,
    profileLoading,
    profileError,
  } = useAuth();

  if (sessionLoading || (user && profileLoading)) {
    return <LazyLoadingAnimation />;
  }

  if (!user) {
    return <HomePage />;
  }

  if (profileError || !profile) {
    return <div>{t("profile.loadFailedRetry")}</div>;
  }

  if (profile.onboardingCompleted) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  return (
    <Navigate
      to={`/signup/${profile.onboardingStep}`}
      replace
    />
  );
};
