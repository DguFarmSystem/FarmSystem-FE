import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { PATH } from '@/constants/path';

export default function RootPage() {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      navigate(PATH.DASHBOARD);
    } else {
      navigate(PATH.AUTH_LOGIN);
    }
  }, [navigate]);
  return <div className="font-bold text-2xl text-center">Hello World!</div>;
}
