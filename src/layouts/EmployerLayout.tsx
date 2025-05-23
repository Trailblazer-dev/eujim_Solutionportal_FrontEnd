import { useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';

interface EmployerLayoutProps {
  children: React.ReactNode;
}

const EmployerLayout = ({ children }: EmployerLayoutProps) => {
  const navigate = useNavigate();

  // Mock user data (replace with real data from context or state in production)
  const user = {
    name: 'Tech Solutions Ltd',
    avatar: '',
    notificationCount: 3
  };

  const handleLogout = () => {
    // Add logout logic here (e.g., clear tokens, reset state)
    navigate('/auth/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Reusable Header for employer navigation */}
      <Header
        userType="employer"
        userName={user.name}
        userAvatar={user.avatar}
        notificationCount={user.notificationCount}
        onLogout={handleLogout}
      />
      {/* Main content area */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-2 sm:px-6 py-6 pt-20">
        {children}
      </main>
    </div>
  );
};

export default EmployerLayout;
