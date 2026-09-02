import type React from "react";
import { Navigate, useParams } from "react-router-dom";
import { useAuth } from "../../../../hooks/use_auth";
import {
  signupSteps,
  type SignupStepKey,
} from "../signup/types/signup_progress_bar_types";
import { ROUTES } from "../../../../routes/route_path";
import { LazyLoadingAnimation } from "../../../../animations/lazy_loading_animation";

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
    profileFetching,
  } = useAuth();


  if (sessionLoading || profileLoading|| profileFetching) {
    console.log("loading profile or session data in guard");
    return <div className="flex justify-center items-center h-screen">
      
      <LazyLoadingAnimation />

    </div>;
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

  // // User already finished onboarding
  // if (profile?.onboardingCompleted) {
  //   return <h1>dashboard page...</h1>;
  //   // or:
  //   // return <Navigate to={ROUTES.DASHBOARD} replace />;
  // }


  

  const allowedIndex = signupSteps.findIndex(
    (s) => s.stepKey === completedStep,  // github
  );

  const currentIndex = signupSteps.findIndex(
    (s) => s.stepKey === step,  // workspace
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