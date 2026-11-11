import Skeleton from "react-loading-skeleton";
import { RecentTaskRowSkeleton } from "./recent_task_row_skeleton";

export const RecentTasksSkeletonSection = () => {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-2">
          <Skeleton width={96} height={12} borderRadius={8} />
          <Skeleton width={176} height={24} borderRadius={8} />
        </div>
        <Skeleton width={224} height={40} borderRadius={12} />
      </div>

      <div className="overflow-hidden rounded-2xl border border-secondary-200 bg-white">
        {Array.from({ length: 5 }).map((_, index) => (
          <RecentTaskRowSkeleton key={`task-skeleton-${index}`} />
        ))}
      </div>
    </div>
  );
};
