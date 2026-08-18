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
      iconColor: "text-primary-800",
      containerIconColor: "bg-accent-100",
      selectedCheckIconColor:"bg-accent-100",

      selectedBackgroundColor: "bg-accent-50",
      hoverSelectedBackgroundColor: "hover:bg-accent-50",

      borderColor: "hover:border-primary-300",
      groupHoverSelectedBackgroundColor:"group-hover:bg-accent-100",
        
    },
    rose: {
      iconColor: "text-rose-800",
      containerIconColor: "bg-rose-100",
       selectedCheckIconColor:"bg-rose-100",
       
      selectedBackgroundColor: "bg-rose-50",
      hoverSelectedBackgroundColor: "hover:bg-rose-50",

      borderColor: "hover:border-rose-300",
      groupHoverSelectedBackgroundColor:"group-hover:bg-rose-100"
    },
  };

  const currentStyle = styles[variant];
  return (
   <button
  type="button"
  onClick={onClick}
  className={`
    group relative flex flex-1 flex-col items-start gap-2
    w-full rounded-2xl border-2 border-neutral-900/20
    p-5 transition-all cursor-pointer
    hover:shadow-md
    ${currentStyle.borderColor}
    ${currentStyle.hoverSelectedBackgroundColor}
    ${selected ? currentStyle.selectedBackgroundColor : ""}
  `}
>
      <div
        className={`absolute right-3 flex h-15 w-15 items-center justify-center rounded-2xl ${
          selected
            ? currentStyle.selectedCheckIconColor
            : currentStyle.groupHoverSelectedBackgroundColor
        }`}
      >
        {selected && <Check />}
      </div>

      <IconContainer
        icon={icon}
        containerClassName={`rounded-4xl ${currentStyle.containerIconColor}`}
        iconColor={currentStyle.iconColor}
      />

      <div className="text-start flex flex-col gap-2">
        <p className={FONT_STYLES.h3}>{title}</p>
        <p className={`${FONT_STYLES.body} leading-tight`}>{description}</p>
      </div>
    </button>
  );
};
