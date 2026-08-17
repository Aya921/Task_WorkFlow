import { Routes, Route } from "react-router-dom";

import { RegisterLayout } from "../features/auth/presentation/signup/layout/register_layout";
import { ROUTES } from "./route_path";
import { CreateUserPage } from "../features/auth/presentation/signup/pages/create_user_page";
import { VerificationPage } from "../features/auth/presentation/signup/pages/verification_page";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<RegisterLayout />}>
       
        <Route path={"/"} element={<CreateUserPage />} />
        <Route path={ROUTES.VERIFICATION} element={<VerificationPage />} />

      </Route>
    </Routes>
  );
};
