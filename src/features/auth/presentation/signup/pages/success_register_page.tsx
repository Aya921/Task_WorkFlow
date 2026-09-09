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
      <div className="relative flex flex-1 min-h-[22rem] w-full items-center justify-center overflow-hidden  sm:min-h-[26rem] ">
        <div className="pointer-events-none absolute inset-0">
          <BackGroundSuccessAnimation />
        </div>

       
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative z-10 flex w-full max-w-4xl flex-col items-center gap-6 text-center sm:gap-8"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
            className="relative flex h-20 w-20 items-center justify-center rounded-full border border-white/50 bg-gradient-to-br from-primary-500 via-primary-400 to-accent-400 text-white "
          >
            <div className="absolute inset-0 rounded-full bg-white/20 blur-xl" />
            <motion.div
              initial={{ scale: 0.4 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.25, type: "spring", stiffness: 260, damping: 16 }}
            >
              <CheckCheck className="relative h-8 w-8" />
            </motion.div>
          </motion.div>

          <div className="space-y-3">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.35 }}
              className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-white/70 px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-primary-700 backdrop-blur-sm"
            >
              <Sparkles className="h-3.5 w-3.5" />
              {t("success.badge")}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.35 }}
              className={`${FONT_STYLES.display} bg-gradient-to-r from-secondary-900 via-primary-700 to-violet-600 bg-clip-text text-transparent`}
            >
              {t("success.title")}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.32, duration: 0.35 }}
              className={`${FONT_STYLES.bodyLg} mx-auto max-w-2xl text-secondary-600`}
            >
              {t("success.description")}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.38, duration: 0.4 }}
            className="w-full max-w-2xl rounded-[2rem] border border-white/60 bg-white/80 p-4 shadow-[0_35px_90px_-40px_rgba(15,23,42,0.45)] backdrop-blur-xl sm:p-6"
          >
            <p className={`${FONT_STYLES.bodySm} text-left font-semibold uppercase tracking-[0.18em] text-secondary-500`}>
              {t("success.summaryTitle")}
            </p>

            <ul className="mt-4 grid gap-3 text-left sm:grid-cols-2">
              {checklistItems.map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.45 + index * 0.08, duration: 0.3 }}
                  className="flex items-center gap-3 rounded-2xl border border-primary-100 bg-primary-50/80 px-3 py-2.5"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-400 text-white shadow-sm">
                    <CheckCheck className="h-3.5 w-3.5" />
                  </span>
                  <span className={`${FONT_STYLES.body} font-medium text-secondary-700`}>{item}</span>
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
              activeClassName="group bg-gradient-to-r from-primary-600 via-primary-500 to-violet-500 text-white shadow-lg shadow-primary-500/20 hover:shadow-xl hover:shadow-primary-500/30"
              disabledClassName="bg-slate-200 text-slate-500 cursor-not-allowed"
              className="w-full rounded-full border-0"
            >
              <span className={`${FONT_STYLES.button} flex items-center gap-2`}>
                {t("success.buttons.continue")}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
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
