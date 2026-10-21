import { useTranslation } from "react-i18next";
import { LoginBrandMark } from "./login_brand_mark";
import { LoginBackgroundHeader } from "./login_background_header";
import { LoginLeftFooter } from "./login_left_footer";

export const LoginBrandPanel = () => {
  const { t } = useTranslation("login");

  return (
    <aside
      className="relative hidden flex-col justify-between overflow-hidden p-12 text-white shadow-2xl lg:flex lg:w-1/2"
      style={{
        background:
          "linear-gradient(135deg, #1d4ed8 0%, #2563eb 38%, #3b82f6 68%, #ec4899 100%)",
      }}
    >
      <div className="pointer-events-none absolute -start-24 -top-24 h-96 w-96 rounded-full bg-sky-400/25 blur-3xl" />
      <div className="pointer-events-none absolute -end-32 -bottom-32 h-[32rem] w-[32rem] rounded-full bg-rose-500/20 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 start-1/3 h-72 w-72 rounded-full bg-primary-400/20 blur-2xl" />

      <div className="relative z-10">
        <LoginBrandMark name={t("brand.name")} variant="light" />
      </div>

      <LoginBackgroundHeader />

      <LoginLeftFooter />
    </aside>
  );
};
