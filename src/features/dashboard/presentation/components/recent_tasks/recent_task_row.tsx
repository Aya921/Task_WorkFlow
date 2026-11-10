import { motion, useReducedMotion } from "framer-motion";
import type { DashboardRecentTask } from "../../../domain/entity/dashboard_recent_task";
import { FONT_STYLES } from "../../../../../assets/fonts/font_style";
import { getDashboardItemVariants } from "../../motion/dashboard_motion";
import { TaskAssigneeCell } from "./task_assignee_cell";
import { TaskDueDateCell } from "./task_due_date_cell";
import { TaskPriorityBadge } from "./task_priority_badge";
import { TaskStatusBadge } from "./task_status_badge";

export type RecentTaskRowProps = {
  task: DashboardRecentTask;
  projectColor?: string | null;
  checked: boolean;
  onToggle: (taskId: string) => void;
};

export const RecentTaskRow = ({
  task,
  projectColor,
  checked,
  onToggle,
}: RecentTaskRowProps) => {
  const reduceMotion = Boolean(useReducedMotion());
  const isDone = checked || task.status === "done";

  return (
    <motion.tr
      variants={getDashboardItemVariants(reduceMotion)}
      whileHover={
        reduceMotion
          ? undefined
          : { backgroundColor: "rgba(248, 250, 252, 0.95)" }
      }
      animate={
        isDone && !reduceMotion
          ? { backgroundColor: "rgba(236, 253, 245, 0.45)" }
          : { backgroundColor: "rgba(255, 255, 255, 0)" }
      }
      transition={{ duration: 0.2 }}
      className="border-b border-secondary-100 last:border-b-0 [&>td]:px-4 [&>td]:py-3"
    >
      <td>
        <motion.div
          whileTap={reduceMotion ? undefined : { scale: 0.88 }}
          transition={{ type: "spring", stiffness: 420, damping: 18 }}
          className="inline-flex"
        >
          <input
            type="checkbox"
            checked={isDone}
            onChange={() => onToggle(task.id)}
            className="h-4 w-4 rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
            aria-label={task.title}
          />
        </motion.div>
      </td>
      <td>
        <p
          className={`${FONT_STYLES.bodySm} font-medium text-secondary-900 transition-colors duration-200 ${
            isDone ? "text-secondary-400 line-through" : ""
          }`}
        >
          {task.title}
        </p>
      </td>
      <td>
        <div className="flex items-center gap-2">
          <span
            className="h-2 w-2 shrink-0 rounded-full"
            style={{
              backgroundColor: projectColor || "#6366f1",
            }}
          />
          <span className={`${FONT_STYLES.caption} text-secondary-600`}>
            {task.projectName}
          </span>
        </div>
      </td>
      <td>
        <TaskStatusBadge status={isDone ? "done" : task.status} />
      </td>
      <td>
        <TaskPriorityBadge priority={task.priority} />
      </td>
      <td>
        <TaskDueDateCell dueDate={task.dueDate} />
      </td>
      <td>
        <TaskAssigneeCell assignee={task.assignee} />
      </td>
    </motion.tr>
  );
};
