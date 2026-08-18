// import { Routes, Route } from "react-router-dom";

// import { RegisterLayout } from "../features/auth/presentation/signup/layout/register_layout";
// import { ROUTES } from "./route_path";
// import { CreateUserPage } from "../features/auth/presentation/signup/pages/create_user_page";
// import { VerificationPage } from "../features/auth/presentation/signup/pages/verification_page";

// export const AppRoutes = () => {
//   return (
//     <Routes>
//       <Route element={<RegisterLayout />}>
       
//         <Route path={"/"} element={<CreateUserPage />} />
//         <Route path={ROUTES.VERIFICATION} element={<VerificationPage />} />

//       </Route>
//     </Routes>
//   );
// };



import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import { RegisterLayout } from "../features/auth/presentation/signup/layout/register_layout";
import { ROUTES } from "./route_path";
import { LazyLoader } from "../shared/components/lazy_loader";
import { CreateWorkSpacePage } from "../features/auth/presentation/signup/pages/workspace_page";


const CreateUserPage = lazy(() =>
  import("../features/auth/presentation/signup/pages/create_user_page").then((m) => ({
    default: m.CreateUserPage,
  }))
);
const VerificationPage = lazy(() =>
  import("../features/auth/presentation/signup/pages/verification_page").then((m) => ({
    default: m.VerificationPage,
  }))
);

export const AppRoutes = () => {
  return (
    <Suspense fallback={<LazyLoader show={true} delay={500}/>}>
      <Routes>
        <Route element={<RegisterLayout />}>
          <Route path={"/"} element={<CreateUserPage />} />
          <Route path={ROUTES.VERIFICATION} element={<VerificationPage />} />
          <Route path={ROUTES.CREATE_WORKSPACE} element={<CreateWorkSpacePage />} />

        </Route>
      </Routes>
    </Suspense>
  );
};
