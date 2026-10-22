import { VerificationHeader } from "../components/verification/verification_header";
import { IconContainer } from "../../../../../shared/components/icon_container";
import { ExternalLink, MailCheck } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PageTransition } from "../layout/page_transition";
import { FONT_STYLES } from "../../../../../assets/fonts/font_style";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const getEmailInboxUrl = (email: string) => {
  const domain = email.split("@")[1]?.toLowerCase();

  if (domain === "gmail.com" || domain === "googlemail.com") {
    return "https://mail.google.com/mail/u/0/#inbox";
  }

  if (["outlook.com", "hotmail.com", "live.com", "msn.com"].includes(domain)) {
    return "https://outlook.live.com/mail/0/inbox";
  }

  if (domain === "yahoo.com") {
    return "https://mail.yahoo.com/";
  }

  if (domain === "icloud.com" || domain === "me.com" || domain === "mac.com") {
    return "https://www.icloud.com/mail";
  }

  return "https://mail.google.com/mail/u/0/#inbox";
};

export const VerificationPage = () => {
  const { t } = useTranslation("signup");
  const navigate = useNavigate();
  const [email] = useState(() => {
    const raw = sessionStorage.getItem("pendingVerification");
    if (!raw) return "";
    try {
      return JSON.parse(raw).email ?? "";
    } catch {
      return "";
    }
  });

  useEffect(() => {
    if (!email) {
      navigate("/signup/account", { replace: true });
    }
  }, [email, navigate]);

  // useCheckEmailVerification(() => {

  //   const nextParm=nextStep();

  //   navigate(`/signup/${nextParm}`);
  // });

  return (
    <PageTransition>
      <div className="flex w-full flex-1 flex-col items-center justify-center overflow-x-hidden py-6 sm:py-8">
        <div className="flex w-full max-w-lg flex-col items-center gap-6 text-center sm:gap-7">
          <IconContainer
            icon={MailCheck}
            containerClassName="rounded-2xl border border-secondary-200 bg-primary-50 shadow-sm"
            iconColor="text-primary-600"
          />

          <VerificationHeader email={email} />

          <div className="flex w-full flex-col items-center justify-center rounded-xl border border-secondary-200 bg-white px-5 py-5 shadow-sm sm:px-6 sm:py-6">
            <div className="flex w-full items-center gap-3 text-start">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary-50 text-primary-600">
                <MailCheck className="h-5 w-5" aria-hidden />
              </div>
              <div className="min-w-0">
                <p className={`${FONT_STYLES.caption} text-secondary-500`}>
                  {t("verification.sentTo")}
                </p>
                <p
                  className={`${FONT_STYLES.body} truncate font-semibold text-secondary-900`}
                  title={email}
                >
                  {email}
                </p>
              </div>
            </div>
            <div
              className={`${FONT_STYLES.bodySm} mt-4 space-y-1 text-center text-secondary-500`}
            >
              <p>{t("verification.checkEmail")}</p>
              <p>{t("verification.checkSpam")}</p>
            </div>
            <a
              href={getEmailInboxUrl(email!)}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 font-medium text-primary-600 underline-offset-2 transition-colors duration-150 hover:text-primary-700 hover:underline"
            >
              <span className={FONT_STYLES.button}>
                {t("verification.openEmail")}
              </span>
              <ExternalLink className="h-4 w-4" aria-hidden />
            </a>
          </div>

          <p className={`${FONT_STYLES.caption} max-w-sm text-secondary-500`}>
            {t("verification.waiting")}
          </p>
        </div>
      </div>
    </PageTransition>
  );
};
