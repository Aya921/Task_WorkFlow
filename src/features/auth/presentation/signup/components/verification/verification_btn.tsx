import { ArrowLeft, ArrowRight } from "lucide-react"
import { FONT_STYLES } from "../../../../../../assets/fonts/font_style"
import { Button } from "../../../../../../shared/components/button"

export const VerificationBtn=()=>{
    return(
        
    <div className="flex items-center justify-between w-full mt-5 ">
        <div className=" w-full max-w-[200px]">
          <Button
            className="w-full max-w-2xl"
            activeClassName={`hover:bg-primary-100 text-secondary-600 cursor-pointer ${FONT_STYLES.body}`}
          >
            <ArrowLeft
              size={20}
              className="shrink-0 rtl:rotate-180"
              aria-hidden
            />
            <span className={FONT_STYLES.button}>back</span>
          </Button>
        </div>

        <div className="w-full max-w-sm">
          <Button
            //disabled={!isValidOtp}
            activeClassName="bg-primary-800 hover:bg-primary-900 text-white cursor-pointer"
            disabledClassName="bg-primary-200 text-white cursor-not-allowed"
          >
            <span className={FONT_STYLES.button}>Verify & Continue</span>
            <ArrowRight
              size={20}
              className="shrink-0 rtl:rotate-180"
              aria-hidden
            />
          </Button>
        </div>
      </div>
    )
}