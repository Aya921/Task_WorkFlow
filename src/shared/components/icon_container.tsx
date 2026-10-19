import {  type LucideIcon } from "lucide-react";


type IconContainerProps={
   icon: LucideIcon;
    containerClassName?: string;
    iconColor?:string
}

export const IconContainer = ({
  icon:Icon,
  containerClassName = "rounded-4xl bg-primary-200",
  iconColor="text-primary-800"

}:IconContainerProps) => {
  return (
    <div  className={`flex h-16 w-16 shrink-0 items-center justify-center sm:h-20 sm:w-20 ${containerClassName}`}>
      <Icon
        className={`h-7 w-7  sm:h-8 sm:w-8 ${iconColor}`}
        aria-hidden
      />
    </div>
  );
};
