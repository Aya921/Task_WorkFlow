import { Routes, Route } from "react-router-dom";

import { RegisterLayout } from "../features/auth/presentation/signup/layout/register_layout";
import { SignupRouter } from "../features/auth/presentation/utils/signup_router";
import { LoginPage } from "../features/auth/presentation/login/pages/login_page";
import { DashboardPage } from "../features/dashboard/presentation/pages/dashboard_page";
import { ROUTES } from "./route_path";
import { NotFoundPage } from "../shared/pages/not_found_page";
import { InitialAuthRedirect } from "../features/auth/presentation/utils/initial_redirect";
import { ProtectedRoute } from "./protected_route";
import { GuestRoute } from "./guest_route";
import { NotificationsPage } from "../features/notification/presentation/pages/notifications_page";
import { NotificationProvider } from "../features/notification/presentation/context/notificaton_provider";
import { MainLayout } from "../shared/layout/main_layout";

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Landing page and initial auth check */}
      <Route path="/" element={<InitialAuthRedirect />} />

      {/* Guest-only routes */}
      <Route element={<GuestRoute />}>
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      </Route>
    
      {/* Signup routes */}
      <Route element={<RegisterLayout />}>
        <Route
          path="/signup/:step"
          element={<SignupRouter />}
        />
      </Route>

      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
          <Route path={ROUTES.NOTIFICATIONS} element={<NotificationProvider>
            <NotificationsPage />
          </NotificationProvider>} />
        </Route>
      </Route>

      {/* Not found */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};