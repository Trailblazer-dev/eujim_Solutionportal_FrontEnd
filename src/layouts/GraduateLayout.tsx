import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Home, User, Briefcase, BookOpen, Award, X, LogOut
} from 'lucide-react';
import Header from '../components/common/Header';

interface GraduateLayoutProps {
  children: React.ReactNode;
}

const GraduateLayout: React.FC<GraduateLayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { path: '/graduate', icon: <Home size={18} />, label: 'Dashboard' },
    { path: '/graduate/jobs', icon: <Briefcase size={18} />, label: 'Job Search' },
    { path: '/graduate/profile', icon: <User size={18} />, label: 'My Profile' },
    { path: '/graduate/education', icon: <BookOpen size={18} />, label: 'Education' },
    { path: '/graduate/certificates', icon: <Award size={18} />, label: 'Certificates' },
  ];

  const isActive = (path: string) => {
    return location.pathname === path ||
      (path !== '/graduate' && location.pathname.startsWith(path));
  };

  const handleLogout = () => {
    navigate('/auth/login');
  };

  // Mock user data - in a real app this would come from auth context or state
  const user = {
    name: 'Jane Doe',
    avatar: '',
    notificationCount: 2
  };

  return (
    <div className="min-h-screen bg-softgray flex flex-col">
      {/* Reusable Header with navigation toggle for mobile */}
      <Header
        userType="graduate"
        userName={user.name}
        userAvatar={user.avatar}
        notificationCount={user.notificationCount}
        onLogout={handleLogout}
      />
      {/* Mobile navigation drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-40 flex">
          <nav className="bg-white w-64 max-w-full h-full shadow-lg p-6 animate-slideInLeft relative">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-navyblue"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
            <ul className="mt-8 space-y-4">
              {navigationItems.map(item => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center px-3 py-2 rounded-lg transition-colors duration-150 ${isActive(item.path) ? 'bg-lightblue text-white' : 'text-navyblue hover:bg-lightblue/10'}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.icon}
                    <span className="ml-3 font-medium">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <button
              className="mt-8 w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition"
              onClick={handleLogout}
            >
              <LogOut size={18} /> Logout
            </button>
          </nav>
          {/* Click outside to close */}
          <div className="flex-1" onClick={() => setIsMobileMenuOpen(false)} />
        </div>
      )}
      {/* Desktop navigation bar below header */}
      <nav className="hidden md:flex justify-center bg-white shadow-sm border-b border-gray-100">
        <ul className="flex gap-2 py-2">
          {navigationItems.map(item => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center px-4 py-2 rounded-lg transition-colors duration-150 ${isActive(item.path) ? 'bg-lightblue text-white' : 'text-navyblue hover:bg-lightblue/10'}`}
              >
                {item.icon}
                <span className="ml-2 font-medium">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      {/* Main content area */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-2 sm:px-6 py-6">
        {children}
      </main>
    </div>
  );
};

export default GraduateLayout;
