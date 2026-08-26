import { Outlet } from "react-router-dom";
import { SignupProvider } from "../context/signup_provider";
import { BackGroundLayout } from "../../../../../layout/bg_layout";
import { SignupContentLayout } from "./signup_content_layout";
import { SignupGuard } from "../../utils/signup_guard";

export const RegisterLayout = () => {
  return (
   <SignupGuard>
     <SignupProvider>
      <BackGroundLayout>
        <SignupContentLayout>
          <Outlet />
        </SignupContentLayout>
      </BackGroundLayout>
    </SignupProvider>
   </SignupGuard>
  );
};
