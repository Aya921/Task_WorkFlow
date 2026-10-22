import { useEffect, useId, useRef, useState } from "react";
import { motion, useAnimationControls, useReducedMotion } from "framer-motion";
import { InputFieldIcon } from "./input_field_icons";
import { InputFieldLabel } from "./input_field_label";
import { InputFieldMessage } from "./input_field_message";
import { InputFieldPasswordToggle } from "./input_field_password_toggle";
import { buildInputClassName } from "./input_field_styles";
import type { InputFieldProps } from "./input_field_types";

export type { InputFieldProps } from "./input_field_types";

const SHAKE_X = [0, -5, 5, -3, 3, 0];

export const InputField = ({
  label,
  icon: Icon,
  iconPosition = "start",
  labelAccessory,
  labelClassName,
  className = "",
  status = "default",
  message,
  errorAppearance = "text",
  fieldSize = "md",
  showPasswordLabel,
  hidePasswordLabel,
  id,
  ...props
}: InputFieldProps) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const [showPassword, setShowPassword] = useState(false);
  const reduceMotion = useReducedMotion();
  const controls = useAnimationControls();
  const previousStatus = useRef(status);

  const isPassword = props.type === "password";
  const showStartIcon = Boolean(Icon) && iconPosition === "start";
  const showEndIcon = Boolean(Icon) && iconPosition === "end" && !isPassword;
  const messageId = message ? `${inputId}-message` : undefined;

  useEffect(() => {
    const becameInvalid =
      status === "error" && previousStatus.current !== "error";
    previousStatus.current = status;

    if (!becameInvalid || reduceMotion) {
      return;
    }

    void controls.start({
      x: SHAKE_X,
      transition: { duration: 0.32, ease: "easeOut" },
    });
  }, [status, controls, reduceMotion]);

  return (
    <motion.div
      className={`flex flex-col ${fieldSize === "sm" ? "gap-1.5" : "gap-2"}`}
      animate={controls}
    >
      <InputFieldLabel
        htmlFor={inputId}
        label={label}
        labelClassName={labelClassName}
        labelAccessory={labelAccessory}
      />

      <div className="group/input relative">
        <input
          {...props}
          id={inputId}
          type={isPassword && showPassword ? "text" : props.type}
          aria-invalid={status === "error" || undefined}
          aria-describedby={messageId}
          className={buildInputClassName({
            fieldSize,
            status,
            showStartIcon,
            showEndAffordance: isPassword || showEndIcon,
            className,
          })}
        />

        {showStartIcon && Icon ? (
          <InputFieldIcon icon={Icon} position="start" />
        ) : null}

        {showEndIcon && Icon ? (
          <InputFieldIcon icon={Icon} position="end" />
        ) : null}

        {isPassword ? (
          <InputFieldPasswordToggle
            showPassword={showPassword}
            showPasswordLabel={showPasswordLabel}
            hidePasswordLabel={hidePasswordLabel}
            onToggle={() => setShowPassword((prev) => !prev)}
          />
        ) : null}
      </div>

      <InputFieldMessage
        id={messageId}
        message={message}
        status={status}
        errorAppearance={errorAppearance}
      />
    </motion.div>
  );
};
