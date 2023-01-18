import { configureStore } from '@reduxjs/toolkit';
import { generateurApi } from '../features/generateur/generateur.api';
import { generateurReducer } from '../features/generateur/generateur.slice';
import userReducer from '../features/user/userSlice';
import { apiSlice } from './api/apiSlice';

export default configureStore({
  reducer: {
    [generateurApi.reducerPath]: generateurApi.reducer,
    generateur: generateurReducer,
    user: userReducer,
  },
  middleware: (getdefaultMiddleware) => getdefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
