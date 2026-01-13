/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import { getDefaultStore } from 'jotai';
import {
  tokenAtom, setCredentialsAtom, logOutAtom, userAtom,
} from '../../features/user/userAtoms';
import { BASE_API_URL } from './api.constants';

axios.defaults.baseURL = BASE_API_URL;
const axiosInstance = axios.create({
  baseURL: BASE_API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const store = getDefaultStore();
  const token = store.get(tokenAtom);
  if (token) {
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      const store = getDefaultStore();
      try {
        const { data } = await axios.get(`${BASE_API_URL}/refresh`);
        const user = store.get(userAtom);
        store.set(setCredentialsAtom, { user, ...data });
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        store.set(logOutAtom);
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
