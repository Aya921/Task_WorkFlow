import type { Transition, Variants } from "framer-motion";

export const LOGIN_EASE_OUT: [number, number, number, number] = [
  0.16, 1, 0.3, 1,
];

export const LOGIN_ENTRANCE_TRANSITION: Transition = {
  duration: 0.38,
  ease: LOGIN_EASE_OUT,
};

export const LOGIN_STAGGER_S = 0.07;

export const getLoginItemVariants = (reduceMotion: boolean): Variants => ({
  hidden: reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: reduceMotion
      ? { duration: 0 }
      : LOGIN_ENTRANCE_TRANSITION,
  },
});

export const getLoginContainerVariants = (reduceMotion: boolean): Variants => ({
  hidden: reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      ...(reduceMotion ? { duration: 0 } : LOGIN_ENTRANCE_TRANSITION),
      staggerChildren: reduceMotion ? 0 : LOGIN_STAGGER_S,
      delayChildren: reduceMotion ? 0 : 0.04,
    },
  },
});

/** Nested groups (e.g. form fields) inherit show/hidden without a second fade. */
export const getLoginGroupVariants = (reduceMotion: boolean): Variants => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: reduceMotion ? 0 : LOGIN_STAGGER_S,
    },
  },
});
