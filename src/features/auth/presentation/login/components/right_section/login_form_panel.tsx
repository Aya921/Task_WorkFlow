import { motion, useReducedMotion } from "framer-motion";
import { LoginForm } from "./login_form";
import {
  LoginEntrance,
  LoginEntranceItem,
} from "./login_entrance";
import { LoginDesktopHeader } from "./login_desktop_header";
import { getLoginGroupVariants } from "./login_motion";
import { LoginMobileHeader } from "./login_mobile_header";
import { LoginMobileSignupPrompt } from "./login_mobile_signup_prompt";
import { LoginWelcomeHeader } from "./login_welcome_header";

export const LoginFormPanel = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section className="flex w-full flex-col justify-between overflow-y-auto bg-background p-6 sm:p-12 lg:w-1/2 lg:py-16">
      <LoginEntrance className="flex w-full flex-1 flex-col justify-between">
        <LoginEntranceItem>
          <LoginMobileHeader />
        </LoginEntranceItem>

        <LoginEntranceItem>
          <LoginDesktopHeader />
        </LoginEntranceItem>

        <motion.div
          className="mx-auto my-auto w-full max-w-md py-6 sm:py-8"
          variants={getLoginGroupVariants(Boolean(reduceMotion))}
        >
          <LoginEntranceItem>
            <LoginWelcomeHeader />
          </LoginEntranceItem>

          <LoginForm />

          <LoginEntranceItem>
            <LoginMobileSignupPrompt />
          </LoginEntranceItem>

        
        </motion.div>
      </LoginEntrance>
    </section>
  );
};
