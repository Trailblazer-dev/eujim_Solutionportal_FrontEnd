import { useState, useEffect } from 'react';
import { User, Phone, Mail, MapPin, Pencil, Save, Plus, AlertCircle, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import ProfileCard from '../../components/graduate/ProfileCard';

// Define types for education, certification, and experience
interface Education {
  id: number;
  degree: string;
  institution: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Certification {
  id: number;
  title: string;
  issuingOrganization: string;
  issueDate: string;
  expiryDate: string;
  credentialId: string;
}

interface WorkExperience {
  id: number;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface UserData {
  name: string;
  email: string;
  phone: string;
  profileImage: string;
  title: string;
  location: string;
  bio: string;
  skills: string[];
  experience: string;
  socialLinks: {
    linkedin: string;
    twitter: string;
  };
  education: Education[];
  certifications: Certification[];
  workExperience: WorkExperience[];
}

// Mock user data
const mockUser: UserData = {
  name: "Jane Doe",
  email: "jane.doe@example.com",
  phone: "+254 712 345 678",
  profileImage: "",
  title: "Junior Software Developer",
  location: "Nairobi, Kenya",
  bio: "Recent Computer Science graduate with a passion for frontend development and UI design. Seeking opportunities to apply my skills in a collaborative team environment.",
  skills: ["JavaScript", "React", "HTML/CSS", "UI/UX", "TypeScript", "Git"],
  experience: "1 year",
  socialLinks: {
    linkedin: "https://linkedin.com/in/janedoe",
    twitter: "https://twitter.com/janedoe",
  },
  education: [
    {
      id: 1,
      degree: "Bachelor of Science in Computer Science",
      institution: "University of Nairobi",
      startDate: "2019-09-01",
      endDate: "2023-06-30",
      description: "Graduated with First Class Honors. Final project: AI-powered task management system."
    }
  ],
  certifications: [
    {
      id: 1,
      title: "React Developer Certification",
      issuingOrganization: "Meta",
      issueDate: "2023-08-15",
      expiryDate: "2026-08-15",
      credentialId: "REACT-123456"
    },
    {
      id: 2,
      title: "AWS Cloud Practitioner",
      issuingOrganization: "Amazon Web Services",
      issueDate: "2023-04-10",
      expiryDate: "2026-04-10",
      credentialId: "AWS-789012"
    }
  ],
  workExperience: [
    {
      id: 1,
      title: "Frontend Developer Intern",
      company: "Tech Solutions Ltd",
      location: "Nairobi, Kenya",
      startDate: "2022-05-01",
      endDate: "2022-08-31",
      description: "Developed responsive web interfaces using React and assisted in implementing new features."
    }
  ]
};

const Profile = () => {
  const [userData, setUserData] = useState<UserData>(mockUser);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<UserData>(mockUser);
  
  // New states for improved UI/UX
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  
  // Clear success message after timeout
  useEffect(() => {
    if (showSuccessMessage) {
      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessMessage]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
    
    // Clear validation error when field is edited
    if (validationErrors[name]) {
      setValidationErrors({
        ...validationErrors,
        [name]: ''
      });
    }
  };

  const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const skills = e.target.value.split(',').map(skill => skill.trim());
    setEditData({ ...editData, skills });
  };

  const validateProfileData = () => {
    const errors: Record<string, string> = {};
    
    if (!editData.name.trim()) errors.name = 'Name is required';
    if (!editData.email.trim()) errors.email = 'Email is required';
    if (!editData.email.includes('@')) errors.email = 'Please enter a valid email';
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const saveChanges = async () => {
    if (!validateProfileData()) return;
    
    setIsSaving(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      setUserData(editData);
      setIsEditing(false);
      setShowSuccessMessage(true);
    } catch (error) {
      console.error('Error saving profile:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-softgray p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>
      
      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded flex items-center shadow-md animate-fade-in z-50">
          <CheckCircle size={18} className="mr-2" />
          <span>Changes saved successfully!</span>
        </div>
      )}

      {isEditing ? (
        <Card>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-navyblue">Edit Profile</h2>
            <div className="space-x-2">
              <Button variant="outline" onClick={() => {
                setIsEditing(false);
                setEditData(userData);
                setValidationErrors({});
              }}>Cancel</Button>
              <Button onClick={saveChanges} isLoading={isSaving}>
                {!isSaving && <Save size={16} className="mr-2" />}
                Save Changes
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="font-semibold text-navyblue">Personal Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Input
                  label="Full Name"
                  name="name"
                  value={editData.name}
                  onChange={handleInputChange}
                  icon={<User size={18} />}
                  error={validationErrors.name}
                  required
                />
                {validationErrors.name && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertCircle size={14} className="mr-1" />
                    {validationErrors.name}
                  </p>
                )}
              </div>
              
              <div>
                <Input
                  label="Job Title"
                  name="title"
                  value={editData.title || ''}
                  onChange={handleInputChange}
                  icon={<Pencil size={18} />}
                />
              </div>
              
              <div>
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={editData.email}
                  onChange={handleInputChange}
                  icon={<Mail size={18} />}
                  error={validationErrors.email}
                  required
                />
                {validationErrors.email && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertCircle size={14} className="mr-1" />
                    {validationErrors.email}
                  </p>
                )}
              </div>
              
              <Input
                label="Phone"
                name="phone"
                value={editData.phone || ''}
                onChange={handleInputChange}
                icon={<Phone size={18} />}
              />
              
              <Input
                label="Location"
                name="location"
                value={editData.location || ''}
                onChange={handleInputChange}
                icon={<MapPin size={18} />}
              />
              
              <Input
                label="Experience"
                name="experience"
                value={editData.experience || ''}
                onChange={handleInputChange}
                placeholder="e.g., 2+ years"
              />
            </div>

            <div>
              <label className="block text-navyblue font-medium mb-1">
                Bio
              </label>
              <textarea
                name="bio"
                value={editData.bio || ''}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-2 rounded-md border border-softgray focus:outline-none focus:ring-2 focus:ring-lightblue focus:border-transparent"
                placeholder="Tell us about yourself, your experience, and career goals..."
              ></textarea>
            </div>

            <div>
              <label className="block text-navyblue font-medium mb-1">
                Skills (comma-separated)
              </label>
              <Input
                name="skills"
                value={editData.skills.join(', ')}
                onChange={handleSkillsChange}
                placeholder="e.g., JavaScript, React, Node.js"
              />
              <p className="text-sm text-gray-500 mt-1">Add your technical and soft skills, separated by commas</p>
            </div>

            <h3 className="font-semibold text-navyblue pt-4">Social Links</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="LinkedIn URL"
                name="linkedinUrl"
                value={editData.socialLinks?.linkedin || ''}
                onChange={(e) => setEditData({
                  ...editData,
                  socialLinks: { ...editData.socialLinks, linkedin: e.target.value }
                })}
                placeholder="https://linkedin.com/in/username"
              />
              <Input
                label="Twitter URL"
                name="twitterUrl"
                value={editData.socialLinks?.twitter || ''}
                onChange={(e) => setEditData({
                  ...editData,
                  socialLinks: { ...editData.socialLinks, twitter: e.target.value }
                })}
                placeholder="https://twitter.com/username"
              />
            </div>
          </div>
        </Card>
      ) : (
        <ProfileCard 
          {...userData}
          onEdit={() => setIsEditing(true)}
        />
      )}
      
      {/* Education Section */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Education</h2>
          <Link to="/graduate/education">
            <Button variant="outline" size="sm">
              <Plus size={16} className="mr-1" /> Manage Education
            </Button>
          </Link>
        </div>
        
        {userData.education.length > 0 ? (
          <div className="space-y-4">
            {userData.education.map((edu) => (
              <Card key={edu.id} className="relative hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-start">
                  <div className="mr-4 p-2 bg-softgray rounded-full">
                    <Plus size={24} className="text-navyblue" />
                  </div>
                  <div>
                    <h3 className="font-bold text-navyblue">{edu.degree}</h3>
                    <p className="text-gray-600">{edu.institution}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(edu.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })} - 
                      {edu.endDate ? new Date(edu.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : 'Present'}
                    </p>
                    {edu.description && <p className="mt-2 text-gray-700">{edu.description}</p>}
                  </div>
                </div>
              </Card>
            ))}
            <div className="text-center">
              <Link to="/graduate/education">
                <Button variant="outline">View All Education</Button>
              </Link>
            </div>
          </div>
        ) : (
          <Card>
            <div className="text-center py-8">
              <Plus size={32} className="mx-auto text-gray-400 mb-2" />
              <p className="text-gray-600 mb-3">No education details added yet</p>
              <Link to="/graduate/education">
                <Button>
                  <Plus size={16} className="mr-1" /> Add Education
                </Button>
              </Link>
            </div>
          </Card>
        )}
      </div>
      
      {/* Certifications Section */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Certifications</h2>
          <Link to="/graduate/certificates">
            <Button variant="outline" size="sm">
              <Plus size={16} className="mr-1" /> Manage Certifications
            </Button>
          </Link>
        </div>
        
        {userData.certifications.length > 0 ? (
          <div className="space-y-4">
            {userData.certifications.map((cert) => (
              <Card key={cert.id} className="relative hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-start">
                  <div className="mr-4 p-2 bg-softgray rounded-full">
                    <Plus size={24} className="text-navyblue" />
                  </div>
                  <div>
                    <h3 className="font-bold text-navyblue">{cert.title}</h3>
                    <p className="text-gray-600">{cert.issuingOrganization}</p>
                    <p className="text-sm text-gray-500">
                      Issued: {new Date(cert.issueDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                      {cert.expiryDate && ` • Expires: ${new Date(cert.expiryDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}`}
                    </p>
                    {cert.credentialId && <p className="text-sm text-gray-500">Credential ID: {cert.credentialId}</p>}
                  </div>
                </div>
              </Card>
            ))}
            <div className="text-center">
              <Link to="/graduate/certificates">
                <Button variant="outline">View All Certifications</Button>
              </Link>
            </div>
          </div>
        ) : (
          <Card>
            <div className="text-center py-8">
              <Plus size={32} className="mx-auto text-gray-400 mb-2" />
              <p className="text-gray-600 mb-3">No certifications added yet</p>
              <Link to="/graduate/certificates">
                <Button>
                  <Plus size={16} className="mr-1" /> Add Certification
                </Button>
              </Link>
            </div>
          </Card>
        )}
      </div>
      
      {/* Work Experience Section */}
      <div className="mt-8 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Work Experience</h2>
          <Button variant="outline" size="sm">
            <Plus size={16} className="mr-1" /> Add Experience
          </Button>
        </div>
        
        {userData.workExperience.length > 0 ? (
          <div className="space-y-4">
            {userData.workExperience.map((exp) => (
              <Card key={exp.id} className="relative hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-start">
                  <div className="mr-4 p-2 bg-softgray rounded-full">
                    <Plus size={24} className="text-navyblue" />
                  </div>
                  <div>
                    <h3 className="font-bold text-navyblue">{exp.title}</h3>
                    <p className="text-gray-600">{exp.company}</p>
                    <p className="text-sm text-gray-500">{exp.location}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(exp.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })} - 
                      {exp.endDate ? new Date(exp.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : 'Present'}
                    </p>
                    {exp.description && <p className="mt-2 text-gray-700">{exp.description}</p>}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <div className="text-center py-8">
              <Plus size={32} className="mx-auto text-gray-400 mb-2" />
              <p className="text-gray-600 mb-3">No work experience added yet</p>
              <Button>
                <Plus size={16} className="mr-1" /> Add Experience
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Profile;

// All styles are handled via Tailwind CSS classes or external CSS. No inline styles present.
