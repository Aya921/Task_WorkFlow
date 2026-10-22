import { motion } from "framer-motion";
import { ArrowRight, CheckCheck, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { BackGroundSuccessAnimation } from "../../../../../animations/background_success_animation";
import { FONT_STYLES } from "../../../../../assets/fonts/font_style";
import { Button } from "../../../../../shared/components/button";
import { PageTransition } from "../layout/page_transition";

export const SuccessRegisterPage = () => {
  const { t } = useTranslation("signup");
  const navigate = useNavigate();

  const checklistItems = [
    t("success.checklist.account"),
    t("success.checklist.workspace"),
    t("success.checklist.github"),
    t("success.checklist.setup"),
  ];

  return (
    <PageTransition>
      <div className="relative flex min-h-[22rem] w-full flex-1 items-center justify-center overflow-hidden sm:min-h-[26rem]">
        <div className="pointer-events-none absolute inset-0">
          <BackGroundSuccessAnimation />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative z-10 flex w-full max-w-3xl flex-col items-center gap-6 text-center sm:gap-7"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
            className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-secondary-200 bg-primary-600 text-white shadow-sm"
          >
            <motion.div
              initial={{ scale: 0.4 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.25, type: "spring", stiffness: 260, damping: 16 }}
            >
              <CheckCheck className="relative h-7 w-7" />
            </motion.div>
          </motion.div>

          <div className="space-y-3">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.35 }}
              className="inline-flex items-center gap-2 rounded-full border border-secondary-200 bg-white px-3 py-1.5 text-[0.65rem] font-semibold tracking-wide text-primary-600 uppercase"
            >
              <Sparkles className="h-3.5 w-3.5" />
              {t("success.badge")}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.35 }}
              className="text-2xl font-bold tracking-tight text-secondary-900 sm:text-3xl lg:text-4xl"
            >
              {t("success.title")}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.32, duration: 0.35 }}
              className={`${FONT_STYLES.bodySm} mx-auto max-w-xl text-secondary-500 sm:text-base`}
            >
              {t("success.description")}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.38, duration: 0.4 }}
            className="w-full max-w-2xl rounded-xl border border-secondary-200 bg-white p-4 shadow-sm sm:p-5"
          >
            <p
              className={`${FONT_STYLES.caption} text-start font-semibold tracking-wide text-secondary-500 uppercase`}
            >
              {t("success.summaryTitle")}
            </p>

            <ul className="mt-4 grid gap-2.5 text-start sm:grid-cols-2">
              {checklistItems.map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.45 + index * 0.08, duration: 0.3 }}
                  className="flex items-center gap-3 rounded-lg border border-secondary-200 bg-secondary-50/80 px-3 py-2.5"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-600 text-white">
                    <CheckCheck className="h-3.5 w-3.5" />
                  </span>
                  <span
                    className={`${FONT_STYLES.body} font-medium text-secondary-700`}
                  >
                    {item}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.52, duration: 0.4 }}
            className="flex w-full max-w-md flex-col items-center gap-4"
          >
            <Button
              onClick={() => navigate("/")}
              activeClassName="bg-primary-600 text-white shadow-sm hover:bg-primary-700 hover:shadow-md"
              disabledClassName="cursor-not-allowed bg-secondary-200 text-secondary-500"
              className="w-full"
            >
              <span className={`${FONT_STYLES.button} flex items-center gap-2`}>
                {t("success.buttons.continue")}
                <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </span>
            </Button>

            <p className={`${FONT_STYLES.bodySm} max-w-sm text-secondary-500`}>
              {t("success.support")}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </PageTransition>
  );
};
