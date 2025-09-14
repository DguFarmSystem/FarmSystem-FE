import { Outlet, RouteObject, RouterProvider, createBrowserRouter } from 'react-router';
import RootPage from '@/pages/RootPage';
import SomethingWentWrongPage from '@/components/status/error/SomethingWentWrongPage';
import { UnknownErrorBoundary } from '@/components/status/error/UnknownErrorBoundary';
import { Suspense } from 'react';
import Loader from '@/components/status/loading/Loader';
import { PATH, type ROUTE_TYPE } from '@/constants/path';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

import LoginPage from '@/pages/auth/Login';
import SocialRedirect from '@/pages/auth/SocialLoginRedirect';
import DashboardLayout from '@/layouts/DashboardLayout';

import DashboardPage from '@/pages/dashboard/Dashboard';
import UsersPage from '@/pages/dashboard/Users';
import BlogsPage from '@/pages/dashboard/Blogs';
import NewsPage from '@/pages/dashboard/News';
import ApplyPage from '@/pages/dashboard/Apply';

const createAuthRouter = (routeType: ROUTE_TYPE, children: RouteObject[]) => {
  const authRouter = children.map((child: RouteObject) => ({
    element: routeType === 'PRIVATE' ? <PrivateRoute /> : <PublicRoute />,
    children: [child],
  }));
  return authRouter;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <UnknownErrorBoundary>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </UnknownErrorBoundary>
    ),
    children: [
      {
        index: true,
        element: <RootPage />,
      },
      ...createAuthRouter('PRIVATE', [
        {
          path: PATH.DASHBOARD,
          element: <DashboardLayout />,
          children: [
            {
              index: true,
              element: <DashboardPage />,
            },
            {
              path: PATH.DASHBOARD_USERS,
              element: <UsersPage />,
            },
            {
              path: PATH.DASHBOARD_BLOGS,
              element: <BlogsPage />,
            },
            {
              path: PATH.DASHBOARD_NEWS,
              element: <NewsPage />,
            },
            {
              path: PATH.DASHBOARD_APPLY,
              element: <ApplyPage />,
            },
          ],
        },
      ]),
      ...createAuthRouter('PUBLIC', [
        {
          path: PATH.AUTH_LOGIN,
          element: <LoginPage />,
        },
        {
          path: PATH.AUTH_SOCIAL_REDIRECT,
          element: <SocialRedirect />,
        },
      ]),
      {
        path: '*',
        element: <SomethingWentWrongPage />,
      },
    ],
  },
]);

export const AppRouter = () => <RouterProvider router={router} />;
