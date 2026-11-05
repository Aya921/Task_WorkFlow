import { useLottie } from "lottie-react";
import emptyDashboard from "../assets/animations/Empty_file.json";

export const EmptyDashboardLottieAnimation = () => {
  const { View } = useLottie({
    animationData: emptyDashboard,
    loop: true,
    className: "w-full max-w-[300px]",
  });

  return View;
};