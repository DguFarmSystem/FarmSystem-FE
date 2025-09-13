import { useEffect } from 'react';

declare global {
  interface Window {
    Kakao?: {
      init: (key: string) => void;
      isInitialized: () => boolean;
      Auth: {
        authorize: (options: { redirectUri: string }) => void;
      };
    };
  }
}

// 환경 감지 (웹 vs 카카오 앱)
const isKakaoApp = () => {
  const ua = navigator.userAgent.toLowerCase();
  return ua.includes('kakaotalk');
};

// 카카오 SDK 초기화
const initializeKakao = () => {
  if (window.Kakao && !window.Kakao.isInitialized()) {
    const appKey = import.meta.env.VITE_KAKAO_JS_KEY;
    if (appKey) {
      window.Kakao.init(appKey);
    } else {
      console.error('Kakao SDK 초기화 실패: 앱 키가 설정되지 않았습니다.');
    }
  }
};

export const useSocialLogin = (page: 'ADMIN' | 'FARMINGLOG' = 'FARMINGLOG') => {
  useEffect(() => {
    initializeKakao();
  }, []);

  const handleLogin = (provider: 'KAKAO' | 'GOOGLE') => {
    const redirectUri =
      provider === 'KAKAO'
        ? page == 'ADMIN'
          ? import.meta.env.VITE_KAKAO_ADMIN_REDIRECT_URI
          : import.meta.env.VITE_KAKAO_REDIRECT_URI
        : page == 'ADMIN'
          ? import.meta.env.VITE_GOOGLE_ADMIN_REDIRECT_URL
          : import.meta.env.VITE_GOOGLE_REDIRECT_URI;
    const clientId =
      provider === 'KAKAO'
        ? import.meta.env.VITE_KAKAO_CLIENT_ID
        : import.meta.env.VITE_GOOGLE_CLIENT_ID;

    if (provider === 'KAKAO' && isKakaoApp()) {
      window.Kakao?.Auth.authorize({ redirectUri });
      return;
    }

    const authUrl =
      provider === 'KAKAO'
        ? `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&state=KAKAO`
        : `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=profile%20email&access_type=offline&prompt=consent&state=GOOGLE`;

    window.location.href = authUrl;
  };

  return { handleLogin };
};
