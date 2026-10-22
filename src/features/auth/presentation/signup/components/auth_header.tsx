import { FONT_STYLES } from "../../../../../assets/fonts/font_style";

type AuthSectionHeaderProps = {
  title: string;
  description?: string;
  className?: string;
};

export const AuthSectionHeader = ({
  title,
  description,
  className = "",
}: AuthSectionHeaderProps) => {
  return (
    <div className={`flex w-full max-w-xl flex-col gap-2 ${className}`}>
      <h1 className="text-2xl font-bold tracking-tight text-secondary-900 sm:text-3xl">
        {title}
      </h1>

      {description ? (
        <p className={`${FONT_STYLES.bodySm} text-secondary-500`}>
          {description}
        </p>
      ) : null}
    </div>
  );
};
