import { Navigate, useParams } from "react-router-dom";
import { lazy } from "react";
import { signupSteps } from "../signup/types/signup_progress_bar_types";
import { StorageKeys } from "../../../../constants/storage_keys";

const CreateUserPage = lazy(() =>
  import("../signup/pages/create_user_page").then((m) => ({
    default: m.CreateUserPage,
  })),
);
const VerificationPage = lazy(() =>
  import("../signup/pages/verification_page").then((m) => ({
    default: m.VerificationPage,
  })),
);
const WorkSpacePage = lazy(() =>
  import("../signup/pages/workspace_page").then((m) => ({
    default: m.CreateWorkSpacePage,
  })),
);
const ConnectGitHubPage = lazy(() =>
  import("../signup/pages/connect_github_page").then((m) => ({
    default: m.ConnectGitHubPage,
  })),
);
const SuccessRegisterPage = lazy(() =>
  import("../signup/pages/success_register_page").then((m) => ({
    default: m.SuccessRegisterPage,
  })),
);

const stepComponents = {
  account: CreateUserPage,
  verification: VerificationPage,
  workspace: WorkSpacePage,
  github: ConnectGitHubPage,
  success: SuccessRegisterPage,
};

export const SignupRouter = () => {
  const { step } = useParams();

  const Component = stepComponents[step as keyof typeof stepComponents];

  

  if (!Component) {
    return <Navigate to="/signup/account" replace />;
  }
  

  return <Component />;
};
