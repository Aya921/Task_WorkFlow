import { motion } from "framer-motion";
import { ArrowLeft, Compass, Home, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BackGroundLayout } from "../../layout/bg_layout";
import { Button } from "../components/button";
import { FONT_STYLES } from "../../assets/fonts/font_style";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <BackGroundLayout>
      <main className="flex min-h-screen items-center justify-center px-5 py-12 sm:px-8">
        <div className="flex w-full max-w-2xl flex-col items-center text-center">
          <div className="relative mb-8 h-52 w-52 sm:mb-10 sm:h-64 sm:w-64">
            <motion.div
              className="absolute inset-5 rounded-full border border-primary-200 bg-white/60 shadow-xl shadow-primary-900/5 backdrop-blur-sm"
              animate={{ rotate: 360 }}
              transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
            >
              <span className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-accent-400 shadow-lg shadow-accent-400/40" />
              <span className="absolute -bottom-1 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-primary-500" />
            </motion.div>

            <motion.div
              className="absolute inset-12 flex items-center justify-center rounded-full bg-gradient-to-br from-primary-600 to-accent-500 text-white shadow-2xl shadow-primary-600/30"
              animate={{ y: [0, -10, 0], rotate: [0, -4, 4, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Compass className="h-14 w-14" strokeWidth={1.5} aria-hidden />
            </motion.div>

            <motion.div
              className="absolute right-5 top-8 flex h-9 w-9 items-center justify-center rounded-xl bg-white text-primary-600 shadow-lg"
              animate={{ y: [0, 8, 0], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
            >
              <MapPin className="h-4 w-4" aria-hidden />
            </motion.div>
          </div>

          <p className={`${FONT_STYLES.overline} text-primary-600`}>Route not found</p>
          <h1 className={`${FONT_STYLES.display} mt-3 text-secondary-900`}>404</h1>
          <p className={`${FONT_STYLES.h3} mt-3 max-w-lg text-secondary-700`}>
            This page took a wrong turn.
          </p>
          <p className={`${FONT_STYLES.body} mt-3 max-w-md text-secondary-500`}>
            The address may be incorrect, or the page may have moved. Let&apos;s
            get you back to a familiar place.
          </p>

          <div className="mt-8 flex w-full max-w-sm flex-col gap-3 sm:flex-row">
            <Button
              onClick={() => navigate(-1)}
              activeClassName="border-primary-200 bg-white text-primary-700 shadow-sm hover:bg-primary-50"
              className="sm:flex-1"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              <span className={FONT_STYLES.button}>Go back</span>
            </Button>
            <Button
              onClick={() => navigate("/")}
              activeClassName="bg-gradient-to-r from-primary-600 via-primary-500 to-accent-500 text-white shadow-lg shadow-primary-500/20 hover:shadow-xl hover:shadow-primary-500/30"
              className="sm:flex-1"
            >
              <Home className="h-4 w-4" aria-hidden />
              <span className={FONT_STYLES.button}>Home</span>
            </Button>
          </div>
        </div>
      </main>
    </BackGroundLayout>
  );
};