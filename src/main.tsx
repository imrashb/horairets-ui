import { QueryClientProvider } from "@tanstack/react-query";
import { Provider as JotaiProvider } from "jotai";
import React from "react";
import ReactDOM from "react-dom/client";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import queryClient from "./app/api/queryClient";
import AuthProvider from "./components/Auth/AuthProvider";
import "./i18n";
import AppThemeProvider from "./themes/AppThemeProvider";

// Ensure root element exists using null assertion or check
const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

ReactDOM.createRoot(rootElement).render(
  <QueryClientProvider client={queryClient}>
    <JotaiProvider>
      <AuthProvider>
        <AppThemeProvider>
          <App />
        </AppThemeProvider>
      </AuthProvider>
    </JotaiProvider>
  </QueryClientProvider>
);
