import { Routes, Route } from "react-router-dom";

import { RegisterLayout } from "../features/auth/presentation/signup/layout/register_layout";
import { SignupRouter } from "../features/auth/presentation/utils/signup_router";
import { LoginPage } from "../features/auth/presentation/login/pages/login_page";
import { HomePage } from "../features/home/pages/home_page";
import { DashboardPage } from "../features/home/pages/dashboard_page";
import { ROUTES } from "./route_path";
import { NotFoundPage } from "../shared/pages/not_found_page";

// AppRoutes.tsx
export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route element={<RegisterLayout />}>
        <Route path="/signup/:step" element={<SignupRouter />} />
      </Route>
      <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};