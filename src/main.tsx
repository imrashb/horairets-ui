import { QueryClientProvider } from "@tanstack/react-query";
import { Provider as JotaiProvider } from "jotai";
import React from "react";
import ReactDOM from "react-dom/client";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import queryClient from "./app/api/queryClient";
import AuthProvider from "./components/Auth/AuthProvider";
import { UserDocumentProvider } from "./hooks/firebase/useUserDocument";
import "./i18n";
import AppThemeProvider from "./themes/AppThemeProvider";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

ReactDOM.createRoot(rootElement).render(
  <QueryClientProvider client={queryClient}>
    <JotaiProvider>
      <AuthProvider>
        <UserDocumentProvider>
          <AppThemeProvider>
            <App />
          </AppThemeProvider>
        </UserDocumentProvider>
      </AuthProvider>
    </JotaiProvider>
  </QueryClientProvider>
);
