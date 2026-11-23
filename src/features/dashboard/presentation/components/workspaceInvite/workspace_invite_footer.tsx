import { Check, Copy, RefreshCw } from "lucide-react";
import { useTranslation } from "react-i18next";
import { FONT_STYLES } from "../../../../../assets/fonts/font_style";
import { Button } from "../../../../../shared/components/button";

type WorkspaceInviteFooterProps = {
  isExpired: boolean;
  isCopied: boolean;
  isRegenerating: boolean;
  errorMessage?: string | null;
 
  onCopy: () => void;
  onGenerate: () => void;
};

export const WorkspaceInviteFooter = ({
  isExpired,
  isCopied,
  isRegenerating,
  errorMessage,

  onCopy,
  onGenerate,
}: WorkspaceInviteFooterProps) => {
  const { t } = useTranslation("dashboard");

  return (
    <div className="flex flex-col gap-2">
      {errorMessage ? (
        <p
          role="alert"
          className={`${FONT_STYLES.caption} font-medium text-red-600`}
        >
          {errorMessage}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-2">

     <div>
    {!isExpired&& <Button
            type="button"
            onClick={onGenerate}
            isLoading={isRegenerating}
            wrapperClassName="inline-flex"
            className={`px-3 py-1.5 ${FONT_STYLES.caption} font-semibold`}
            activeClassName="bg-primary-600 text-white hover:bg-primary-700"
            disabledClassName="bg-primary-100 text-primary-300"
          >
            <RefreshCw size={14} aria-hidden="true" />
            {t("workspaceInvite.generate")}
          </Button>}
     </div>
        

        {isExpired ? (
          <Button
            type="button"
            onClick={onGenerate}
            isLoading={isRegenerating}
            wrapperClassName="inline-flex"
            className={`px-3 py-1.5 ${FONT_STYLES.caption} font-semibold`}
            activeClassName="bg-primary-600 text-white hover:bg-primary-700"
            disabledClassName="bg-primary-100 text-primary-300"
          >
            <RefreshCw size={14} aria-hidden="true" />
            {t("workspaceInvite.generate")}
          </Button>
        ) : (
          <Button
            type="button"
            onClick={onCopy}
            wrapperClassName="inline-flex"
            className={`px-3 py-1.5 ${FONT_STYLES.caption} font-semibold`}
            activeClassName={
              isCopied
                ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                : "bg-primary-600 text-white hover:bg-primary-700"
            }
          >
            {isCopied ? (
              <>
                <Check size={14} aria-hidden="true" />
                {t("workspaceInvite.copied")}
              </>
            ) : (
              <>
                <Copy size={14} aria-hidden="true" />
                {t("workspaceInvite.copy")}
              </>
            )}
          </Button>
        )}






      </div>
    </div>
  );
};
