import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import React from 'react';
import { store } from './app/store';
import AppThemeProvider from './themes/AppThemeProvider';
import App from './App';
import './i18n';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <AppThemeProvider>
      <App />
    </AppThemeProvider>
  </Provider>,
);
