import { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff, ChevronRight, ChevronLeft } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';
import Input from '../common/Input';

const RegistrationForm = () => {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
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
    skills: [] as string[],
    bio: '',
    agreeToTerms: false
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: (e.target as HTMLInputElement).checked
      });
    } else if (name === 'skills') {
      const skillsArray = value.split(',').map(skill => skill.trim());
      setFormData({
        ...formData,
        skills: skillsArray
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  
  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted with data:', formData);
    // Redirect to dashboard or show success message
  };

  // Render different form steps
  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <>
            <h2 className="text-2xl font-bold text-navyblue mb-6">Create Your Account</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <Input
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                icon={<Mail size={18} />}
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
                  required
                />
                <button 
                  type="button"
                  className="absolute right-3 top-9 text-gray-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              
              <Input
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              
              <div className="flex items-center mt-6">
                <input
                  type="checkbox"
                  id="agreeToTerms"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className="w-4 h-4 text-lightblue"
                />
                <label htmlFor="agreeToTerms" className="ml-2 text-sm">
                  I agree to the <a href="#" className="text-lightblue">Terms of Service</a> and <a href="#" className="text-lightblue">Privacy Policy</a>
                </label>
              </div>
              
              <div className="flex justify-end">
                <Button onClick={nextStep}>
                  Next <ChevronRight size={16} className="ml-1" />
                </Button>
              </div>
            </div>
          </>
        );
        
      case 2:
        return (
          <>
            <h2 className="text-2xl font-bold text-navyblue mb-6">Personal Information</h2>
            <div className="space-y-4">
              <Input
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
              
              <Input
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="City, Country"
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="University/Institution"
                  name="university"
                  value={formData.university}
                  onChange={handleChange}
                />
                
                <Input
                  label="Course/Degree"
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                />
              </div>
              
              <Input
                label="Graduation Year"
                type="number"
                name="graduationYear"
                value={formData.graduationYear}
                onChange={handleChange}
                placeholder="YYYY"
              />
              
              <div className="flex justify-between">
                <Button variant="outline" onClick={prevStep}>
                  <ChevronLeft size={16} className="mr-1" /> Back
                </Button>
                <Button onClick={nextStep}>
                  Next <ChevronRight size={16} className="ml-1" />
                </Button>
              </div>
            </div>
          </>
        );
        
      case 3:
        return (
          <>
            <h2 className="text-2xl font-bold text-navyblue mb-6">Skills & Bio</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-navyblue font-medium mb-1">
                  Skills (comma separated)
                </label>
                <input
                  type="text"
                  name="skills"
                  value={formData.skills.join(', ')}
                  onChange={handleChange}
                  placeholder="e.g., JavaScript, React, Node.js"
                  className="w-full px-4 py-2 rounded-md border border-softgray focus:outline-none focus:ring-2 focus:ring-lightblue focus:border-transparent"
                />
                <p className="text-sm text-gray-500 mt-1">Add your technical and soft skills, separated by commas</p>
              </div>
              
              <div>
                <label className="block text-navyblue font-medium mb-1">
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Tell us a little about yourself, your experience, and career goals..."
                  className="w-full px-4 py-2 rounded-md border border-softgray focus:outline-none focus:ring-2 focus:ring-lightblue focus:border-transparent"
                ></textarea>
              </div>
              
              <div className="flex justify-between mt-6">
                <Button variant="outline" onClick={prevStep}>
                  <ChevronLeft size={16} className="mr-1" /> Back
                </Button>
                <Button onClick={handleSubmit}>
                  Complete Registration
                </Button>
              </div>
            </div>
          </>
        );
        
      default:
        return <div>Unknown step</div>;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-softgray p-4">
      <Card className="max-w-lg w-full">
        <div className="mb-6">
          <div className="flex items-center justify-center mb-4">
            <div className="text-2xl font-bold text-navyblue">Eujim Solution Portal</div>
          </div>
          <div className="flex items-center justify-center">
            <div className="flex items-center">
              <div className={`rounded-full h-8 w-8 flex items-center justify-center ${step >= 1 ? 'bg-lightblue text-white' : 'bg-softgray text-gray-500'}`}>
                1
              </div>
              <div className={`h-1 w-8 ${step >= 2 ? 'bg-lightblue' : 'bg-softgray'}`}></div>
              <div className={`rounded-full h-8 w-8 flex items-center justify-center ${step >= 2 ? 'bg-lightblue text-white' : 'bg-softgray text-gray-500'}`}>
                2
              </div>
              <div className={`h-1 w-8 ${step >= 3 ? 'bg-lightblue' : 'bg-softgray'}`}></div>
              <div className={`rounded-full h-8 w-8 flex items-center justify-center ${step >= 3 ? 'bg-lightblue text-white' : 'bg-softgray text-gray-500'}`}>
                3
              </div>
            </div>
          </div>
        </div>
        
        <form>
          {renderStep()}
        </form>
      </Card>
    </div>
  );
};

export default RegistrationForm;
