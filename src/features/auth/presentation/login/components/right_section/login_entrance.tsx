import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  getLoginContainerVariants,
  getLoginItemVariants,
} from "./login_motion";

type LoginEntranceProps = {
  children: ReactNode;
  className?: string;
};

type LoginEntranceItemProps = {
  children: ReactNode;
  className?: string;
};

export const LoginEntranceItem = ({
  children,
  className = "",
}: LoginEntranceItemProps) => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={getLoginItemVariants(Boolean(reduceMotion))}
    >
      {children}
    </motion.div>
  );
};

export const LoginEntrance = ({
  children,
  className = "",
}: LoginEntranceProps) => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={getLoginContainerVariants(Boolean(reduceMotion))}
      initial={reduceMotion ? false : "hidden"}
      animate="show"
    >
      {children}
    </motion.div>
  );
};
