import ReactDOM from 'react-dom/client';
import { Provider as JotaiProvider } from 'jotai';
import { QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import queryClient from './app/api/queryClient';
import AppThemeProvider from './themes/AppThemeProvider';
import App from './App';
import './i18n';
import AuthProvider from './components/Auth/AuthProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <JotaiProvider>
      <AuthProvider>
        <AppThemeProvider>
          <App />
        </AppThemeProvider>
      </AuthProvider>
    </JotaiProvider>
  </QueryClientProvider>,
);
