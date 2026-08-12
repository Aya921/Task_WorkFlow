import { Eye, EyeOff, type LucideIcon } from "lucide-react";
import { useState, type InputHTMLAttributes } from "react";

type Status = "default" | "error" | "success";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  icon?: LucideIcon;
  label: string;
  status?: Status;
  message?: string;
};

const statusClasses = {
  default: "border-secondary-300",
  error: "border-red-500 focus:ring-red-500/20",
  success: "border-green-500 focus:ring-green-500/20",
};

const messageClasses = {
  default: "text-secondary-500",
  error: "text-red-500",
  success: "text-success",
};

export const InputField = ({
  label,
  icon: Icon,
  className = "",
  status,
  message,
  ...props
}: InputFieldProps) => {
  const [showPass, setShowPass] = useState(false);
  const toggleShowPassword = () => {
    setShowPass((prev) => !prev);
  };
  const chooseType=()=>{

    if(props.type=="password"&&showPass) return "text"
    return props.type
  }
  const inputType =chooseType()
  return (
    <div className="flex flex-col gap-2 ">
      <span className="text-[14px] font-medium">{label}</span>
      <div className="relative ">
        <input
          {...props}
          type={inputType}
          className={`pl-10 py-2 rounded-xl w-full border-2 border-secondary-300 focus:ring-2 focus:ring-primary-500  focus:border-transparent
             hover:border-secondary-500 transition-all shadow-sm outline-none text-[14px] ${statusClasses[status ?? "default"]}`}
        />
        {Icon && (
          <span className="absolute top-1/2 -translate-y-1/2 left-3 text-secondary-400 ">
            <Icon size={20} />
          </span>
        )}

        {props.type == "password" && (
          <button
            type="button"
            onClick={toggleShowPassword}
            className="absolute top-1/2 -translate-y-1/2 right-3 text-secondary-400 hover:text-secondary-600"
          >
            {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>

      {message && props.type != "password" && (
        <span className={` text-sm ${messageClasses[status ?? "default"]}`}>
          {message}
        </span>
      )}
    </div>
  );
};
