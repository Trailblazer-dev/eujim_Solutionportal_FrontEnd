import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import GraduateDashboard from '../components/graduate/Dashboard';
import RegistrationForm from '../components/graduate/RegistrationForm';
import Profile from '../pages/graduate/Profile';
import NotFound from '../pages/common/NotFound';
import Education from '../pages/graduate/Education';
import Certificates from '../pages/graduate/Certificates';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
  },
  {
    path: '/graduate',
    children: [
      {
        path: '',
        element: <GraduateDashboard />,
      },
      {
        path: 'register',
        element: <RegistrationForm />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
      {
        path: 'education',
        element: <Education />,
      },
      {
        path: 'certificates',
        element: <Certificates />,
      }
    ]
  },
]);

export default router;
