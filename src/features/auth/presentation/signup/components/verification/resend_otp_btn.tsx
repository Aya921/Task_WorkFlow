import { RotateCw } from "lucide-react"
import { FONT_STYLES } from "../../../../../../assets/fonts/font_style"

export const ResendOtpBtn=()=>{
    return(
          <div className="w-full flex justify-end ">
        <button
          type="button"
          className="flex items-center justify-center gap-2 cursor-pointer text-primary-600 hover:text-primary-800 transition-all duration-100"
        >
          <RotateCw size={15} />
          <p className={`${FONT_STYLES.bodySm}`}>Resend Code</p>
        </button>
      </div>
    )
}