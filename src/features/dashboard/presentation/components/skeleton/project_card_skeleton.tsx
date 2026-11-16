import Skeleton from "react-loading-skeleton";

export const ProjectCardSkeleton = () => {
  return (
    <div className="space-y-4 rounded-2xl border border-secondary-200 bg-white p-5">
      <Skeleton width={160} height={20} borderRadius={8} />
      <Skeleton height={12} borderRadius={8} />
      <Skeleton height={8} borderRadius={999} />
      <div className="flex gap-2">
        {Array.from({ length: 3 }).map((_, avatarIndex) => (
          <Skeleton
            key={`avatar-skeleton-${avatarIndex}`}
            circle
            width={32}
            height={32}
          />
        ))}
      </div>
    </div>
  );
};
