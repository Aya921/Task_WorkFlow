import { SignupProvider } from "./features/auth/presentation/signup/context/signup_provider";
import { SignUpPage } from "./features/auth/presentation/signup/pages/signup_page";
import { BackGroundLayout } from "./layout/bg_layout";
import "./i18n"; 

function App() {
  return (
   <SignupProvider>
      <BackGroundLayout>
      <SignUpPage />
    </BackGroundLayout>

   </SignupProvider>
  

  );
}

export default App;
