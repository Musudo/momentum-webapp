// import ProtectedRoute from '@/routes/protectedRoute';
import { lazy, StrictMode, Suspense } from 'react';
import { Navigate, redirect, RouteObject } from 'react-router-dom';
import { TRouting } from '../redux/slice/routingSlice';
import App from '../App';
import { initAxiosServices } from '../utils/axios/axiosLoader';
import SignInCallback from './signInCallback';

export const createRoutes = (routingData: TRouting[]): RouteObject[] => {
  return [
    {
      path: '/',
      Component: () => (
        <StrictMode>
          <App />
        </StrictMode>
      ),
      id: 'root',
      shouldRevalidate: () => true,
      loader: async () => {
        // const redirectUrl =
        //   await Authentication.checkAuthentication(initAxiosServices);
        // if (redirectUrl) return redirect(redirectUrl);
        // return {};
      },
      errorElement: <div>No access</div>,
      children: [
        {
          // element: <ProtectedRoute />,
          children: [
            ...routingData.map((route) => ({
              path: route.path,
              Component: () => {
                // const LazyComp = lazy(
                //   () => import('../views/private/widgetView'),
                // );
                return (
                  <Suspense fallback={<></>}>
                    {/* <LazyComp guid={route.guid} /> */}
                  </Suspense>
                );
              },
            })),
            {
              path: 'signout',
              // loader: () => redirect(Authentication.signout()),
            },
            // Authentication.decodedToken?.impersonation === 'true'
            //   ? {
            //       path: 'impersonate',
            //       Component: () => <PlatformUsersTable />,
            //     }
            //   : {},
            // Authentication.decodedToken?.institution_access
            //   ? {
            //       path: 'institutionaccess',
            //       Component: () => <InstitutionAccessTable />,
            //     }
            //   : {},
          ],
        },
        {
          path: '*',
          Component: () => <div>not found</div>,
        },
      ],
    },
    {
      path: 'signin-callback',
      element: <SignInCallback />,
    },
    {
      path: 'upload/incidents/:guid',
      // lazy: async () => {
      //   const { FileUpload } = await import('../views');
      //   return { Component: FileUpload };
      // },
    },
    {
      path: '*',
      Component: () => <Navigate to='/' />,
    },
  ];
};
