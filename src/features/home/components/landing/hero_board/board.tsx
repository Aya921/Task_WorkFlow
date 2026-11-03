import { motion } from "framer-motion";
import {
  LANDING_CARD_HOVER,
  LANDING_CARD_HOVER_TRANSITION,
} from "../landing_card_hover";
import { LandingHeroBoardChrome } from "./chrome";
import { LandingHeroBoardColumns } from "./columns";
import { LandingHeroBoardToolbar } from "./toolbar";

export const LandingHeroBoard = () => {
  return (
    <div className="relative isolate  mx-auto max-w-5xl">
      <div className="pointer-events-none absolute -inset-4 -z-10 -rotate-1 rounded-3xl bg-gradient-to-r from-primary-600/20 via-sky-400/20 to-pink-500/20 opacity-75 blur-2xl" />

      <motion.div
        whileHover={LANDING_CARD_HOVER}
        transition={LANDING_CARD_HOVER_TRANSITION}
        className="overflow-hidden rounded-2xl border border-secondary-200 bg-white text-start shadow-[0_25px_60px_-15px_rgba(15,23,42,0.12),0_0_0_1px_rgba(226,232,240,0.8)]"
      >
        <LandingHeroBoardChrome />
        <LandingHeroBoardToolbar />
        <LandingHeroBoardColumns />
      </motion.div>
    </div>
  );
};
