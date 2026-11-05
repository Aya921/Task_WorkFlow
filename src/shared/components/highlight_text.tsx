import type { ReactNode } from "react";

type HighlightTextProps = {
  children: ReactNode;
};

export const HighlightText = ({ children }: HighlightTextProps) => {
  return (
    <span className="relative inline-block">
      {children}

      <svg
        className="absolute -bottom-2 left-0 w-full"
        viewBox="0 0 200 12"
        preserveAspectRatio="none"
        fill="none"
        aria-hidden
      >
        <path
          d="M4 8 C55 2, 140 2, 196 7"
          stroke="#007AFF" // make it primary color blue
          strokeWidth="10"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
};
