import { Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { FONT_STYLES } from "../../../../../assets/fonts/font_style";
import { Button } from "../../../../../shared/components/button";

type CreateProjectFooterProps = {
  onCancel: () => void;
  isSubmitting?: boolean;
};

export const CreateProjectFooter = ({
  onCancel,
  isSubmitting = false,
}: CreateProjectFooterProps) => {
  const { t } = useTranslation("dashboard");

  return (
    <div className="flex w-full flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-end sm:gap-3">
      <Button
        type="button"
        onClick={onCancel}
        wrapperClassName="w-full sm:w-auto"
        className={`w-full px-4 py-2.5 ${FONT_STYLES.button} font-semibold sm:w-auto`}
        activeClassName="border-secondary-200 bg-white text-secondary-700 hover:bg-secondary-50"
      >
        {t("createProject.actions.cancel")}
      </Button>

      <Button
        type="submit"
        isLoading={isSubmitting}
        wrapperClassName="w-full sm:w-auto"
        className={`w-full px-4 py-2.5 ${FONT_STYLES.button} font-semibold shadow-md shadow-primary-500/20 sm:w-auto`}
        activeClassName="bg-primary-600 text-white hover:bg-primary-700"
        disabledClassName="bg-primary-300 text-white"
      >
        <Plus size={16} strokeWidth={2.5} />
        {t("createProject.actions.create")}
      </Button>
    </div>
  );
};
