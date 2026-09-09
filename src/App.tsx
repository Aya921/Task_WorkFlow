import "./i18n";
import { AppRoutes } from "./routes/app_route";
import { ThemeToggle } from "./shared/components/theme_toggle";

function App() {
  return (
    <>
      <AppRoutes />
      <ThemeToggle />
    </>
  );
}

export default App;
