import { Outlet, RouteObject, RouterProvider, createBrowserRouter } from 'react-router';
import RootPage from '@/pages/RootPage';
import SomethingWentWrongPage from '@/components/status/error/SomethingWentWrongPage';
import { UnknownErrorBoundary } from '@/components/status/error/UnknownErrorBoundary';
import { Suspense } from 'react';
import Loader from '@/components/status/loading/Loader';
import type { ROUTE_TYPE } from '@/constants/path';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

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
      ...createAuthRouter('PRIVATE', [{}]),
      ...createAuthRouter('PUBLIC', [{}]),
      {
        path: '*',
        element: <SomethingWentWrongPage />,
      },
    ],
  },
]);

export const AppRouter = () => <RouterProvider router={router} />;
