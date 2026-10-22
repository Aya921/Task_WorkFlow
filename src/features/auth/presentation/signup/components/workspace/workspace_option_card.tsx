import { Check, type LucideIcon } from "lucide-react";
import { IconContainer } from "../../../../../../shared/components/icon_container";
import { FONT_STYLES } from "../../../../../../assets/fonts/font_style";

type WorkspaceOptionCardProps = {
  title: string;
  description: string;
  icon: LucideIcon;

  selected: boolean;
  onClick: () => void;
  variant?: "primary" | "rose";
};

export const WorkspaceOptionCard = ({
  title,
  description,
  icon,
  selected,
  onClick,
  variant = "primary",
}: WorkspaceOptionCardProps) => {
  const styles = {
    primary: {
      iconColor: "text-primary-600",
      containerIconColor: "bg-primary-50",
      selectedCheckIconColor: "bg-primary-50 text-primary-600",
      selectedBackgroundColor: "border-primary-600 bg-primary-50/60",
      hoverSelectedBackgroundColor: "hover:border-primary-300 hover:bg-secondary-50",
      groupHoverSelectedBackgroundColor: "group-hover:bg-primary-50",
    },
    rose: {
      iconColor: "text-primary-600",
      containerIconColor: "bg-primary-50",
      selectedCheckIconColor: "bg-primary-50 text-primary-600",
      selectedBackgroundColor: "border-primary-600 bg-primary-50/60",
      hoverSelectedBackgroundColor: "hover:border-primary-300 hover:bg-secondary-50",
      groupHoverSelectedBackgroundColor: "group-hover:bg-primary-50",
    },
  };

  const currentStyle = styles[variant];
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
    group relative flex min-w-0 w-full flex-1 cursor-pointer flex-col items-start gap-3
    rounded-xl border border-secondary-200 bg-white
    p-5 text-start shadow-sm transition-[border-color,background-color,box-shadow] duration-150 ease-out
    ${currentStyle.hoverSelectedBackgroundColor}
    ${selected ? currentStyle.selectedBackgroundColor : ""}
  `}
    >
      <div
        className={`absolute end-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg ${
          selected
            ? currentStyle.selectedCheckIconColor
            : `text-secondary-300 ${currentStyle.groupHoverSelectedBackgroundColor}`
        }`}
      >
        {selected && <Check className="h-4 w-4" aria-hidden />}
      </div>

      <IconContainer
        icon={icon}
        containerClassName={`rounded-xl ${currentStyle.containerIconColor}`}
        iconColor={currentStyle.iconColor}
      />

      <div className="flex flex-col gap-1.5 pe-8 text-start">
        <p className={`${FONT_STYLES.h4} text-secondary-900`}>{title}</p>
        <p className={`${FONT_STYLES.bodySm} leading-relaxed text-secondary-500`}>
          {description}
        </p>
      </div>
    </button>
  );
};
