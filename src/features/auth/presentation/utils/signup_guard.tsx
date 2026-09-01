import type React from "react";
import { Navigate, useParams } from "react-router-dom";
import { useAuth } from "../../../../hooks/use_auth";
import {
  signupSteps,
  type SignupStepKey,
} from "../signup/types/signup_progress_bar_types";
import { ROUTES } from "../../../../routes/route_path";

export const SignupGuard = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  
  const { step } = useParams<{ step: SignupStepKey }>();

  const {
    user,
    profile,
    profileLoading,
    sessionLoading,
  } = useAuth();


  if (sessionLoading || profileLoading) {
    return <h1 className="text-[80] font-bold">Loading in Guard.....</h1>;
  }

 

  

  const isValidStep =
    !!step &&
    signupSteps.some((s) => s.stepKey === step);

     

    const completedStep =
    (profile?.onboardingStep ?? "account") as SignupStepKey;

    console.log(completedStep, "completed step in guard");
    
  if (!isValidStep) {
    console.log("here is invalid step in guard", step);
    return (
      <Navigate
        to={`/signup/${completedStep}`}
        replace
      />
    );
  }

  // Allow unauthenticated users only on the first step
  if (!user) {
    console.log("there is no user exist to continue")
    if (step === "account") {
      return <>{children}</>;
    }

    return (
      <Navigate
        to={`signup/${ROUTES.CREATE_USER}`}
        replace
      />
    );
  }

  // User already finished onboarding
  if (profile?.onboardingCompleted) {
    return <h1>dashboard page...</h1>;
    // or:
    // return <Navigate to={ROUTES.DASHBOARD} replace />;
  }


  

  const allowedIndex = signupSteps.findIndex(
    (s) => s.stepKey === completedStep,
  );

  const currentIndex = signupSteps.findIndex(
    (s) => s.stepKey === step,
  );

  
  if (currentIndex !== allowedIndex) {
   
    return (
      <Navigate
        to={`/signup/${completedStep}`}
        replace
      />
    );
  }

  return <>{children}</>;
};