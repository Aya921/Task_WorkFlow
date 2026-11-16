import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import type { DashboardRecentTask } from "../../../domain/entity/dashboard_recent_task";
import { FONT_STYLES } from "../../../../../assets/fonts/font_style";
import { getDashboardGroupVariants } from "../../motion/dashboard_motion";
import { RecentTaskRow } from "./recent_task_row";

export type RecentTasksTableProps = {
  tasks: DashboardRecentTask[];
  projectColors: Record<string, string | null>;
  checkedTaskIds: Set<string>;
  onToggleTask: (taskId: string) => void;
  onToggleAllTasks: () => void;
};

export const RecentTasksTable = ({
  tasks,
  projectColors,
  checkedTaskIds,
  onToggleTask,
  onToggleAllTasks,
}: RecentTasksTableProps) => {
  const { t } = useTranslation("dashboard");
  const reduceMotion = Boolean(useReducedMotion());

  if (tasks.length === 0) {
    return (
      <div className="px-5 py-10 text-center">
        <p className={`${FONT_STYLES.bodySm} text-secondary-500`}>
          {t("recentTasks.empty")}
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-start">
        <thead className="bg-secondary-50/80">
          <tr className={`${FONT_STYLES.caption} text-secondary-400 [&>th]:px-4 [&>th]:py-3 [&>th]:text-start [&>th]:font-semibold [&>th]:uppercase [&>th]:tracking-wide`}>
            <th>
              <input
                type="checkbox"
                checked={checkedTaskIds.size === tasks.length}
                onChange={onToggleAllTasks}
                className="h-4 w-4 rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
                aria-label="Toggle all tasks"
              />
            </th>
            <th>{t("recentTasks.columns.title")}</th>
            <th>{t("recentTasks.columns.project")}</th>
            <th>{t("recentTasks.columns.status")}</th>
            <th>{t("recentTasks.columns.priority")}</th>
            <th>{t("recentTasks.columns.dueDate")}</th>
            <th>{t("recentTasks.columns.assignee")}</th>
          </tr>
        </thead>
        <motion.tbody variants={getDashboardGroupVariants(reduceMotion)}>
          {tasks.map((task) => (
            <RecentTaskRow
              key={task.id}
              task={task}
              projectColor={projectColors[task.projectId]}
              checked={checkedTaskIds.has(task.id)}
              onToggle={onToggleTask}
            />
          ))}
        </motion.tbody>
      </table>
    </div>
  );
};
