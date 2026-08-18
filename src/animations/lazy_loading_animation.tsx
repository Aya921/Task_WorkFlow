import LottieModule from "lottie-react";
import lazyLoading from "../assets/animations/loading.json";

const Lottie = ((LottieModule as any).default ?? LottieModule) as typeof LottieModule;

export const LazyLoadingAnimation = () => {
  return (
    <Lottie
      animationData={lazyLoading}
      className="w-64"
    
    />
  );
};