import Skeleton from "react-loading-skeleton";
import { MetricCardSkeleton } from "./metric_card_skeleton";

export const MetricsSkeletonSection = () => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Skeleton width={80} height={12} borderRadius={8} />
        <Skeleton width={192} height={24} borderRadius={8} />
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <MetricCardSkeleton key={`metric-skeleton-${index}`} />
        ))}
      </div>
    </div>
  );
};
