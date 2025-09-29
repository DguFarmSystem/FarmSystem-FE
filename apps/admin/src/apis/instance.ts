import axios from 'axios';
import { PATH } from '@/constants/path';

const BACKEND_URL = import.meta.env.VITE_BASE_URL;
const DEV_BACKEND_URL = import.meta.env.VITE_BASE_DEV_URL;
const isDevelopment = import.meta.env.DEV;

// 개발 환경에서는 로컬 백엔드, 그 외에는 배포된 백엔드 사용
export const getBackendUrl = () => {
  return isDevelopment ? DEV_BACKEND_URL : BACKEND_URL;
};

export const instance = axios.create({
  baseURL: getBackendUrl(),
  responseType: 'json',
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
  withCredentials: true,
});

instance.interceptors.request.use(
  config => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

interface FailedRequest {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}

// 응답 인터셉터: 401 → 자동 리프레시 후 재시도
// 이 로직은 프로젝트 구조 및 성격에 따라 적절히 수정 필요
let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

function processQueue(error: unknown, token: string | null = null) {
  failedQueue.forEach(prom => {
    if (token) {
      prom.resolve(token);
    } else {
      prom.reject(error);
    }
  });
  failedQueue = [];
}

instance.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              originalRequest.headers['Authorization'] = `Bearer ${token}`;
              resolve(instance(originalRequest));
            },
            reject: err => reject(err),
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const res = await axios.post('/api/auth/reissue', null, {
          withCredentials: true,
        });

        const newAccessToken = res.data.message;
        localStorage.setItem('accessToken', newAccessToken);

        processQueue(null, newAccessToken);

        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return instance(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        localStorage.setItem('redirectedFrom', window.location.href);
        localStorage.removeItem('accessToken');
        window.location.href = PATH.AUTH_LOGIN;
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);
