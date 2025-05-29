import { Outlet } from 'react-router-dom';
import LandingPage from '../pages/index';
import GraduateDashboard from '../pages/graduate/Dashboard';
import GraduateProfile from '../pages/graduate/Profile';
import GraduateEducation from '../pages/graduate/Education';
import GraduateCertificates from '../pages/graduate/Certificates';
import GraduateJobSearch from '../pages/graduate/JobSearch';
import Login from '../pages/auth/Login';
import Registration from '../pages/auth/Register';
import NotFound from '../pages/common/NotFound';

import EmployerDashboard from '../pages/employer/Dashboard';
import GraduateSearch from '../pages/employer/GraduateSearch';
import AdminDashboard from '../pages/admin/Dashboard';
import EmployerRequests from '../pages/admin/EmployerRequests';
import Analytics from '../pages/admin/Analytics';
import Employers from '../pages/admin/Employers';
import Graduates from '../pages/admin/Graduates';
import Settings from '../pages/admin/Settings';

import GraduateLayout from '../layouts/GraduateLayout';
import EmployerLayout from '../layouts/EmployerLayout';
import AdminLayout from '../layouts/AdminLayout';
import ProtectedRoute from '../components/common/ProtectedRoute';

// Define routes configuration for react-router-dom v7
const routes = [
  {
    path: '/',
    element: <Outlet />, // Root layout with outlet for nested routes
    children: [
      // Public routes
      {
        path: '/',
        element: <LandingPage />,
      },
      // Auth routes
      {
        path: 'auth/login',
        element: <Login />,
      },
      {
        path: 'auth/register',
        element: <Registration />,
      },
      // Graduate routes
      {
        path: 'graduate',
        element: (
          <ProtectedRoute allowedRoles={['jobseeker']}>
            <GraduateLayout>
              <GraduateDashboard />
            </GraduateLayout>
          </ProtectedRoute>
        ),
      },
      {
        path: 'graduate/profile',
        element: (
          <ProtectedRoute allowedRoles={['jobseeker']}>
            <GraduateLayout>
              <GraduateProfile />
            </GraduateLayout>
          </ProtectedRoute>
        ),
      },
      {
        path: 'graduate/education',
        element: (
          <ProtectedRoute allowedRoles={['jobseeker']}>
            <GraduateLayout>
              <GraduateEducation />
            </GraduateLayout>
          </ProtectedRoute>
        ),
      },
      {
        path: 'graduate/certificates',
        element: (
          <ProtectedRoute allowedRoles={['jobseeker']}>
            <GraduateLayout>
              <GraduateCertificates />
            </GraduateLayout>
          </ProtectedRoute>
        ),
      },
      {
        path: 'graduate/jobs',
        element: (
          <ProtectedRoute allowedRoles={['jobseeker']}>
            <GraduateLayout>
              <GraduateJobSearch />
            </GraduateLayout>
          </ProtectedRoute>
        ),
      },
      // Employer routes
      {
        path: 'employer',
        element: (
          <ProtectedRoute allowedRoles={['employer']}>
            <EmployerLayout>
              <EmployerDashboard />
            </EmployerLayout>
          </ProtectedRoute>
        ),
      },
      {
        path: 'employer/search',
        element: (
          <ProtectedRoute allowedRoles={['employer']}>
            <EmployerLayout>
              <GraduateSearch />
            </EmployerLayout>
          </ProtectedRoute>
        ),
      },
      // Admin routes
      {
        path: 'admin/dashboard',
        element: (
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          </ProtectedRoute>
        ),
      },
      {
        path: 'admin/employer-requests',
        element: (
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminLayout>
              <EmployerRequests />
            </AdminLayout>
          </ProtectedRoute>
        ),
      },
      {
        path: 'admin/employers',
        element: (
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminLayout>
              <Employers />
            </AdminLayout>
          </ProtectedRoute>
        ),
      },
      {
        path: 'admin/graduates',
        element: (
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminLayout>
              <Graduates />
            </AdminLayout>
          </ProtectedRoute>
        ),
      },
      {
        path: 'admin/analytics',
        element: (
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminLayout>
              <Analytics />
            </AdminLayout>
          </ProtectedRoute>
        ),
      },
      {
        path: 'admin/settings',
        element: (
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminLayout>
              <Settings />
            </AdminLayout>
          </ProtectedRoute>
        ),
      },
      // Not Found route
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
];

export default routes;
