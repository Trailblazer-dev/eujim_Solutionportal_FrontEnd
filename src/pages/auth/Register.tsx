import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import useAuth from '../../hooks/useAuth';
import { Home } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();
  const { register, registerEmployer, loading } = useAuth();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState<'graduate' | 'employer'>('graduate');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    location: '',
    university: '',
    course: '',
    graduationYear: '',
    skills: '',
    bio: '',
    agreeToTerms: false,
    companyName: '',
    industryType: '',
    companyWebsite: '',
    companySize: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submissionStatus, setSubmissionStatus] = useState<'success' | 'error' | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: (e.target as HTMLInputElement).checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};
    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Enter a valid email';
      if (!formData.password) newErrors.password = 'Password is required';
      else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
      if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    }
    if (step === 2) {
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
      if (!formData.location.trim()) newErrors.location = 'Location is required';
      if (userType === 'graduate') {
        if (!formData.university.trim()) newErrors.university = 'University is required';
        if (!formData.course.trim()) newErrors.course = 'Course is required';
        if (!formData.graduationYear.trim()) newErrors.graduationYear = 'Graduation year is required';
      }
      if (userType === 'employer') {
        if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required';
        if (!formData.industryType.trim()) newErrors.industryType = 'Industry type is required';
        if (!formData.companySize.trim()) newErrors.companySize = 'Company size is required';
      }
    }
    if (step === 3) {
      if (!formData.skills.trim()) newErrors.skills = 'Skills are required';
      if (!formData.bio.trim() || formData.bio.length < 30) newErrors.bio = 'Bio should be at least 30 characters';
      if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must accept the terms and conditions';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) setStep(step + 1);
  };
  const prevStep = () => setStep(step - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(3)) {
      setSubmissionStatus('success');
      
      try {
        const userData = {
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          password: formData.password,
          role: userType === 'graduate' ? 'jobseeker' : 'employer'
        };

        if (userType === 'graduate') {
          // Register as graduate
          await register(userData);
        } else {
          // Register as employer with additional company data
          const employerData = {
            ...userData,
            company_name: formData.companyName,
            company_description: formData.bio,
            industry: formData.industryType
          };
          await registerEmployer(employerData);
        }

        // Navigate to login page with success message
        navigate('/auth/login', { 
          state: { 
            registrationSuccess: true,
            userType
          }
        });
      } catch (error) {
        console.error('Registration error:', error);
        setSubmissionStatus('error');
        setErrors({ submit: 'Registration failed. Please try again.' });
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-softgray py-8 px-4">
      <div className="w-full max-w-lg mx-auto">
        <Card className="p-6 sm:p-8">
          <h1 className="text-2xl font-bold text-navyblue mb-4 text-center">{userType === 'graduate' ? 'Graduate Registration' : 'Employer Registration'}</h1>
          <div className="flex justify-center mb-6 gap-4">
            <Button
              type="button"
              variant={userType === 'graduate' ? 'default' : 'outline'}
              onClick={() => setUserType('graduate')}
            >
              Graduate
            </Button>
            <Button
              type="button"
              variant={userType === 'employer' ? 'default' : 'outline'}
              onClick={() => setUserType('employer')}
            >
              Employer
            </Button>
          </div>
          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="space-y-4">
                <Input label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} error={errors.firstName} required />
                <Input label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} error={errors.lastName} required />
                <Input label="Email" name="email" type="email" value={formData.email} onChange={handleChange} error={errors.email} required />
                <Input label="Password" name="password" type={showPassword ? 'text' : 'password'} value={formData.password} onChange={handleChange} error={errors.password} required />
                <Input label="Confirm Password" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} error={errors.confirmPassword} required />
                <div className="flex justify-end mt-6">
                  <Button type="button" onClick={nextStep}>Next</Button>
                </div>
              </div>
            )}
            {step === 2 && (
              <div className="space-y-4">
                <Input label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} error={errors.phone} required />
                <Input label="Location" name="location" value={formData.location} onChange={handleChange} error={errors.location} required />
                {userType === 'graduate' && (
                  <>
                    <Input label="University" name="university" value={formData.university} onChange={handleChange} error={errors.university} required />
                    <Input label="Course" name="course" value={formData.course} onChange={handleChange} error={errors.course} required />
                    <Input label="Graduation Year" name="graduationYear" value={formData.graduationYear} onChange={handleChange} error={errors.graduationYear} required />
                  </>
                )}
                {userType === 'employer' && (
                  <>
                    <Input label="Company Name" name="companyName" value={formData.companyName || ''} onChange={handleChange} error={errors.companyName} required />
                    <Input label="Industry Type" name="industryType" value={formData.industryType || ''} onChange={handleChange} error={errors.industryType} required />
                    <Input label="Company Website" name="companyWebsite" value={formData.companyWebsite || ''} onChange={handleChange} error={errors.companyWebsite} />
                    <Input label="Company Size" name="companySize" value={formData.companySize || ''} onChange={handleChange} error={errors.companySize} required />
                  </>
                )}
                <div className="flex justify-between mt-6">
                  <Button type="button" variant="outline" onClick={prevStep}>Back</Button>
                  <Button type="button" onClick={nextStep}>Next</Button>
                </div>
              </div>
            )}
            {step === 3 && (
              <div className="space-y-4">
                <Input label="Skills (comma separated)" name="skills" value={formData.skills} onChange={handleChange} error={errors.skills} required />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bio <span className="text-red-500">*</span></label>
                  <textarea name="bio" value={formData.bio} onChange={handleChange} rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lightblue" required />
                  {errors.bio && <p className="mt-1 text-sm text-red-500">{errors.bio}</p>}
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="agreeToTerms" name="agreeToTerms" checked={formData.agreeToTerms} onChange={handleChange} className="h-4 w-4 text-lightblue focus:ring-lightblue border-gray-300 rounded" />
                  <label htmlFor="agreeToTerms" className="ml-2 block text-sm text-gray-700">I agree to the <a href="#" className="text-lightblue hover:underline">Terms of Service</a> and <a href="#" className="text-lightblue hover:underline">Privacy Policy</a></label>
                </div>
                {errors.agreeToTerms && <p className="mt-1 text-sm text-red-500">{errors.agreeToTerms}</p>}
                <div className="flex justify-between mt-6">
                  <Button type="button" variant="outline" onClick={prevStep}>Back</Button>
                  <Button type="submit" isLoading={loading || submissionStatus === 'success'}>Register</Button>
                </div>
                {errors.submit && (
                  <div className="mt-4 text-center text-red-600 font-semibold">{errors.submit}</div>
                )}
              </div>
            )}
            {submissionStatus === 'success' && (
              <div className="mt-6 text-center text-green-600 font-semibold">Registration successful!</div>
            )}
          </form>
        </Card>
        
        <div className="mt-6 flex justify-between items-center">
          <Link to="/auth/login" className="text-lightblue hover:underline text-sm">
            Already have an account? Sign In
          </Link>
          <Link to="/">
            <Button variant="outline" size="sm">
              <Home size={16} className="mr-2" /> Return to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
