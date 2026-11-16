import type { Transition, Variants } from "framer-motion";

export const DASHBOARD_EASE: [number, number, number, number] = [
  0.16, 1, 0.3, 1,
];

export const DASHBOARD_ENTRANCE_TRANSITION: Transition = {
  duration: 0.42,
  ease: DASHBOARD_EASE,
};

export const DASHBOARD_STAGGER_S = 0.2;

export const getDashboardContainerVariants = (
  reduceMotion: boolean,
): Variants => ({
  hidden: reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      ...(reduceMotion ? { duration: 0 } : DASHBOARD_ENTRANCE_TRANSITION),
      staggerChildren: reduceMotion ? 0 : DASHBOARD_STAGGER_S,
      delayChildren: reduceMotion ? 0 : 0.04,
    },
  },
});

export const getDashboardItemVariants = (reduceMotion: boolean): Variants => ({
  hidden: reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: reduceMotion ? { duration: 0 } : DASHBOARD_ENTRANCE_TRANSITION,
  },
});

export const getDashboardGroupVariants = (reduceMotion: boolean): Variants => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: reduceMotion ? 0 : 0.06,
    },
  },
});

export const DASHBOARD_CARD_HOVER = {
  y: -3,
  boxShadow: "0 12px 28px rgba(15, 23, 42, 0.08)",
} as const;

export const DASHBOARD_CARD_HOVER_TRANSITION: Transition = {
  type: "spring",
  stiffness: 360,
  damping: 24,
};
