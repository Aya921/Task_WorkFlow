import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import { RegisterLayout } from "../features/auth/presentation/signup/layout/register_layout";
import { ROUTES } from "./route_path";
import { LazyLoader } from "../shared/components/lazy_loader";


const CreateUserPage = lazy(() =>
  import("../features/auth/presentation/signup/pages/create_user_page").then((m) => ({
    default: m.CreateUserPage,
  }))
);
const VerificationPage = lazy(() =>
  import("../features/auth/presentation/signup/pages/verification_page").then((m) => ({
    default: m.VerificationPage,
  }))
);
const WorkSpacePage = lazy(() =>
  import("../features/auth/presentation/signup/pages/workspace_page").then((m) => ({
    default: m.CreateWorkSpacePage,
  }))
);
const ConnectGitHubPage = lazy(() =>
  import("../features/auth/presentation/signup/pages/connect_github_page").then((m) => ({
    default: m.ConnectGitHubPage,
  }))
);
const SuccessRegisterPage = lazy(() =>
  import("../features/auth/presentation/signup/pages/success_register_page").then((m) => ({
    default: m.SuccessRegisterPage,
  }))
);



export const AppRoutes = () => {
  return (
    <Suspense fallback={<LazyLoader show={true} delay={500}/>}>
      <Routes>
        <Route element={<RegisterLayout />}>
          <Route path={"/"} element={<CreateUserPage />} />
          <Route path={ROUTES.VERIFICATION} element={<VerificationPage />} />
          <Route path={ROUTES.CREATE_WORKSPACE} element={<WorkSpacePage />} />
          <Route path={ROUTES.CONNECT_GITHUB} element={<ConnectGitHubPage />} />
          <Route path={ROUTES.SUCCESS_REGISTER} element={<SuccessRegisterPage />} />

        </Route>
      </Routes>
    </Suspense>
  );
};
