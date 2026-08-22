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
      <h1 className={FONT_STYLES.h1}>{title}</h1>

      {description ? <p className={FONT_STYLES.body}>{description}</p> : null}
    </div>
  );
};
