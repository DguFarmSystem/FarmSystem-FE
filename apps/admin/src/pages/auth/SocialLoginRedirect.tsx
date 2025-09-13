import { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { useAuthStore } from '@/stores/useAuthStore';
import { useSocialLoginPostMutation } from '@/apis/auth/useSocialLoginPost.mutation';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

export default function SocialRedirect() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { studentId } = useAuthStore();
  const hasCalled = useRef(false);

  const { mutateAsync: socialLogin } = useSocialLoginPostMutation();

  const [error, setError] = useState<{ title: string; message: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (hasCalled.current) return;
    hasCalled.current = true;

    const code = params.get('code');
    const provider = (params.get('state') || params.get('provider'))?.toUpperCase();

    if (!code || (provider !== 'KAKAO' && provider !== 'GOOGLE')) {
      setError({ title: '잘못된 접근', message: '파라미터가 올바르지 않습니다.' });
      return;
    }

    const login = async () => {
      setLoading(true);
      try {
        await socialLogin({ code, socialType: provider });
        navigate('/');
      } catch (err: unknown) {
        const status = (err as { status?: number })?.status;
        console.error(err);
        if (status === 404) {
          setError({ title: '가입되지 않은 사용자', message: '회원 인증 후 로그인해주세요.' });
        } else if (status === 409) {
          setError({ title: '이미 가입된 계정', message: '다른 계정으로 로그인해주세요.' });
        } else if (status === 500) {
          setError({ title: '서버 오류', message: '잠시 후 다시 시도해주세요.' });
        } else {
          setError({ title: '로그인 오류', message: '계속 실패하면 운영진에게 문의해주세요.' });
        }
      } finally {
        setLoading(false);
      }
    };

    login();
  }, [params, navigate, socialLogin, studentId]);

  return (
    <div className="flex justify-center items-center h-screen w-full">
      {loading && (
        <div className="flex items-center justify-center space-x-2">
          <div className="w-4 h-4 rounded-full animate-spin border-2 border-t-transparent border-blue-500"></div>
          <span>로딩 중...</span>
        </div>
      )}
      {error && (
        <AlertDialog open={true} onOpenChange={() => navigate('/')}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{error.title}</AlertDialogTitle>
              <AlertDialogDescription>{error.message}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <Button onClick={() => navigate('/')}>처음으로</Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}
