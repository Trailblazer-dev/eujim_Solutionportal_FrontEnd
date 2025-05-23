import { createBrowserRouter } from 'react-router-dom';
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
import UserManagement from '../pages/admin/UserManagement';
import Analytics from '../pages/admin/Analytics';
import Employers from '../pages/admin/Employers';
import Graduates from '../pages/admin/Graduates';
import Settings from '../pages/admin/Settings';

// Placeholder components for missing pages
const EmployersPage = () => <div className="p-8 text-center text-gray-500">Employers page coming soon.</div>;
const GraduatesPage = () => <div className="p-8 text-center text-gray-500">Graduates page coming soon.</div>;
const SettingsPage = () => <div className="p-8 text-center text-gray-500">Settings page coming soon.</div>;

import GraduateLayout from '../layouts/GraduateLayout';
import EmployerLayout from '../layouts/EmployerLayout';
import AdminLayout from '../layouts/AdminLayout';

const router = createBrowserRouter([
  // Public routes
  {
    path: '/',
    element: <LandingPage />, // already has Header
  },
  // Auth routes
  {
    path: '/auth/login',
    element: <Login />,
  },
  {
    path: '/auth/register',
    element: <Registration />,
  },
  // Graduate routes
  {
    path: '/graduate',
    element: (
      <GraduateLayout>
        <GraduateDashboard />
      </GraduateLayout>
    ),
  },
  {
    path: '/graduate/profile',
    element: (
      <GraduateLayout>
        <GraduateProfile />
      </GraduateLayout>
    ),
  },
  {
    path: '/graduate/education',
    element: (
      <GraduateLayout>
        <GraduateEducation />
      </GraduateLayout>
    ),
  },
  {
    path: '/graduate/certificates',
    element: (
      <GraduateLayout>
        <GraduateCertificates />
      </GraduateLayout>
    ),
  },
  {
    path: '/graduate/jobs',
    element: (
      <GraduateLayout>
        <GraduateJobSearch />
      </GraduateLayout>
    ),
  },
  // Employer routes
  {
    path: '/employer',
    element: (
      <EmployerLayout>
        <EmployerDashboard />
      </EmployerLayout>
    ),
  },
  {
    path: '/employer/search',
    element: (
      <EmployerLayout>
        <GraduateSearch />
      </EmployerLayout>
    ),
  },
  // Admin routes
  {
    path: '/admin/dashboard',
    element: (
      <AdminLayout>
        <AdminDashboard />
      </AdminLayout>
    ),
  },
  {
    path: '/admin/employer-requests',
    element: (
      <AdminLayout>
        <EmployerRequests />
      </AdminLayout>
    ),
  },
  {
    path: '/admin/employers',
    element: (
      <AdminLayout>
        <Employers />
      </AdminLayout>
    ),
  },
  {
    path: '/admin/graduates',
    element: (
      <AdminLayout>
        <Graduates />
      </AdminLayout>
    ),
  },
  {
    path: '/admin/analytics',
    element: (
      <AdminLayout>
        <Analytics />
      </AdminLayout>
    ),
  },
  {
    path: '/admin/settings',
    element: (
      <AdminLayout>
        <Settings />
      </AdminLayout>
    ),
  },
  // Not Found route
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
