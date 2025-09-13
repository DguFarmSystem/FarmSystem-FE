import { useEffect } from 'react';
import * as S from '../styles/StepStartStyled';
import AuthButton from './AuthButton';
import { useAuthStore } from '@repo/auth/stores/useAuthStore';
import { useSocialLogin } from '@repo/auth/hooks/useSocialLogin';
import useMediaQueries from '@/hooks/useMediaQueries';
import signIn from '@/assets/Icons/signIn.png';

import { isKakaoInApp, isAndroid, isIOS } from '@/utils/detect';
import { useSearchParams, useNavigate } from 'react-router';

export default function StepStart() {
  const { setStep } = useAuthStore();
  const { handleLogin } = useSocialLogin();
  const { isMobile } = useMediaQueries();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const type = searchParams.get('type') as 'KAKAO' | 'GOOGLE' | null;

  // 쿼리로 들어온 경우 자동 로그인 시도
  useEffect(() => {
    if (type === 'KAKAO' || type === 'GOOGLE') {
      handleLogin(type);
      navigate('/', { replace: true }); // 쿼리 파라미터 제거
    }
  }, [type, handleLogin, navigate]);

  // 인앱 브라우저일 경우 외부 브라우저로 강제 리디렉션
  const redirectToExternalBrowser = (provider: 'KAKAO' | 'GOOGLE') => {
    const origin = window.location.origin;
    const loginUrl = `${origin}/?type=${provider}`;

    if (isKakaoInApp()) {
      if (isAndroid()) {
        const intentUrl = `intent://${origin.replace(/^https?:\/\//, '')}/?type=${provider}#Intent;scheme=https;package=com.android.chrome;S.browser_fallback_url=${encodeURIComponent(loginUrl)};end;`;
        window.location.href = intentUrl;
      } else if (isIOS()) {
        window.location.href = `kakaotalk://web/openExternal?url=${encodeURIComponent(loginUrl)}`;
      }
      return true;
    }

    return false;
  };

  // 로그인 버튼 클릭 핸들러
  const handleClick = (provider: 'KAKAO' | 'GOOGLE') => {
    if (!redirectToExternalBrowser(provider)) {
      handleLogin(provider);
    }
  };

  // step=input 감지해서 자동 인증 단계 진입
  useEffect(() => {
    const step = searchParams.get('step');
    if (step === 'input') {
      setStep('input');
      navigate('/', { replace: true });
    }
  }, [searchParams, setStep, navigate]);

  // 회원 인증 클릭 핸들러
  const handleVerifyClick = () => {
    const origin = window.location.origin;
    const verifyUrl = `${origin}/?step=input`;

    if (isKakaoInApp()) {
      if (isAndroid()) {
        const intentUrl = `intent://${origin.replace(/^https?:\/\//, '')}/?step=input#Intent;scheme=https;package=com.android.chrome;S.browser_fallback_url=${encodeURIComponent(
          verifyUrl,
        )};end;`;
        window.location.href = intentUrl;
      } else if (isIOS()) {
        window.location.href = `kakaotalk://web/openExternal?url=${encodeURIComponent(verifyUrl)}`;
      }
      return;
    }

    setStep('input');
  };

  return (
    <S.Container>
      <S.LogoWrapper>
        <S.LogoIcon $isMobile={isMobile} />
        <S.LogoText $isMobile={isMobile} />
      </S.LogoWrapper>

      <S.SubText $isMobile={isMobile}>Farm System 회원들을 위한 커뮤니티</S.SubText>

      <S.ButtonGroup $isMobile={isMobile}>
        <AuthButton provider="google" onClick={() => handleClick('GOOGLE')} />
        <AuthButton provider="kakao" onClick={() => handleClick('KAKAO')} />
      </S.ButtonGroup>

      <S.GapWrapper>
        <S.Text $isMobile={isMobile}>회원인증 후 서비스를 이용할 수 있어요!</S.Text>
        <S.LinkWrapper onClick={handleVerifyClick} $isMobile={isMobile}>
          회원 인증하기
          <img
            src={signIn}
            alt="signIn icon"
            style={{ width: isMobile ? '6.5px' : '9px', height: 'auto' }}
          />
        </S.LinkWrapper>
      </S.GapWrapper>
    </S.Container>
  );
}
