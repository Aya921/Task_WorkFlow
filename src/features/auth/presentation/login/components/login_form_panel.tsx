import { LoginForm } from "./login_form";
import { LoginDesktopHeader } from "./right_section/login_desktop_header";
import { LoginEntrance } from "./right_section/login_entrance";
import { LoginMobileHeader } from "./right_section/login_mobile_header";
import { LoginMobileSignupPrompt } from "./right_section/login_mobile_signup_prompt";
import { LoginSsoLink } from "./right_section/login_sso_link";
import { LoginWelcomeHeader } from "./right_section/login_welcome_header";

export const LoginFormPanel = () => {
  return (
    <section className="flex w-full flex-col justify-between overflow-y-auto bg-background p-6 sm:p-12 lg:w-1/2 lg:py-16">
      <LoginMobileHeader />
      <LoginDesktopHeader />

      <LoginEntrance className="mx-auto my-auto w-full max-w-md py-6 sm:py-8">
        <LoginWelcomeHeader />
        <LoginForm />
        <LoginMobileSignupPrompt />
        <LoginSsoLink />
      </LoginEntrance>
    </section>
  );
};
