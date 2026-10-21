type KanbanSkeletonCardProps = {
  barWidthClassName: string;
  priorityLabel: string;
  priorityClassName: string;
  avatarClassName: string;
};

export const KanbanSkeletonCard = ({
  barWidthClassName,
  priorityLabel,
  priorityClassName,
  avatarClassName,
}: KanbanSkeletonCardProps) => {
  return (
    <div className="space-y-1.5 rounded-lg border border-secondary-200/60 bg-white p-2.5 shadow-sm">
      <div className={`h-2 rounded bg-secondary-200 ${barWidthClassName}`} />
      <div className="flex items-center justify-between pt-1">
        <span
          className={`rounded px-1.5 py-0.5 text-[9px] font-medium ${priorityClassName}`}
        >
          {priorityLabel}
        </span>
        <div className={`h-4 w-4 rounded-full ${avatarClassName}`} />
      </div>
    </div>
  );
};
