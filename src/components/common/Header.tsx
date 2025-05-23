import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, User, Briefcase, BookOpen, Award, Bell, 
  Settings, LogOut, Search, Menu, X, Users, Building,
  LayoutDashboard, FileText, MessageSquare, BarChart3, Bookmark
} from 'lucide-react';
import Button from './Button';

type UserType = 'graduate' | 'employer' | 'admin' | 'guest';

interface NavItem {
  path: string;
  label: string;
  icon: JSX.Element;
  children?: {
    path: string;
    label: string;
    icon: JSX.Element;
  }[];
}

interface HeaderProps {
  userType: UserType;
  userName?: string;
  userAvatar?: string;
  notificationCount?: number;
  onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  userType = 'guest',
  userName = '',
  userAvatar = '',
  notificationCount = 0,
  onLogout = () => {}
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Close mobile menu and dropdowns when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);
  
  const toggleDropdown = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };
  
  const isActive = (path: string) => {
    return location.pathname === path || 
      (path !== '/' && location.pathname.startsWith(path));
  };
  
  // Navigation items for different user types
  const getNavItems = (): NavItem[] => {
    switch (userType) {
      case 'graduate':
        return [
          { path: '/graduate', label: 'Dashboard', icon: <Home size={18} /> },
          { path: '/graduate/jobs', label: 'Job Search', icon: <Briefcase size={18} /> },
          { path: '/graduate/profile', label: 'My Profile', icon: <User size={18} /> },
          { 
            path: '/graduate/education', 
            label: 'Education & Certificates', 
            icon: <BookOpen size={18} />,
            children: [
              { path: '/graduate/education', label: 'Education', icon: <BookOpen size={18} /> },
              { path: '/graduate/certificates', label: 'Certificates', icon: <Award size={18} /> }
            ]
          },
          { path: '/graduate/notifications', label: 'Notifications', icon: <Bell size={18} /> },
          { path: '/graduate/settings', label: 'Settings', icon: <Settings size={18} /> }
        ];
      case 'employer':
        return [
          { path: '/employer', label: 'Dashboard', icon: <Home size={18} /> },
          { path: '/employer/search', label: 'Graduate Search', icon: <Users size={18} /> },
          { 
            path: '/employer/jobs', 
            label: 'Jobs', 
            icon: <Briefcase size={18} />,
            children: [
              { path: '/employer/jobs', label: 'Job Listings', icon: <Briefcase size={18} /> },
              { path: '/employer/shortlisted', label: 'Shortlisted', icon: <Bookmark size={18} /> },
              { path: '/employer/applications', label: 'Applications', icon: <FileText size={18} /> }
            ]
          },
          { path: '/employer/messages', label: 'Messages', icon: <MessageSquare size={18} /> },
          { path: '/employer/analytics', label: 'Analytics', icon: <BarChart3 size={18} /> },
          { path: '/employer/settings', label: 'Settings', icon: <Settings size={18} /> }
        ];
      case 'admin':
        return [
          { path: '/admin/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
          { 
            path: '/admin/employer-requests', 
            label: 'Employers', 
            icon: <Building size={18} />,
            children: [
              { path: '/admin/employer-requests', label: 'Approval Requests', icon: <Building size={18} /> },
              { path: '/admin/employers', label: 'All Employers', icon: <Building size={18} /> }
            ]
          },
          { path: '/admin/graduates', label: 'Graduates', icon: <Users size={18} /> },
          { path: '/admin/analytics', label: 'Analytics', icon: <BarChart3 size={18} /> },
          { path: '/admin/settings', label: 'Settings', icon: <Settings size={18} /> }
        ];
      default:
        return [
          { path: '/', label: 'Home', icon: <Home size={18} /> },
          { path: '/auth/login', label: 'Login', icon: <User size={18} /> },
          { path: '/auth/register', label: 'Register', icon: <User size={18} /> }
        ];
    }
  };
  
  const navItems = getNavItems();
  
  return (
    <header className="bg-white shadow-sm sticky top-0 z-30">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to={userType === 'guest' ? '/' : `/${userType}`} className="flex items-center">
              <div className="w-8 h-8 bg-lightblue rounded flex items-center justify-center text-white mr-2">
                <span className="font-bold">E</span>
              </div>
              <span className="text-lg font-bold text-navyblue hidden sm:block">EUJIM Portal</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <div key={item.path} className="relative" ref={item.children ? dropdownRef : undefined}>
                {item.children ? (
                  // Dropdown menu
                  <div>
                    <button 
                      className={`flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 ${
                        item.children.some(child => isActive(child.path)) ? 'bg-gray-100' : ''
                      }`}
                      onClick={() => toggleDropdown(item.label)}
                    >
                      {item.icon}
                      <span className="ml-2">{item.label}</span>
                      <svg
                        className={`ml-2 h-4 w-4 transition-transform ${
                          activeDropdown === item.label ? 'transform rotate-180' : ''
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                    
                    {/* Dropdown content */}
                    {activeDropdown === item.label && (
                      <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                        <div className="py-1" role="menu" aria-orientation="vertical">
                          {item.children.map((child) => (
                            <Link
                              key={child.path}
                              to={child.path}
                              className={`block px-4 py-2 text-sm ${
                                isActive(child.path)
                                  ? 'bg-gray-100 text-navyblue'
                                  : 'text-gray-700 hover:bg-gray-100'
                              }`}
                              role="menuitem"
                            >
                              <div className="flex items-center">
                                {child.icon}
                                <span className="ml-2">{child.label}</span>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  // Regular menu item
                  <Link
                    to={item.path}
                    className={`flex items-center px-3 py-2 rounded-md ${
                      isActive(item.path)
                        ? 'bg-gray-100 text-navyblue'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {item.icon}
                    <span className="ml-2">{item.label}</span>
                    {item.label === 'Notifications' && notificationCount > 0 && (
                      <span className="ml-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {notificationCount}
                      </span>
                    )}
                  </Link>
                )}
              </div>
            ))}
          </nav>
          
          {/* User Menu (Desktop) */}
          {userType !== 'guest' && (
            <div className="hidden md:flex items-center">
              {/* Search (Optional) */}
              {userType !== 'admin' && (
                <button className="p-2 mr-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full">
                  <Search size={20} />
                </button>
              )}
              
              {/* Notifications */}
              <button className="p-2 mr-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full relative">
                <Bell size={20} />
                {notificationCount > 0 && (
                  <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
                    {notificationCount}
                  </span>
                )}
              </button>
              
              {/* User dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button 
                  className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md"
                  onClick={() => toggleDropdown('user')}
                >
                  <div className="h-8 w-8 rounded-full bg-gray-300 overflow-hidden">
                    {userAvatar ? (
                      <img src={userAvatar} alt="User" className="h-full w-full object-cover" />
                    ) : (
                      <div className="h-full w-full bg-lightblue text-white flex items-center justify-center">
                        {userName.substring(0, 1).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <span className="text-sm font-medium text-gray-700 hidden sm:block">
                    {userName || 'User'}
                  </span>
                </button>
                
                {activeDropdown === 'user' && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-1" role="menu" aria-orientation="vertical">
                      <Link
                        to={`/${userType}/profile`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        <div className="flex items-center">
                          <User size={16} className="mr-2" />
                          Profile
                        </div>
                      </Link>
                      <Link
                        to={`/${userType}/settings`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        <div className="flex items-center">
                          <Settings size={16} className="mr-2" />
                          Settings
                        </div>
                      </Link>
                      <div className="border-t border-gray-100 my-1"></div>
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                        role="menuitem"
                        onClick={onLogout}
                      >
                        <div className="flex items-center">
                          <LogOut size={16} className="mr-2" />
                          Logout
                        </div>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Guest buttons (Desktop) */}
          {userType === 'guest' && (
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/auth/login">
                <Button variant="outline" size="sm">Sign In</Button>
              </Link>
              <Link to="/auth/register">
                <Button size="sm">Register</Button>
              </Link>
            </div>
          )}
          
          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              aria-expanded={isMobileMenuOpen ? 'true' : 'false'}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {/* User info for logged-in users */}
            {userType !== 'guest' && (
              <div className="flex items-center space-x-3 px-3 py-2 border-b border-gray-200 mb-2">
                <div className="h-10 w-10 rounded-full bg-gray-300 overflow-hidden">
                  {userAvatar ? (
                    <img src={userAvatar} alt="User" className="h-full w-full object-cover" />
                  ) : (
                    <div className="h-full w-full bg-lightblue text-white flex items-center justify-center">
                      {userName.substring(0, 1).toUpperCase()}
                    </div>
                  )}
                </div>
                <div>
                  <div className="font-medium text-navyblue">{userName || 'User'}</div>
                  <div className="text-sm text-gray-500 capitalize">{userType}</div>
                </div>
              </div>
            )}
            
            {/* Navigation Items */}
            {navItems.map((item) => (
              <div key={item.path}>
                {item.children ? (
                  <div>
                    <button
                      className={`w-full flex items-center justify-between px-3 py-2 text-base font-medium rounded-md ${
                        item.children.some(child => isActive(child.path))
                          ? 'bg-gray-100 text-navyblue'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      onClick={() => toggleDropdown(item.label)}
                    >
                      <div className="flex items-center">
                        {item.icon}
                        <span className="ml-3">{item.label}</span>
                      </div>
                      <svg
                        className={`ml-2 h-5 w-5 transition-transform ${
                          activeDropdown === item.label ? 'transform rotate-180' : ''
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                    
                    {/* Dropdown items */}
                    {activeDropdown === item.label && (
                      <div className="mt-1 pl-4 border-l-2 border-gray-200 ml-6">
                        {item.children.map((child) => (
                          <Link
                            key={child.path}
                            to={child.path}
                            className={`flex items-center px-3 py-2 text-base font-medium rounded-md ${
                              isActive(child.path)
                                ? 'bg-gray-100 text-navyblue'
                                : 'text-gray-700 hover:bg-gray-100'
                            }`}
                          >
                            {child.icon}
                            <span className="ml-3">{child.label}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className={`flex items-center px-3 py-2 text-base font-medium rounded-md ${
                      isActive(item.path)
                        ? 'bg-gray-100 text-navyblue'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {item.icon}
                    <span className="ml-3">{item.label}</span>
                    {item.label === 'Notifications' && notificationCount > 0 && (
                      <span className="ml-auto bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {notificationCount}
                      </span>
                    )}
                  </Link>
                )}
              </div>
            ))}
            
            {/* Logout for logged-in users */}
            {userType !== 'guest' && (
              <button
                className="w-full flex items-center px-3 py-2 text-base font-medium text-red-600 hover:bg-red-50 rounded-md"
                onClick={onLogout}
              >
                <LogOut size={18} />
                <span className="ml-3">Logout</span>
              </button>
            )}
            
            {/* Guest buttons (Mobile) */}
            {userType === 'guest' && (
              <div className="pt-4 flex flex-col space-y-3 px-3">
                <Link to="/auth/login" className="w-full">
                  <Button variant="outline" className="w-full">Sign In</Button>
                </Link>
                <Link to="/auth/register" className="w-full">
                  <Button className="w-full">Register</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
