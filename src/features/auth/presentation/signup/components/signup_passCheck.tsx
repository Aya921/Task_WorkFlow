import { Check } from "lucide-react"

type SignupPasswordCheckListProps={
    label:string,
    isValid:boolean
}

export const SignupPasswordCheckList=({label,isValid}:SignupPasswordCheckListProps)=>{
    return (
         <div className="flex  gap-2 items-center ">
            <div className={`w-4 h-4 rounded-full border-1 flex items-center justify-center ${isValid?"bg-primary-800":"bg-white"}`} >
             {isValid&& <span className="text-white"><Check size={10}/></span>}
            </div>
            <p className="text-[12px]">{label}</p>
          </div>
    )

}