import { motion, useReducedMotion } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";

type LandingInViewTag = "section" | "header" | "footer" | "div";

type LandingInViewProps = {
  as?: LandingInViewTag;
  children: ReactNode;
  className?: string;
  id?: string;
  style?: CSSProperties;
};

const MOTION_TAGS = {
  section: motion.section,
  header: motion.header,
  footer: motion.footer,
  div: motion.div,
} as const;

export const LandingInView = ({
  as = "section",
  children,
  className,
  id,
  style,
}: LandingInViewProps) => {
  const reduceMotion = Boolean(useReducedMotion());
  const Tag = MOTION_TAGS[as];

  return (
    <Tag
      id={id}
      style={style}
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -8% 0px" }}
      transition={{ duration: reduceMotion ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Tag>
  );
};
