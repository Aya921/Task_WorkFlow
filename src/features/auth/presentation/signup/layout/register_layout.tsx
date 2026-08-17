import { Outlet } from "react-router-dom";
import { SignupProvider } from "../context/signup_provider";
import { BackGroundLayout } from "../../../../../layout/bg_layout";
import { SignupContentLayout } from "./signup_content_layout";

export const RegisterLayout = () => {
  return (
    <SignupProvider>
      <BackGroundLayout>
        <SignupContentLayout>
          <Outlet />
        </SignupContentLayout>
      </BackGroundLayout>
    </SignupProvider>
  );
};
