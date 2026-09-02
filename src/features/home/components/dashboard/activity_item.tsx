import type { LucideIcon } from "lucide-react";

type ActivityItemProps = {
  title: string;
  time: string;
  icon: LucideIcon;
  accent: string;
};

export const ActivityItem = ({ title, time, icon: Icon, accent }: ActivityItemProps) => {
  return (
    <div className="relative flex gap-4 pb-5 last:pb-0">
      <div className="flex flex-col items-center">
        <div className="flex h-10 w-10 items-center justify-center rounded-full text-white shadow-sm" style={{ background: accent }}>
          <Icon className="h-4 w-4" />
        </div>
        <div className="mt-2 h-full w-px bg-slate-200" />
      </div>

      <div className="flex-1 rounded-2xl border border-slate-200 bg-slate-50 p-3">
        <p className="text-sm font-medium text-slate-900">{title}</p>
        <p className="mt-1 text-xs text-slate-500">{time}</p>
      </div>
    </div>
  );
};
