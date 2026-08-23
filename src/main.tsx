import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./query/query_client.ts";
import { ToastProvider } from "./context/toast_context/toast_provider.tsx";
import { ToastContainer } from "./shared/components/toast_container.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
           <App />
           <ToastContainer/>
        </ToastProvider>
       
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
);
