import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/use_auth";
import { ROUTES } from "./route_path";
import { LazyLoadingAnimation } from "../animations/lazy_loading_animation";

/**
 * For guest-only pages (e.g. login).
 * Authenticated users are sent to Dashboard or back into onboarding.
 */
export const GuestRoute = () => {
  const { user, profile, sessionLoading, profileLoading, profileError } =
    useAuth();

  if (sessionLoading || (user && profileLoading)) {
    return <LazyLoadingAnimation />;
  }

  if (!user) {
    return <Outlet />;
  }

  // Stay on the page; queryClient already toasts profile failures.
  if (profileError || !profile) {
    return <Outlet />;
  }

  if (profile.onboardingCompleted) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  return (
    <Navigate to={`/signup/${profile.onboardingStep}`} replace />
  );
};
