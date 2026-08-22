import { Building2, Info, Link } from "lucide-react";
import { useTranslation } from "react-i18next";
import { InputField } from "../../../../../../shared/components/input_field";
import type { WorkspaceMode } from "../../types/workspace_mode";
import { FONT_STYLES } from "../../../../../../assets/fonts/font_style";

type WorkSpaceInputFieldProps = {
  workSpaceMode: Exclude<WorkspaceMode, null>;
  handleInputValue: (text: string) => void;
};

export const WorkSpaceInputField = ({
  workSpaceMode,
  handleInputValue,
}: WorkSpaceInputFieldProps) => {
  const { t } = useTranslation("signup");
  const workSpaceModeProperties =
    workSpaceMode === "join"
      ? {
          labelName: t("workspace.input.join.label"),
          icon: Link,
          placeholder: t("workspace.input.join.placeholder"),
        }
      : {
          labelName: t("workspace.input.create.label"),
          icon: Building2,
          placeholder: t("workspace.input.create.placeholder"),
        };

  return (
        <div className="flex w-full flex-col gap-2 rounded-2xl bg-secondary-100 p-4 sm:p-6 md:p-8">
          <InputField
            icon={workSpaceModeProperties.icon}
            placeholder={workSpaceModeProperties.placeholder}
            label={workSpaceModeProperties.labelName}
            onChange={(event) => handleInputValue(event.target.value)}
          />

          <div className="flex items-center gap-2">
            <Info className="h-4 w-4 shrink-0 text-info" aria-hidden />
            <p className={FONT_STYLES.bodySm}>
              {t("workspace.input.hint")}
            </p>
          </div>
        </div>
  );
};
