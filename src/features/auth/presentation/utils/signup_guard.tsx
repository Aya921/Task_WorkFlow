import type React from "react";
import { Navigate, useParams } from "react-router-dom";
import { useAuth } from "../../../../hooks/use_auth";
import {
  signupSteps,
  type SignupStepKey,
} from "../signup/types/signup_progress_bar_types";
import { ROUTES } from "../../../../routes/route_path";


export const SignupGuard = ({ children }: { children: React.ReactNode }) => {
  const { step } = useParams<{ step: SignupStepKey }>();

  const { user, profile } = useAuth();
  console.log("guard is being used", { step, user, profile });

  const pendingData = sessionStorage.getItem("pendingVerification");
  if (step === "verification" && pendingData) {
    return <>{children}</>;
  }

  const isValidStep = !!step && signupSteps.some((s) => s.stepKey === step);

  const completedStep = (profile?.onboardingStep ?? "account") as SignupStepKey;

  if (!isValidStep) {
    return <Navigate to={`/signup/${completedStep}`} replace />;
  }

  // Allow unauthenticated users only on the first step
  if (!user) {
    if (step === "account") {
      return <>{children}</>;
      // return <>{<VerificationPage/>}</>;
    }

    return <Navigate to={`/signup/${ROUTES.CREATE_USER}`} replace />;
  }

  const allowedIndex = signupSteps.findIndex(
    (s) => s.stepKey === completedStep, // github
  );

  const currentIndex = signupSteps.findIndex(
    (s) => s.stepKey === step, // workspace
  );

  console.log({ step, completedStep, currentIndex, allowedIndex });

  if (currentIndex !== allowedIndex) {
    return <Navigate to={`/signup/${completedStep}`} replace />;
  }

  return <>{children}</>;
};
