import LottieModule from "lottie-react";
import userCreateAccount from "../assets/animations/create_user.json";

const Lottie = ((LottieModule as any).default ?? LottieModule) as typeof LottieModule;

export const UserCreateAccountAnimation = () => {
  return (
    <Lottie
      animationData={userCreateAccount}
      className="w-64"
    
    />
  );
};