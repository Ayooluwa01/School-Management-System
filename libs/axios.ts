// libs/axios.ts
import axios from 'axios';
import type { InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '../zustand/store';
import { Trykker } from 'next/font/google';



const api = axios.create({
  baseURL: 'http://localhost:4000',withCredentials:true
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// api.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config;
    
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;


//       try {
//     console.log('refreshing with cookies')
//         await api.post("/auth/refresh");
//         return api(originalRequest);
//       } catch (refreshError) {
//         console.error("Refresh Token expired. Logging out...");
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// api.interceptors.request.use(
//   (config: InternalAxiosRequestConfig) => {
//     if (config.url?.includes('/auth/login') || config.url?.includes('/auth/signup')) {
//       return config;
//     }

//     const token = localStorage.getItem('accessToken');
//     if (token) {
//       config.headers = config.headers ?? {};
//       if ('set' in config.headers) {
//         config.headers.set('Authorization', `Bearer ${token}`);
//       } else {
//         (config.headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
//       }
//     }

//     return config;
//   },
//   (error) => Promise.reject(error),
// );

export default api;
