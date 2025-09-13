import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { useSocialLogin } from '@repo/auth/hooks/useSocialLogin';
import { isKakaoInApp, isAndroid, isIOS } from '@/lib/detect';

export default function LoginPage() {
  const { handleLogin } = useSocialLogin('ADMIN');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // 컴포넌트 마운트 시 URL 쿼리 파라미터를 확인하여 자동 로그인을 시도합니다.
  // 이 로직은 주로 인앱 브라우저에서 외부 브라우저로 리디렉션된 후, 로그인을 자동으로 시작하기 위해 사용됩니다.
  useEffect(() => {
    const type = searchParams.get('type') as 'KAKAO' | 'GOOGLE' | null;
    if (type) {
      handleLogin(type);
      // 로그인을 시작한 후, URL에서 쿼리 파라미터를 제거하여 깔끔하게 정리합니다.
      const currentPath = window.location.pathname;
      navigate(currentPath, { replace: true });
    }
  }, [searchParams, handleLogin, navigate]);

  /**
   * @description
   * 현재 환경이 인앱 브라우저인 경우, 외부 브라우저로 리디렉션합니다.
   * @param provider - 소셜 로그인 제공자 ('KAKAO' 또는 'GOOGLE')
   * @returns {boolean} 리디렉션이 시도되었으면 true, 아니면 false를 반환합니다.
   */
  const redirectToExternalBrowser = (provider: 'KAKAO' | 'GOOGLE'): boolean => {
    if (!isKakaoInApp()) {
      return false;
    }

    const origin = window.location.origin;
    const currentPath = window.location.pathname;
    const loginUrl = `${origin}${currentPath}?type=${provider}`; // 현재 경로에 type 파라미터를 추가하여 리디렉션 URL 생성
    const originWithoutProtocol = origin.replace(/^https?:\/\//, '');
    const intentPath = `${currentPath}?type=${provider}`.substring(1); // Intent URL을 위한 경로 포맷팅

    if (isAndroid()) {
      const intentUrl = `intent://${originWithoutProtocol}/${intentPath}#Intent;scheme=https;package=com.android.chrome;S.browser_fallback_url=${encodeURIComponent(loginUrl)};end;`;
      window.location.href = intentUrl;
    } else if (isIOS()) {
      window.location.href = `kakaotalk://web/openExternal?url=${encodeURIComponent(loginUrl)}`;
    }

    return true; // 리디렉션 시도됨
  };

  /**
   * @description
   * 로그인 버튼 클릭 시 실행되는 핸들러
   * 인앱 브라우저 여부를 먼저 체크하고, 일반 브라우저 환경에서만 로그인 로직을 실행
   * @param provider - 소셜 로그인 제공자 ('KAKAO' 또는 'GOOGLE')
   */
  const handleLoginClick = (provider: 'KAKAO' | 'GOOGLE') => {
    if (redirectToExternalBrowser(provider)) {
      return;
    }
    handleLogin(provider);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">관리자 페이지 로그인</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {/* 카카오 로그인 버튼 */}
          <Button
            onClick={() => handleLoginClick('KAKAO')}
            className="p-0 h-auto bg-[#FEE500] hover:bg-[#FEE500]/80"
            aria-label="Login with Kakao"
          >
            <img
              src="/kakao_login_medium_wide.png"
              alt="카카오 로그인"
              className="h-12 w-auto rounded-md hover:opacity-60"
            />
          </Button>

          <Button
            variant="outline"
            onClick={() => handleLoginClick('GOOGLE')}
            className="w-full flex items-center justify-center gap-3 py-6 border-gray-300"
          >
            <img
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="Google G logo"
              className="h-5 w-5"
            />
            <span className="font-semibold text-lg text-gray-700">Google 계정으로 로그인</span>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
