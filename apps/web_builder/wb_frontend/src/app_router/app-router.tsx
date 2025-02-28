import {
  createBrowserRouter,
  RouterProvider
}
  from 'react-router-dom';
import {
  QueryClient,
  QueryClientProvider
}
  from '@tanstack/react-query';
import {
  AuthLayout,
  DefaultLayout
}
  from '../layouts';
import {
  HomePage,
  DashboardPage,
  ListProjectsPage,
  NewAppPage,
  DetailProjectsPage,
  PageNotFound,
  LoginPage,
  RegisterPage,
  AddElementPage,
  CreateProjectPage,
  UserProfilePage,
} from '../pages';

// Khởi tạo QueryClient
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: 'add-element-app',
    element: <AddElementPage />,
  },
  {
    path: 'auth',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
    ],
  },

  {
    path: '*',
    element: <DefaultLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'dashboard',
        element: <DashboardPage />,
      },
      {
        path: 'projects',
        element: <ListProjectsPage />,
      },
      {
        path: 'create-new-project',
        element: <CreateProjectPage />,
      },
      {
        path: 'create-new-app',
        element: <NewAppPage />,
      },
      {
        path: 'project_detail/:projectId/:action',
        element: <DetailProjectsPage />,
      },
      {
        path: 'profile/:userId',
        element: <UserProfilePage />
      },
      {
        path: '*',
        element: <PageNotFound />,
      },
    ],
  },
]);

export const AppRouter = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};