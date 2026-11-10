import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FONT_STYLES } from "../../../../../assets/fonts/font_style";

const STATUS_STYLES: Record<string, string> = {
  todo: "bg-secondary-100 text-secondary-600",
  in_progress: "bg-amber-50 text-amber-700",
  in_review: "bg-sky-50 text-sky-700",
  done: "bg-emerald-50 text-emerald-700",
};

export type TaskStatusBadgeProps = {
  status: string;
};

export const TaskStatusBadge = ({ status }: TaskStatusBadgeProps) => {
  const { t } = useTranslation("dashboard");
  const reduceMotion = Boolean(useReducedMotion());
  const style = STATUS_STYLES[status] ?? STATUS_STYLES.todo;

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.span
        key={status}
        initial={reduceMotion ? false : { opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduceMotion ? undefined : { opacity: 0, y: -4 }}
        transition={{ duration: reduceMotion ? 0 : 0.2 }}
        className={`${FONT_STYLES.caption} inline-flex items-center rounded-full px-2.5 py-1 font-semibold ${style}`}
      >
        {t(`recentTasks.status.${status}`, { defaultValue: status })}
      </motion.span>
    </AnimatePresence>
  );
};
