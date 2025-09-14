import { instance } from '../instance';
import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '@/stores/useAuthStore';
import Cookies from 'js-cookie';

interface SocialLoginRequest {
  code: string;
  socialType: 'KAKAO' | 'GOOGLE';
}

interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

export const useSocialLoginPostMutation = () => {
  const studentId = useAuthStore(state => state.studentId);
  const setToken = useAuthStore(state => state.setToken);

  const mutation = useMutation<TokenResponse, any, SocialLoginRequest>({
    mutationFn: async ({ code, socialType }) => {
      const { data, status } = await instance.post<{ message?: string } & TokenResponse>(
        '/auth/login',
        {
          code,
          socialType,
          studentNumber: studentId,
        },
      );

      if (status !== 200) {
        const error = new Error('로그인 실패') as any;
        error.status = status;
        error.message = data?.message || '로그인 실패';
        throw error;
      }

      const { accessToken, refreshToken } = data;
      setToken(accessToken);
      localStorage.setItem('accessToken', accessToken);
      Cookies.set('refreshToken', refreshToken, {
        secure: true,
        sameSite: 'Strict',
      });

      return data;
    },
  });

  return {
    ...mutation,
    mutateAsync: mutation.mutateAsync,
  };
};
