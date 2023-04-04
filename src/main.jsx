import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import store from './app/store';
import AppThemeProvider from './themes/AppThemeProvider';
import App from './App';
import './i18n';
import AuthProvider from './components/Auth/AuthProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <AuthProvider>
      <AppThemeProvider>
        <App />
      </AppThemeProvider>
    </AuthProvider>
  </Provider>,
);
