import { LoginBrandPanel } from "../components/left_section/login_brand_panel";
import { LoginFormPanel } from "../components/login_form_panel";

export const LoginPage = () => {
  return (
    <main className="flex h-dvh w-full flex-col overflow-hidden bg-background text-secondary-900 antialiased lg:flex-row">
      <LoginBrandPanel />
      <LoginFormPanel />
    </main>
  );
};
