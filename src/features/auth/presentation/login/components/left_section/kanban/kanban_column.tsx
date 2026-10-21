import type { ReactNode } from "react";

type KanbanColumnProps = {
  title: string;
  count: number;
  dotClassName: string;
  children: ReactNode;
};

export const KanbanColumn = ({
  title,
  count,
  dotClassName,
  children,
}: KanbanColumnProps) => {
  return (
    <div className="space-y-2 rounded-xl border border-white/10 bg-secondary-900/40 p-2.5">
      <div className="flex items-center justify-between px-1 text-[11px] font-semibold text-white/80">
        <span className="flex items-center gap-1.5">
          <span className={`h-1.5 w-1.5 rounded-full ${dotClassName}`} />
          {title}
        </span>
        <span className="text-[10px] text-white/50">{count}</span>
      </div>
      {children}
    </div>
  );
};
