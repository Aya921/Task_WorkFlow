import { Outlet, useLocation } from "react-router-dom";
import { Suspense } from "react";
import { SignupProvider } from "../context/signup_provider";
import { BackGroundLayout } from "../../../../../layout/bg_layout";
import { SignupContentLayout } from "./signup_content_layout";
import { SignupGuard } from "../../utils/signup_guard";
import { LazyLoader } from "../../../../../shared/components/lazy_loader";
import { AnimatePresence, motion } from "framer-motion";

export const RegisterLayout = () => {
  const location = useLocation();
  return (
    <SignupProvider>
      <BackGroundLayout>
        <SignupContentLayout>
          <SignupGuard>
            <Suspense fallback={<LazyLoader show={true} delay={500} />}>
              <AnimatePresence mode="wait">
                <motion.div key={location.pathname}  className="flex w-full flex-1 flex-col">
                  <Outlet />
                </motion.div>
              </AnimatePresence>
            </Suspense>
          </SignupGuard>
        </SignupContentLayout>
      </BackGroundLayout>
    </SignupProvider> 
  );
};
