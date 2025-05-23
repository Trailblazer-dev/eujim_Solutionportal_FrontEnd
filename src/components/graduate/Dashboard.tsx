import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Home, User, Briefcase, Bell, Settings, ChevronDown, Search, 
  BookOpen, Award, LogOut, MenuIcon, X
} from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';
import Input from '../common/Input';
import ProfileCard from './ProfileCard';
import JobListing from './JobListing';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  // Placeholder data
  const userProfile = {
    name: "Jane Smith",
    title: "Software Developer",
    location: "Nairobi, Kenya",
    bio: "Full-stack developer with 2+ years experience in React and Node.js. Passionate about building user-friendly web applications.",
    skills: ["React", "JavaScript", "Node.js", "TypeScript", "MongoDB", "UI/UX"],
    experience: "2+ years",
    socialLinks: {
      linkedin: "https://linkedin.com/in/janesmith",
      twitter: "https://twitter.com/janesmith",
    }
  };
  
  const jobListings = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "Tech Innovations",
      location: "Nairobi, Kenya",
      postedDate: "2023-05-15",
      jobType: "Full-time" as const,
      salary: "KES 80,000 - 120,000",
      description: "We're looking for a frontend developer experienced in React to join our growing team.",
      skills: ["React", "JavaScript", "CSS", "HTML"],
      featured: true
    },
    {
      id: 2,
      title: "UX Designer",
      company: "Design Studios",
      location: "Remote",
      postedDate: "2023-05-12",
      jobType: "Contract" as const,
      description: "Join our design team to create beautiful user experiences for our clients.",
      skills: ["Figma", "UI/UX", "Wireframing", "User Research"],
    }
  ];
  
  const notifications = [
    {
      id: 1,
      title: "New job match",
      message: "A new Frontend Developer position matches your profile",
      time: "2 hours ago",
      read: false
    },
    {
      id: 2,
      title: "Profile view",
      message: "Your profile was viewed by Tech Innovations",
      time: "Yesterday",
      read: true
    }
  ];
  
  const handleTabChange = (tab: string) => {
    // Navigate to separate routes for education and certificates
    if (tab === 'education') {
      navigate('/graduate/education');
      return;
    }
    if (tab === 'certificates') {
      navigate('/graduate/certificates');
      return;
    }
    if (tab === 'profile') {
      navigate('/graduate/profile');
      return;
    }
    
    // Handle other tabs within the dashboard
    setActiveTab(tab);
  };
  
  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-2">
                <h3 className="text-lg font-bold text-navyblue mb-4">Welcome back, {userProfile.name}!</h3>
                <p>Your profile completion: <span className="font-bold">85%</span></p>
                <div className="w-full bg-gray-200 rounded-full h-2.5 my-3">
                  <div className="bg-lightblue h-2.5 rounded-full" style={{width: '85%'}}></div>
                </div>
                <p className="text-sm text-gray-600 mb-4">Complete your profile to increase visibility to employers.</p>
                <Button variant="outline" size="sm" onClick={() => navigate('/graduate/profile')}>Complete Profile</Button>
              </Card>
              
              <Card>
                <h3 className="text-lg font-bold text-navyblue mb-4">Quick Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Profile views</span>
                    <span className="font-bold">24</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Job matches</span>
                    <span className="font-bold">8</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Applications</span>
                    <span className="font-bold">3</span>
                  </div>
                </div>
              </Card>
            </div>
            
            <h3 className="text-xl font-bold text-navyblue mt-8 mb-4">Recommended Jobs</h3>
            <div className="space-y-4">
              {jobListings.map(job => (
                <JobListing key={job.id} {...job} onApply={() => alert(`Applied to ${job.title}`)} />
              ))}
              <div className="text-center mt-4">
                <Button variant="outline" onClick={() => handleTabChange('jobs')}>View More Jobs</Button>
              </div>
            </div>
          </div>
        );
        
      case 'profile':
        // Redirect to dedicated profile page
        navigate('/graduate/profile');
        return null;
        
      case 'jobs':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-navyblue">Job Board</h2>
            
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <Input 
                  placeholder="Search jobs..." 
                  icon={<Search size={18} />}
                />
              </div>
              <div className="flex space-x-2">
                <Button variant="outline">
                  Filter <ChevronDown size={16} className="ml-1" />
                </Button>
                <Button variant="outline">
                  Sort <ChevronDown size={16} className="ml-1" />
                </Button>
              </div>
            </div>
            
            <div className="space-y-4">
              {jobListings.map(job => (
                <JobListing key={job.id} {...job} onApply={() => alert(`Applied to ${job.title}`)} />
              ))}
            </div>
          </div>
        );
        
      case 'notifications':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-navyblue">Notifications</h2>
            
            <Card className="p-0 divide-y divide-softgray">
              {notifications.map(notification => (
                <div key={notification.id} className={`p-4 ${!notification.read ? 'bg-softgray' : ''}`}>
                  <div className="flex justify-between">
                    <h4 className="font-bold text-navyblue">{notification.title}</h4>
                    <span className="text-xs text-gray-500">{notification.time}</span>
                  </div>
                  <p className="text-gray-600 mt-1">{notification.message}</p>
                </div>
              ))}
            </Card>
          </div>
        );
        
      case 'settings':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-navyblue">Account Settings</h2>
            
            <Card title="Personal Information">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input label="Full Name" value="Jane Smith" />
                  <Input label="Email" type="email" value="jane.smith@example.com" />
                  <Input label="Phone" value="+254 700 123456" />
                  <Input label="Location" value="Nairobi, Kenya" />
                </div>
                <Button>Update Information</Button>
              </div>
            </Card>
            
            <Card title="Password">
              <div className="space-y-4">
                <Input label="Current Password" type="password" />
                <Input label="New Password" type="password" />
                <Input label="Confirm New Password" type="password" />
                <Button>Change Password</Button>
              </div>
            </Card>
            
            <Card title="Notifications">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Email Notifications</h4>
                    <p className="text-sm text-gray-600">Receive job alerts and updates via email</p>
                  </div>
                  <div className="relative inline-block w-12 h-6 rounded-full bg-softgray cursor-pointer">
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">SMS Notifications</h4>
                    <p className="text-sm text-gray-600">Receive urgent alerts via SMS</p>
                  </div>
                  <div className="relative inline-block w-12 h-6 rounded-full bg-lightblue cursor-pointer">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>
                <Button>Save Preferences</Button>
              </div>
            </Card>
          </div>
        );
        
      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <div className="flex min-h-screen bg-softgray">
      {/* Sidebar - Desktop */}
      <div className="hidden md:flex flex-col w-64 bg-navyblue text-white">
        <div className="p-4 border-b border-gray-800">
          <h1 className="text-xl font-bold">Eujim Portal</h1>
        </div>
        
        <nav className="flex-1 pt-4">
          <ul>
            <li>
              <button 
                onClick={() => handleTabChange('home')}
                className={`flex items-center px-6 py-3 w-full ${activeTab === 'home' ? 'bg-lightblue bg-opacity-20 border-l-4 border-lightblue' : ''}`}
              >
                <Home size={18} className="mr-3" />
                <span>Dashboard</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleTabChange('profile')}
                className={`flex items-center px-6 py-3 w-full ${activeTab === 'profile' ? 'bg-lightblue bg-opacity-20 border-l-4 border-lightblue' : ''}`}
              >
                <User size={18} className="mr-3" />
                <span>My Profile</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleTabChange('jobs')}
                className={`flex items-center px-6 py-3 w-full ${activeTab === 'jobs' ? 'bg-lightblue bg-opacity-20 border-l-4 border-lightblue' : ''}`}
              >
                <Briefcase size={18} className="mr-3" />
                <span>Jobs</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleTabChange('education')}
                className={`flex items-center px-6 py-3 w-full ${activeTab === 'education' ? 'bg-lightblue bg-opacity-20 border-l-4 border-lightblue' : ''}`}
              >
                <BookOpen size={18} className="mr-3" />
                <span>Education</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleTabChange('certificates')}
                className={`flex items-center px-6 py-3 w-full ${activeTab === 'certificates' ? 'bg-lightblue bg-opacity-20 border-l-4 border-lightblue' : ''}`}
              >
                <Award size={18} className="mr-3" />
                <span>Certificates</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleTabChange('notifications')}
                className={`flex items-center px-6 py-3 w-full ${activeTab === 'notifications' ? 'bg-lightblue bg-opacity-20 border-l-4 border-lightblue' : ''}`}
              >
                <Bell size={18} className="mr-3" />
                <span>Notifications</span>
                <span className="ml-auto bg-lightblue rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  2
                </span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleTabChange('settings')}
                className={`flex items-center px-6 py-3 w-full ${activeTab === 'settings' ? 'bg-lightblue bg-opacity-20 border-l-4 border-lightblue' : ''}`}
              >
                <Settings size={18} className="mr-3" />
                <span>Settings</span>
              </button>
            </li>
          </ul>
        </nav>
        
        <div className="p-4 border-t border-gray-800">
          <button className="flex items-center text-gray-400 hover:text-white transition-colors">
            <LogOut size={18} className="mr-3" />
            <span>Logout</span>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-navyblue text-white z-20 px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold">Eujim Portal</h1>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-navyblue text-white z-10 pt-16">
          <nav className="p-4">
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => {
                    handleTabChange('home');
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center px-4 py-2 w-full rounded"
                >
                  <Home size={18} className="mr-3" />
                  <span>Dashboard</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    handleTabChange('profile');
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center px-4 py-2 w-full rounded"
                >
                  <User size={18} className="mr-3" />
                  <span>My Profile</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    handleTabChange('jobs');
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center px-4 py-2 w-full rounded"
                >
                  <Briefcase size={18} className="mr-3" />
                  <span>Jobs</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    handleTabChange('education');
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center px-4 py-2 w-full rounded"
                >
                  <BookOpen size={18} className="mr-3" />
                  <span>Education</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    handleTabChange('certificates');
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center px-4 py-2 w-full rounded"
                >
                  <Award size={18} className="mr-3" />
                  <span>Certificates</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    handleTabChange('notifications');
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center px-4 py-2 w-full rounded"
                >
                  <Bell size={18} className="mr-3" />
                  <span>Notifications</span>
                  <span className="ml-auto bg-lightblue rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    2
                  </span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    handleTabChange('settings');
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center px-4 py-2 w-full rounded"
                >
                  <Settings size={18} className="mr-3" />
                  <span>Settings</span>
                </button>
              </li>
              <li>
                <button className="flex items-center px-4 py-2 w-full rounded text-red-300">
                  <LogOut size={18} className="mr-3" />
                  <span>Logout</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
      
      {/* Main Content */}
      <div className="flex-1 md:ml-64">
        <div className="p-6 md:p-8 mt-14 md:mt-0">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
