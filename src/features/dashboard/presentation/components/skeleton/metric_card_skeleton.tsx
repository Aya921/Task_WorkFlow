import Skeleton from "react-loading-skeleton";

export const MetricCardSkeleton = () => {
  return (
    <div className="rounded-2xl border border-secondary-200 bg-white p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="w-full space-y-3">
          <Skeleton width={96} height={12} borderRadius={8} />
          <Skeleton width={64} height={32} borderRadius={8} />
        </div>
        <Skeleton width={36} height={36} borderRadius={8} />
      </div>
    </div>
  );
};
