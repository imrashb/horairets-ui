import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { PostHogProvider } from 'posthog-js/react';
import store from './app/store';
import AppThemeProvider from './themes/AppThemeProvider';
import App from './App';
import './i18n';
import Maintenance from './components/Maintenance/Maintenance';

const POSTHOG_API_KEY = import.meta.env.VITE_PUBLIC_POSTHOG_KEY;

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PostHogProvider
      apiKey={POSTHOG_API_KEY}
    >
      <AppThemeProvider>
        <Maintenance />
        <App />
      </AppThemeProvider>
    </PostHogProvider>
  </Provider>,
);
