import { lazy, Suspense } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router';
import PlaceHolder from './pages/PlaceHolder';
// 동적 임포트로 페이지 컴포넌트 로드
const Layout = lazy(() => import('@/pages/Layout'));
const Main = lazy(() => import('@/pages/Main'));
const Recruit = lazy(() => import('@/pages/Apply'));
const Blog = lazy(() => import('@/pages/Blog'));
const News = lazy(() => import('@/pages/News'));
const NewsDetail = lazy(() => import('@/pages/News/NewsDetail'));
const FAQ = lazy(() => import('@/pages/FAQ'));
const NotFound = lazy(() => import('@/pages/NotFound'));
const MaintainPage = lazy(() => import('@/pages/MaintainPage'));
const RedirectRoute = lazy(() => import('@/components/RedirectRoute'));

const IS_MAINTENANCE = false; // 유지보수 모드 ON/OFF 설정은 여기서 해주시면 됩니다.
const IS_RECRUIT = false; // 모집 모드 ON/OFF 설정은 여기서 해주시면 됩니다.

export default function Router() {
  if (IS_MAINTENANCE) {
    return <MaintainPage />;
  }

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <Suspense fallback={<div><PlaceHolder /></div>}>
          <Layout />
        </Suspense>
      ),
      children: [
        {
          path: '/',
          element: (
            <Suspense fallback={<div><PlaceHolder /></div>}>
              <Main />
            </Suspense>
          ),
        },
        {
          path: '/recruit',
          element: (
            <Suspense fallback={<div><PlaceHolder /></div>}>
              <RedirectRoute boolean={IS_RECRUIT}>
                <Recruit />
              </RedirectRoute>
            </Suspense>
          ),
        },
        {
          path: '/blog',
          element: (
            <Suspense fallback={<div><PlaceHolder /></div>}>
              <Blog />
            </Suspense>
          ),
        },
        {
          path: '/news',
          element: (
            <Suspense fallback={<div><PlaceHolder /></div>}>
              <News />
            </Suspense>
          ),
        },
        {
          path: '/news/:newsId',
          element: (
            <Suspense fallback={<div><PlaceHolder /></div>}>
              <NewsDetail />
            </Suspense>
          ),
        },
        {
          path: '/FAQ',
          element: (
            <Suspense fallback={<div><PlaceHolder /></div>}>
              <FAQ />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: '*',
      element: (
        <Suspense fallback={<div><PlaceHolder /></div>}>
          <NotFound />
        </Suspense>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}