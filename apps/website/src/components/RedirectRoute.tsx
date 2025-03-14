import { Navigate } from 'react-router';

interface PrivateRouteProps {
  children: JSX.Element; // 보호할 컴포넌트(페이지)
  boolean: boolean; // 리다이렉트 여부
}

export default function PrivateRoute({ children, boolean }: PrivateRouteProps) {
  if (!boolean) {
    return <Navigate to="/" />;
  }
  return children;
}
