// libs/axios.ts
import axios from 'axios';
import type { InternalAxiosRequestConfig } from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000',withCredentials:true
});

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
