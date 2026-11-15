import { useTranslation } from "react-i18next";
import { FONT_STYLES } from "../../../../../assets/fonts/font_style";
import { CreateProjectColorSwatch } from "./create_project_color_swatch";
import {
  PROJECT_COLORS,
  type ProjectColorOption,
} from "./project_colors";

type CreateProjectColorSectionProps = {
  selectedColor: ProjectColorOption;
  onSelect: (color: ProjectColorOption) => void;
};

export const CreateProjectColorSection = ({
  selectedColor,
  onSelect,
}: CreateProjectColorSectionProps) => {
  const { t } = useTranslation("dashboard");

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className={`${FONT_STYLES.overline} text-secondary-900`}>
          {t("createProject.fields.color.label")}
        </h3>
        <span
          style={{
            backgroundColor: `${selectedColor.color}20`,
            borderColor: `${selectedColor.color}55`,
            color: selectedColor.color,
          }}
          className={`${FONT_STYLES.caption} rounded-full border px-3 py-1 font-semibold`}
        >
          {t(`createProject.colors.${selectedColor.id}`)}
        </span>
      </div>

      <div className="grid grid-cols-6 gap-3 sm:grid-cols-9 sm:gap-4">
        {PROJECT_COLORS.map((color) => (
          <CreateProjectColorSwatch
            key={color.id}
            name={t(`createProject.colors.${color.id}`)}
            color={color.color}
            isSelected={selectedColor.id === color.id}
            onSelect={() => onSelect(color)}
          />
        ))}
      </div>
    </div>
  );
};
