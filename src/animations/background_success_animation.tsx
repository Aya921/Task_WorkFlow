import LottieModule from "lottie-react";
import lazyLoading from "../assets/animations/celebration.json";

const Lottie = ((LottieModule as any).default ??
  LottieModule) as typeof LottieModule;

export const BackGroundSuccessAnimation = () => {
  return (
    <div className="flex flex-col ">
      <div className="flex">
        <Lottie animationData={lazyLoading} className="w-full" />
        <Lottie animationData={lazyLoading} className="w-full" />
        <Lottie animationData={lazyLoading} className="w-full" />
      </div>

      
    </div>
  );
};
