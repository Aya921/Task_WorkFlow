import type { ReactNode } from "react";

export type EmptyDashboardAnimationProps = {
  children: ReactNode;
};

export const EmptyDashboardAnimation = ({ children }: EmptyDashboardAnimationProps) => {
  return (
    <div className="mb-6 flex w-full max-w-[440px] items-center justify-center">
      <div className="mx-auto flex w-full max-w-[420px] items-center justify-center">
        {children}
      </div>
    </div>
  );
};
