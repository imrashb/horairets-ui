import { configureStore } from '@reduxjs/toolkit';
import { generateurApi } from '../features/generateur/generateur.api';
import { generateurReducer } from '../features/generateur/generateur.slice';
import userReducer from '../features/user/userSlice';
import { apiSlice } from './api/apiSlice';
import { affichageReducer } from '../features/affichage/affichage.slice';

export default configureStore({
  reducer: {
    [generateurApi.reducerPath]: generateurApi.reducer,
    generateur: generateurReducer,
    affichage: affichageReducer,
    user: userReducer,
  },
  middleware: (getdefaultMiddleware) => getdefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
