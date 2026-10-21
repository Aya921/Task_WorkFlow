type AuthDividerProps = {
  label: string;
  className?: string;
};

export const AuthDivider = ({ label, className = "" }: AuthDividerProps) => {
  return (
    <div
      className={`relative flex items-center justify-center py-2 ${className}`}
    >
      <div className="w-full border-t border-secondary-200" />
      <span className="absolute bg-background px-3 text-xs font-medium uppercase tracking-wider text-secondary-500">
        {label}
      </span>
    </div>
  );
};
