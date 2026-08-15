import { BackGroundLayout } from "./layout/bg_layout";
import "./i18n";
import { Register } from "./features/auth/presentation/signup/layout/register";

function App() {
  return (
    <BackGroundLayout>
      <Register />
    </BackGroundLayout>
  );
}

export default App;
