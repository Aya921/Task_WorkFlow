import { motion } from "framer-motion";
import { Check } from "lucide-react";
import type { ReactNode } from "react";
import { FONT_STYLES } from "../../../../../assets/fonts/font_style";
import {
  LANDING_CARD_HOVER,
  LANDING_CARD_HOVER_TRANSITION,
} from "../landing_card_hover";

type LandingHowStepProps = {
  step: number;
  title: string;
  description: string;
  mini: ReactNode;
};

export const LandingHowStep = ({
  step,
  title,
  description,
  mini,
}: LandingHowStepProps) => (
  <motion.div
    className="flex flex-col items-center text-center"
    whileHover={LANDING_CARD_HOVER}
    transition={LANDING_CARD_HOVER_TRANSITION}
  >
    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-sky-200 bg-sky-50 text-xl font-extrabold text-sky-700 shadow-sm">
      {step}
    </div>
    <div className="mb-6 w-full rounded-xl border border-secondary-200 bg-white p-4 text-start shadow-sm">
      {mini}
    </div>
    <h3 className={`${FONT_STYLES.h4} mb-2 text-secondary-900`}>{title}</h3>
    <p className={`${FONT_STYLES.bodySm} max-w-xs leading-relaxed text-secondary-500`}>
      {description}
    </p>
  </motion.div>
);

export const HowMiniCreate = ({ project }: { project: string }) => (
  <>
    <div className="mb-2 flex items-center gap-2">
      <span className="h-2.5 w-2.5 rounded-full bg-primary-600" />
      <span className={`${FONT_STYLES.caption} font-semibold text-secondary-800`}>
        {project}
      </span>
    </div>
    <div className="mb-1.5 h-2 w-3/4 rounded-full bg-secondary-200" />
    <div className="h-2 w-1/2 rounded-full bg-secondary-200" />
  </>
);

export const HowMiniOrganize = ({
  priority,
  date,
  task,
  assigned,
}: {
  priority: string;
  date: string;
  task: string;
  assigned: string;
}) => (
  <>
    <div className="mb-2 flex items-center justify-between">
      <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold text-amber-800">
        {priority}
      </span>
      <span className="text-[10px] text-secondary-400">{date}</span>
    </div>
    <div className={`mb-1 ${FONT_STYLES.caption} font-semibold text-secondary-800`}>
      {task}
    </div>
    <div className="flex items-center gap-1">
      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary-600 text-[8px] font-bold text-white">
        SJ
      </span>
      <span className="text-[10px] text-secondary-500">{assigned}</span>
    </div>
  </>
);

export const HowMiniTrack = ({
  done,
  complete,
}: {
  done: string;
  complete: string;
}) => (
  <>
    <div className="mb-2 flex items-center justify-between">
      <span className={`${FONT_STYLES.caption} flex items-center gap-1 font-bold text-emerald-600`}>
        <Check className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden />
        {done}
      </span>
      <span className={`${FONT_STYLES.caption} font-bold text-secondary-700`}>
        {complete}
      </span>
    </div>
    <div className="h-2 w-full rounded-full bg-secondary-200">
      <div className="h-2 w-full rounded-full bg-emerald-500" />
    </div>
  </>
);
