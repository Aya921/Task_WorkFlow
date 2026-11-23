import { MainHeader } from "./header";
import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  return (
    <div>
      <MainHeader>
        <Outlet />
      </MainHeader>
    </div>
  );
};
