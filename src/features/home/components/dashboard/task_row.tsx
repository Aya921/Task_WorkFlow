import type { LucideIcon } from "lucide-react";
import { MoreHorizontal } from "lucide-react";

export type TaskStatus = "Done" | "In Progress" | "Review" | "Blocked";
export type TaskPriority = "High" | "Medium" | "Low";

export type TaskRowProps = {
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
  assignee: string;
  initials: string;
  accent: string;
  icon: LucideIcon;
};

const statusStyles: Record<TaskStatus, string> = {
  Done: "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200",
  "In Progress": "bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-200",
  Review: "bg-violet-50 text-violet-700 ring-1 ring-inset ring-violet-200",
  Blocked: "bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-200",
};

const priorityStyles: Record<TaskPriority, string> = {
  High: "bg-rose-50 text-rose-700",
  Medium: "bg-amber-50 text-amber-700",
  Low: "bg-emerald-50 text-emerald-700",
};

export const TaskRow = ({
  title,
  status,
  priority,
  dueDate,
  assignee,
  initials,
  accent,
  icon: Icon,
}: TaskRowProps) => {
  return (
    <tr className="border-b border-slate-100 transition-colors hover:bg-slate-50/70">
      <td className="px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl text-white shadow-sm" style={{ background: accent }}>
            <Icon className="h-4 w-4" />
          </div>
          <div>
            <p className="font-medium text-slate-900">{title}</p>
            <p className="text-xs text-slate-500">{assignee}</p>
          </div>
        </div>
      </td>

      <td className="px-4 py-4">
        <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[status]}`}>
          {status}
        </span>
      </td>

      <td className="px-4 py-4">
        <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${priorityStyles[priority]}`}>
          {priority}
        </span>
      </td>

      <td className="px-4 py-4 text-sm text-slate-600">{dueDate}</td>

      <td className="px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-700">
            {initials}
          </div>
          <span className="text-sm text-slate-700">{assignee}</span>
        </div>
      </td>

      <td className="px-4 py-4 text-right">
        <button className="rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700">
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </td>
    </tr>
  );
};
