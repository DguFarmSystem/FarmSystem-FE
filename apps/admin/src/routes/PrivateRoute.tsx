import { Outlet, useLocation, Navigate } from 'react-router';

export default function PrivateRoute() {
  const accessToken = localStorage.getItem('accessToken');
  const location = useLocation();

  if (!accessToken) {
    // 로그인 페이지로 보내면서, 돌아올 경로 저장
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }
  return <Outlet />;
}
