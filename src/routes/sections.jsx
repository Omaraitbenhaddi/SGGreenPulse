import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/app'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const ServicePage = lazy(() => import('src/pages/service'));
export const DemandePage = lazy(() => import('src/pages/Demandeservice'));
export const LogsPage = lazy(() => import('src/pages/Logs'));
export const LogPage = lazy(() => import('src/pages/log'));


// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'service', element: <ServicePage /> },
        { path: 'serviceADemender', element: <DemandePage /> },
        { path: 'logs', element: <LogsPage /> },
        { path: 'servicesDemende', element: <LogPage /> },

      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
