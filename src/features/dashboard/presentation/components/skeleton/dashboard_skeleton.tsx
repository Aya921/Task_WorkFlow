import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { MetricsSkeletonSection } from "./metrics_skeleton_section";
import { ProjectsSkeletonSection } from "./projects_skeleton_section";
import { RecentTasksSkeletonSection } from "./recent_tasks_skeleton_section";

export const DashboardSkeleton = () => {
  return (
    <SkeletonTheme baseColor="#f1f5f9" highlightColor="#e2e8f0">
      <div className="flex flex-col gap-8" aria-hidden>
        <MetricsSkeletonSection />
        <ProjectsSkeletonSection />
        <RecentTasksSkeletonSection />
      </div>
    </SkeletonTheme>
  );
};
