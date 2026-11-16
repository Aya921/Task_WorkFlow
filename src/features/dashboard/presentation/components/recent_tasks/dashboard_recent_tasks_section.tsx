import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { DashboardProject } from "../../../domain/entity/dashboard_project";
import type { DashboardRecentTask } from "../../../domain/entity/dashboard_recent_task";
import { getDashboardItemVariants } from "../../motion/dashboard_motion";
import { RecentTasksFooter } from "./recent_tasks_footer";
import { RecentTasksHeader } from "./recent_tasks_header";
import { RecentTasksTable } from "./recent_tasks_table";

export type DashboardRecentTasksSectionProps = {
  tasks: DashboardRecentTask[];
  projects: DashboardProject[];
  totalTasks: number;
};

export const DashboardRecentTasksSection = ({
  tasks,
  projects,
  totalTasks,
}: DashboardRecentTasksSectionProps) => {
  const reduceMotion = Boolean(useReducedMotion());
  const [searchValue, setSearchValue] = useState("");
  const [checkedTaskIds, setCheckedTaskIds] = useState<Set<string>>(
    () =>
      new Set(
        tasks.filter((task) => task.status === "done").map((task) => task.id),
      ),
  );

  const projectColors = useMemo(
    () =>
      Object.fromEntries(
        projects.map((project) => [project.id, project.color]),
      ) as Record<string, string | null>,
    [projects],
  );

  const filteredTasks = useMemo(() => {
    const query = searchValue.trim().toLowerCase();
    if (!query) {
      return tasks;
    }

    return tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(query) ||
        task.projectName.toLowerCase().includes(query) ||
        task.status.toLowerCase().includes(query) ||
        task.priority.toLowerCase().includes(query),
    );
  }, [searchValue, tasks]);

  const handleToggleTask = (taskId: string) => {
    setCheckedTaskIds((current) => {
      const next = new Set(current);
      if (next.has(taskId)) {
        next.delete(taskId);
      } else {
        next.add(taskId);
      }
      return next;
    });
  };

  const handleToggleAllTasks = () => {
    setCheckedTaskIds((current) => {
      const next = new Set(current);
      if (next.size === tasks.length) {
        next.clear();
      } else {
        tasks.forEach((task) => next.add(task.id));
      }
      return next;
    });
  };

  return (
    <motion.section
      variants={getDashboardItemVariants(reduceMotion)}
      className="overflow-hidden rounded-2xl border border-primary-100/70 bg-white shadow-sm"
    >
      <RecentTasksHeader
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        totalTasks={totalTasks}
      />
      <RecentTasksTable
        tasks={filteredTasks}
        projectColors={projectColors}
        checkedTaskIds={checkedTaskIds}
        onToggleTask={handleToggleTask}
        onToggleAllTasks={handleToggleAllTasks}
      />
      <RecentTasksFooter
        visibleCount={filteredTasks.length}
        totalTasks={totalTasks}
      />
    </motion.section>
  );
};
