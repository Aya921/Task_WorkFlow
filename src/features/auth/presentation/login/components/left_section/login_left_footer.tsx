import { useTranslation } from "react-i18next";

export const LoginLeftFooter = () => {
    const { t } = useTranslation("login");
    return(
        <div className="relative z-10 flex items-center justify-between border-t border-white/15 pt-6 text-xs text-primary-100/80">
        <div className="flex items-center gap-2">
          <div className="flex -space-x-1.5 rtl:space-x-reverse">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-secondary-200 text-[9px] font-bold text-secondary-700 ring-2 ring-primary-700">
              AK
            </div>
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-200 text-[9px] font-bold text-secondary-700 ring-2 ring-primary-700">
              SJ
            </div>
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-[9px] font-bold text-secondary-700 ring-2 ring-primary-700">
              TL
            </div>
          </div>
          <span>{t("brand.trustedBy")}</span>
        </div>
        <span className="font-mono text-[11px] text-white/60">
          {t("brand.version")}
        </span>
      </div>
        
    )
}