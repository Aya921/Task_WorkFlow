export const BackGroundLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="min-h-screen bg-background relative z-0 overflow-hidden">
      {/* Grid */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.25]"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--color-secondary-300) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Glows */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-48 -left-48 w-[600px] h-[600px] rounded-full bg-primary-500/15 blur-[140px]" />

        <div className="absolute top-1/3 -right-48 w-[550px] h-[550px] rounded-full bg-accent-400/15 blur-[140px]" />

        <div className="absolute bottom-[-100px] left-1/4 w-[450px] h-[450px] rounded-full bg-primary-300/10 blur-[120px]" />
      </div>

      {children}
    </div>
  );
};