import Skeleton from "react-loading-skeleton";

export const RecentTaskRowSkeleton = () => {
  return (
    <div className="flex items-center gap-4 border-b border-secondary-100 px-4 py-4 last:border-b-0">
      <Skeleton width={16} height={16} borderRadius={4} />
      <div className="min-w-0 flex-1">
        <Skeleton height={16} borderRadius={8} />
      </div>
      <div className="hidden sm:block">
        <Skeleton width={96} height={16} borderRadius={8} />
      </div>
      <div className="hidden md:block">
        <Skeleton width={64} height={24} borderRadius={999} />
      </div>
      <Skeleton circle width={32} height={32} />
    </div>
  );
};
