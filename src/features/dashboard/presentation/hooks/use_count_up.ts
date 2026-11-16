import { useEffect, useState } from "react";
import { animate, useReducedMotion } from "framer-motion";

export const useCountUp = (value: number, duration = 0.85) => {
  const reduceMotion = Boolean(useReducedMotion());
  const [displayValue, setDisplayValue] = useState(reduceMotion ? value : 0);

  useEffect(() => {
    if (reduceMotion) {
      return;
    }

    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        setDisplayValue(Math.round(latest));
      },
    });

    return () => {
      controls.stop();
    };
  }, [duration, reduceMotion, value]);

  return displayValue;
};
