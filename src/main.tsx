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
import { ThemeProvider } from "./context/theme_context/theme_provider.tsx";

createRoot(document.getElementById("root")!).render(
 
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
          <ThemeProvider>
            <ErrorBoundary>
              <AuthProvider>
                <App />
              </AuthProvider>
            </ErrorBoundary>
            <ToastContainer/>
          </ThemeProvider>
        </ToastProvider>
       
      </QueryClientProvider>
    </BrowserRouter>
 
);
