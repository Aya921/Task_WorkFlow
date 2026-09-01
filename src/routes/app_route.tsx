import {  Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import { RegisterLayout } from "../features/auth/presentation/signup/layout/register_layout";
import { LazyLoader } from "../shared/components/lazy_loader";
import { SignupRouter } from "../features/auth/presentation/utils/signup_router";
import { HomePage } from "../features/home/pages/home_page";



export const AppRoutes = () => {
  return (
    <Suspense fallback={<LazyLoader show={true} delay={500} />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route element={<RegisterLayout />}>
          <Route path="/signup/:step" element={<SignupRouter />} />
        </Route>
      </Routes>
    </Suspense>
  );
};
