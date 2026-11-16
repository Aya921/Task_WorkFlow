import Skeleton from "react-loading-skeleton";
import { ProjectCardSkeleton } from "./project_card_skeleton";

export const ProjectsSkeletonSection = () => {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-2">
          <Skeleton width={80} height={12} borderRadius={8} />
          <Skeleton width={160} height={24} borderRadius={8} />
        </div>
        <Skeleton width={128} height={40} borderRadius={12} />
      </div>

      <div className="flex gap-2">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton
            key={`filter-skeleton-${index}`}
            width={80}
            height={32}
            borderRadius={999}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <ProjectCardSkeleton key={`project-skeleton-${index}`} />
        ))}
      </div>
    </div>
  );
};
