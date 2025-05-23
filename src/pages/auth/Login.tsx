import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

type UserType = 'graduate' | 'employer' | 'admin';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState<UserType>('graduate');
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  
  // Check for registration success message from query params
  useEffect(() => {
    if (location.state?.registrationSuccess) {
      setShowSuccessAlert(true);
      setUserType(location.state.userType || 'graduate');
      
      // Hide success message after 5 seconds
      const timer = setTimeout(() => {
        setShowSuccessAlert(false);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [location.state]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear error message when user types
    if (errorMessage) setErrorMessage('');
  };
  
  const validateForm = (): boolean => {
    if (!formData.email.trim()) {
      setErrorMessage('Email is required');
      return false;
    }
    
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setErrorMessage('Please enter a valid email');
      return false;
    }
    
    if (!formData.password) {
      setErrorMessage('Password is required');
      return false;
    }
    
    return true;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    setErrorMessage('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock authentication logic
      if (formData.email === 'graduate@example.com' && formData.password === 'password') {
        // Successfully logged in as graduate
        navigate('/graduate');
      } else if (formData.email === 'employer@example.com' && formData.password === 'password') {
        // Successfully logged in as employer
        navigate('/employer');
      } else if (formData.email === 'admin@example.com' && formData.password === 'password') {
        // Successfully logged in as admin
        navigate('/admin');
      } else {
        // Invalid credentials
        setErrorMessage('Invalid email or password');
      }
    } catch (error) {
      setErrorMessage('An error occurred during login. Please try again.');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-softgray p-4">
      <div className="w-full max-w-md">
        {showSuccessAlert && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded flex items-center animate-fade-in">
            <CheckCircle size={20} className="mr-2 flex-shrink-0" />
            <div>
              <p className="font-medium">Registration successful!</p>
              <p className="text-sm">Your {userType} account has been created. Please log in to continue.</p>
            </div>
          </div>
        )}
        
        <Card className="p-8">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-navyblue">Welcome Back</h1>
            <p className="text-gray-600 mt-2">Sign in to access your account</p>
          </div>
          
          {errorMessage && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded flex items-center">
              <AlertCircle size={20} className="mr-2 flex-shrink-0" />
              <p>{errorMessage}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Sign in as</label>
              <div className="flex space-x-4">
                <button
                  type="button"
                  className={`flex-1 py-2 px-3 rounded-md border text-sm font-medium focus:outline-none ${
                    userType === 'graduate' 
                      ? 'bg-lightblue text-white border-lightblue' 
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                  onClick={() => setUserType('graduate')}
                >
                  Graduate
                </button>
                <button
                  type="button"
                  className={`flex-1 py-2 px-3 rounded-md border text-sm font-medium focus:outline-none ${
                    userType === 'employer' 
                      ? 'bg-lightblue text-white border-lightblue' 
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                  onClick={() => setUserType('employer')}
                >
                  Employer
                </button>
                <button
                  type="button"
                  className={`flex-1 py-2 px-3 rounded-md border text-sm font-medium focus:outline-none ${
                    userType === 'admin' 
                      ? 'bg-lightblue text-white border-lightblue' 
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                  onClick={() => setUserType('admin')}
                >
                  Admin
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {userType === 'graduate' 
                  ? 'For graduates looking for opportunities' 
                  : userType === 'employer'
                    ? 'For employers looking to hire graduates'
                    : 'For platform administrators'
                }
              </p>
            </div>
            
            <Input
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              icon={<Mail size={18} />}
              placeholder="your@email.com"
              required
            />
            
            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                icon={<Lock size={18} />}
                placeholder="Enter your password"
                required
              />
              <button 
                type="button"
                className="absolute right-3 top-9 text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="w-4 h-4 text-lightblue rounded border-gray-300 focus:ring-lightblue"
                />
                <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-600">
                  Remember me
                </label>
              </div>
              
              <Link to="/auth/forgot-password" className="text-sm text-lightblue hover:underline">
                Forgot password?
              </Link>
            </div>
            
            <Button 
              type="submit" 
              className="w-full" 
              size="lg"
              isLoading={isLoading}
            >
              Sign In
            </Button>
            
            <div className="mt-4 text-center">
              <p className="text-gray-600 text-sm">
                Don't have an account?{' '}
                <Link to="/auth/register" className="text-lightblue hover:underline">
                  Register
                </Link>
              </p>
            </div>
          </form>
        </Card>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            For demo purposes: Use graduate@example.com, employer@example.com, or admin@example.com with password "password"
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
