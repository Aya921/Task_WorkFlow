import {  Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../hooks/use_auth";

import { ROUTES } from "./route_path";
import { LazyLoadingAnimation } from "../animations/lazy_loading_animation";

export const ProtectedRoute = () => {
  
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
    return <Navigate to={ROUTES.LOGIN} replace />;
  }
   // Stay on the page; queryClient already toasts profile failures.
   if (profileError || !profile) {
    return <Outlet />;
  }

  // in the error of profile i already handle it and show a toast so he do not need to go to any place
  
  if (!profile?.onboardingCompleted) {
    return (
      <Navigate
        to={`/signup/${profile?.onboardingStep ?? "account"}`}
        replace
      />
    );
  }
 

  return <Outlet />;
};
