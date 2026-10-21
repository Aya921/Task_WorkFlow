import { CheckCircle2 } from "lucide-react";

type KanbanDoneCardProps = {
  title: string;
  barWidthClassName: string;
};

export const KanbanDoneCard = ({
  title,
  barWidthClassName,
}: KanbanDoneCardProps) => {
  return (
    <div className="space-y-1.5 rounded-lg border border-secondary-200/60 bg-white p-2.5 opacity-95 shadow-sm">
      <div className="flex items-center gap-1 text-[10px] font-medium text-emerald-700">
        <CheckCircle2 className="h-3 w-3 shrink-0 text-emerald-600" />
        <span className="truncate">{title}</span>
      </div>
      <div className={`h-1.5 rounded bg-secondary-200 ${barWidthClassName}`} />
    </div>
  );
};
