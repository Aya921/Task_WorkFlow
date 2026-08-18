import { useState, useEffect } from "react";
import { LazyLoadingAnimation } from "../../animations/lazy_loading_animation";

export const LazyLoader = ({ show = false, delay = 0 }) => {
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    let timeout:number;

    if (!show) {
      setShowLoader(false);
      return;
    }

    if (delay === 0) {
      setShowLoader(true);
    } else {
      timeout = setTimeout(() => {
        setShowLoader(true);
      }, delay);
    }

    return () => clearTimeout(timeout);
  }, [show, delay]);

  return(
    <div className="flex items-center justify-center">
        {showLoader&&(<LazyLoadingAnimation/>)}
    </div>
    

  )
};