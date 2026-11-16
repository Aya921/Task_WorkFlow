import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./query/query_client.ts";
import { ToastProvider } from "./context/toast_context/toast_provider.tsx";
import { ToastContainer } from "./shared/components/toast_container.tsx";
import { AuthProvider } from "./context/auth_context/auth_provider.tsx";
import { ErrorBoundary } from "./shared/components/error_boundary.tsx";

import "@fontsource/plus-jakarta-sans/400.css";
import "@fontsource/plus-jakarta-sans/500.css";
import "@fontsource/plus-jakarta-sans/600.css";
import "@fontsource/plus-jakarta-sans/700.css";
import "@fontsource/plus-jakarta-sans/400-italic.css";
import "@fontsource/plus-jakarta-sans/500-italic.css";


import "@fontsource/cairo/arabic-400.css";
import "@fontsource/cairo/arabic-500.css";
import "@fontsource/cairo/arabic-600.css";
import "@fontsource/cairo/arabic-700.css";
import "@fontsource/cairo/latin-400.css";
import "@fontsource/cairo/latin-500.css";
import "@fontsource/cairo/latin-600.css";
import "@fontsource/cairo/latin-700.css";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <ErrorBoundary>
          <AuthProvider>
            <App />
          </AuthProvider>
        </ErrorBoundary>
        <ToastContainer />
      </ToastProvider>
    </QueryClientProvider>
  </BrowserRouter>,
);
