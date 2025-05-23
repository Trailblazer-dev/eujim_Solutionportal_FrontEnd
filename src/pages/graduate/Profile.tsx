import { useState, useEffect } from 'react';
import { User, Phone, Mail, MapPin, Calendar, Building, Book, Award, Pencil, Save, Plus, Loader, AlertCircle, CheckCircle } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Modal from '../../components/common/Modal';
import ProfileCard from '../../components/graduate/ProfileCard';

// Mock user data
const mockUser = {
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
  const [userData, setUserData] = useState(mockUser);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(mockUser);
  
  const [showEducationModal, setShowEducationModal] = useState(false);
  const [showCertificationModal, setShowCertificationModal] = useState(false);
  const [showExperienceModal, setShowExperienceModal] = useState(false);
  
  const [currentEducation, setCurrentEducation] = useState<any>(null);
  const [currentCertification, setCurrentCertification] = useState<any>(null);
  const [currentExperience, setCurrentExperience] = useState<any>(null);
  
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

  // Education handlers
  const openEducationModal = (education = null) => {
    setCurrentEducation(education ? { ...education } : {
      id: null,
      degree: '',
      institution: '',
      startDate: '',
      endDate: '',
      description: ''
    });
    setValidationErrors({});
    setShowEducationModal(true);
  };

  const validateEducationData = () => {
    const education = currentEducation;
    const errors: Record<string, string> = {};
    
    if (!education.degree?.trim()) errors.degree = 'Degree is required';
    if (!education.institution?.trim()) errors.institution = 'Institution is required';
    if (!education.startDate) errors.startDate = 'Start date is required';
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const saveEducation = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEducationData()) return;
    
    setIsSaving(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (currentEducation.id) {
        // Update existing education
        const updatedEducation = userData.education.map(edu => 
          edu.id === currentEducation.id ? { ...currentEducation } : edu
        );
        setUserData({ ...userData, education: updatedEducation });
      } else {
        // Add new education
        const newEducation = { ...currentEducation, id: Date.now() };
        setUserData({ ...userData, education: [...userData.education, newEducation] });
      }
      
      setShowEducationModal(false);
      setShowSuccessMessage(true);
    } catch (error) {
      console.error('Error saving education:', error);
    } finally {
      setIsSaving(false);
    }
  };

  // Certification handlers with improved validation
  const openCertificationModal = (certification = null) => {
    setCurrentCertification(certification ? { ...certification } : {
      id: null,
      title: '',
      issuingOrganization: '',
      issueDate: '',
      expiryDate: '',
      credentialId: ''
    });
    setValidationErrors({});
    setShowCertificationModal(true);
  };

  const validateCertificationData = () => {
    const certification = currentCertification;
    const errors: Record<string, string> = {};
    
    if (!certification.title?.trim()) errors.title = 'Title is required';
    if (!certification.issuingOrganization?.trim()) errors.issuingOrganization = 'Issuing organization is required';
    if (!certification.issueDate) errors.issueDate = 'Issue date is required';
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const saveCertification = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateCertificationData()) return;
    
    setIsSaving(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (currentCertification.id) {
        // Update existing certification
        const updatedCertifications = userData.certifications.map(cert => 
          cert.id === currentCertification.id ? { ...currentCertification } : cert
        );
        setUserData({ ...userData, certifications: updatedCertifications });
      } else {
        // Add new certification
        const newCertification = { ...currentCertification, id: Date.now() };
        setUserData({ ...userData, certifications: [...userData.certifications, newCertification] });
      }
      
      setShowCertificationModal(false);
      setShowSuccessMessage(true);
    } catch (error) {
      console.error('Error saving certification:', error);
    } finally {
      setIsSaving(false);
    }
  };

  // Experience handlers with improved validation
  const openExperienceModal = (experience = null) => {
    setCurrentExperience(experience ? { ...experience } : {
      id: null,
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      description: ''
    });
    setValidationErrors({});
    setShowExperienceModal(true);
  };

  const validateExperienceData = () => {
    const experience = currentExperience;
    const errors: Record<string, string> = {};
    
    if (!experience.title?.trim()) errors.title = 'Job title is required';
    if (!experience.company?.trim()) errors.company = 'Company is required';
    if (!experience.startDate) errors.startDate = 'Start date is required';
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const saveExperience = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateExperienceData()) return;
    
    setIsSaving(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (currentExperience.id) {
        // Update existing experience
        const updatedExperiences = userData.workExperience.map(exp => 
          exp.id === currentExperience.id ? { ...currentExperience } : exp
        );
        setUserData({ ...userData, workExperience: updatedExperiences });
      } else {
        // Add new experience
        const newExperience = { ...currentExperience, id: Date.now() };
        setUserData({ ...userData, workExperience: [...userData.workExperience, newExperience] });
      }
      
      setShowExperienceModal(false);
      setShowSuccessMessage(true);
    } catch (error) {
      console.error('Error saving experience:', error);
    } finally {
      setIsSaving(false);
    }
  };
  
  // Helper function to handle form input changes in modals
  const handleModalInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, setterFunction: Function) => {
    const { name, value } = e.target;
    setterFunction((prev: any) => ({ ...prev, [name]: value }));
    
    // Clear validation error when field is edited
    if (validationErrors[name]) {
      setValidationErrors({
        ...validationErrors,
        [name]: ''
      });
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
          <Button variant="outline" size="sm" onClick={() => openEducationModal()}>
            <Plus size={16} className="mr-1" /> Add Education
          </Button>
        </div>
        
        {userData.education.length > 0 ? (
          <div className="space-y-4">
            {userData.education.map((edu) => (
              <Card key={edu.id} className="relative hover:shadow-lg transition-shadow duration-200">
                <button 
                  className="absolute top-4 right-4 text-gray-400 hover:text-lightblue p-1 rounded-full hover:bg-gray-100"
                  onClick={() => openEducationModal(edu)}
                  aria-label="Edit education"
                >
                  <Pencil size={16} />
                </button>
                
                <div className="flex items-start">
                  <div className="mr-4 p-2 bg-softgray rounded-full">
                    <Book size={24} className="text-navyblue" />
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
          </div>
        ) : (
          <Card>
            <div className="text-center py-8">
              <Book size={32} className="mx-auto text-gray-400 mb-2" />
              <p className="text-gray-600 mb-3">No education details added yet</p>
              <Button onClick={() => openEducationModal()}>
                <Plus size={16} className="mr-1" /> Add Education
              </Button>
            </div>
          </Card>
        )}
      </div>
      
      {/* Certifications Section */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Certifications</h2>
          <Button variant="outline" size="sm" onClick={() => openCertificationModal()}>
            <Plus size={16} className="mr-1" /> Add Certification
          </Button>
        </div>
        
        {userData.certifications.length > 0 ? (
          <div className="space-y-4">
            {userData.certifications.map((cert) => (
              <Card key={cert.id} className="relative hover:shadow-lg transition-shadow duration-200">
                <button 
                  className="absolute top-4 right-4 text-gray-400 hover:text-lightblue p-1 rounded-full hover:bg-gray-100"
                  onClick={() => openCertificationModal(cert)}
                  aria-label="Edit certification"
                >
                  <Pencil size={16} />
                </button>
                
                <div className="flex items-start">
                  <div className="mr-4 p-2 bg-softgray rounded-full">
                    <Award size={24} className="text-navyblue" />
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
          </div>
        ) : (
          <Card>
            <div className="text-center py-8">
              <Award size={32} className="mx-auto text-gray-400 mb-2" />
              <p className="text-gray-600 mb-3">No certifications added yet</p>
              <Button onClick={() => openCertificationModal()}>
                <Plus size={16} className="mr-1" /> Add Certification
              </Button>
            </div>
          </Card>
        )}
      </div>
      
      {/* Work Experience Section */}
      <div className="mt-8 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Work Experience</h2>
          <Button variant="outline" size="sm" onClick={() => openExperienceModal()}>
            <Plus size={16} className="mr-1" /> Add Experience
          </Button>
        </div>
        
        {userData.workExperience.length > 0 ? (
          <div className="space-y-4">
            {userData.workExperience.map((exp) => (
              <Card key={exp.id} className="relative hover:shadow-lg transition-shadow duration-200">
                <button 
                  className="absolute top-4 right-4 text-gray-400 hover:text-lightblue p-1 rounded-full hover:bg-gray-100"
                  onClick={() => openExperienceModal(exp)}
                  aria-label="Edit experience"
                >
                  <Pencil size={16} />
                </button>
                
                <div className="flex items-start">
                  <div className="mr-4 p-2 bg-softgray rounded-full">
                    <Building size={24} className="text-navyblue" />
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
              <Building size={32} className="mx-auto text-gray-400 mb-2" />
              <p className="text-gray-600 mb-3">No work experience added yet</p>
              <Button onClick={() => openExperienceModal()}>
                <Plus size={16} className="mr-1" /> Add Experience
              </Button>
            </div>
          </Card>
        )}
      </div>
      
      {/* Education Modal */}
      <Modal
        isOpen={showEducationModal}
        onClose={() => setShowEducationModal(false)}
        title={currentEducation?.id ? "Edit Education" : "Add Education"}
        footer={
          <>
            <Button 
              variant="outline" 
              onClick={() => setShowEducationModal(false)}
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button 
              onClick={saveEducation} 
              isLoading={isSaving}
            >
              {currentEducation?.id ? 'Update' : 'Save'}
            </Button>
          </>
        }
      >
        <form onSubmit={saveEducation}>
          <div className="space-y-4">
            <div>
              <label htmlFor="degree" className="block text-sm font-medium text-gray-700 mb-1 required">
                Degree/Course <span className="text-red-500">*</span>
              </label>
              <input
                id="degree"
                type="text"
                name="degree"
                value={currentEducation?.degree || ""}
                onChange={(e) => handleModalInputChange(e, setCurrentEducation)}
                className={`w-full px-4 py-2 rounded-md border ${validationErrors.degree ? 'border-red-500 focus:ring-red-500' : 'border-softgray focus:ring-lightblue'} focus:outline-none focus:ring-2 focus:border-transparent`}
                required
              />
              {validationErrors.degree && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle size={14} className="mr-1" />
                  {validationErrors.degree}
                </p>
              )}
            </div>
            
            <div>
              <label htmlFor="institution" className="block text-sm font-medium text-gray-700 mb-1">
                Institution <span className="text-red-500">*</span>
              </label>
              <input
                id="institution"
                type="text"
                name="institution"
                value={currentEducation?.institution || ""}
                onChange={(e) => handleModalInputChange(e, setCurrentEducation)}
                className={`w-full px-4 py-2 rounded-md border ${validationErrors.institution ? 'border-red-500 focus:ring-red-500' : 'border-softgray focus:ring-lightblue'} focus:outline-none focus:ring-2 focus:border-transparent`}
                required
              />
              {validationErrors.institution && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle size={14} className="mr-1" />
                  {validationErrors.institution}
                </p>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date <span className="text-red-500">*</span>
                </label>
                <input
                  id="startDate"
                  type="date"
                  name="startDate"
                  value={currentEducation?.startDate || ""}
                  onChange={(e) => handleModalInputChange(e, setCurrentEducation)}
                  className={`w-full px-4 py-2 rounded-md border ${validationErrors.startDate ? 'border-red-500 focus:ring-red-500' : 'border-softgray focus:ring-lightblue'} focus:outline-none focus:ring-2 focus:border-transparent`}
                  required
                />
                {validationErrors.startDate && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertCircle size={14} className="mr-1" />
                    {validationErrors.startDate}
                  </p>
                )}
              </div>
              
              <div>
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                  End Date (or expected)
                </label>
                <input
                  id="endDate"
                  type="date"
                  name="endDate"
                  value={currentEducation?.endDate || ""}
                  onChange={(e) => handleModalInputChange(e, setCurrentEducation)}
                  className="w-full px-4 py-2 rounded-md border border-softgray focus:outline-none focus:ring-2 focus:ring-lightblue focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">Leave blank if currently studying</p>
              </div>
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={currentEducation?.description || ""}
                onChange={(e) => handleModalInputChange(e, setCurrentEducation)}
                rows={3}
                className="w-full px-4 py-2 rounded-md border border-softgray focus:outline-none focus:ring-2 focus:ring-lightblue focus:border-transparent"
                placeholder="Describe your studies, achievements, etc."
              ></textarea>
            </div>
          </div>
        </form>
      </Modal>
      
      {/* Certification Modal */}
      <Modal
        isOpen={showCertificationModal}
        onClose={() => setShowCertificationModal(false)}
        title={currentCertification?.id ? "Edit Certification" : "Add Certification"}
        footer={
          <>
            <Button 
              variant="outline" 
              onClick={() => setShowCertificationModal(false)}
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button 
              onClick={saveCertification} 
              isLoading={isSaving}
            >
              {currentCertification?.id ? 'Update' : 'Save'}
            </Button>
          </>
        }
      >
        <form onSubmit={saveCertification}>
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Certification Name <span className="text-red-500">*</span>
              </label>
              <input
                id="title"
                type="text"
                name="title"
                value={currentCertification?.title || ""}
                onChange={(e) => handleModalInputChange(e, setCurrentCertification)}
                className={`w-full px-4 py-2 rounded-md border ${validationErrors.title ? 'border-red-500 focus:ring-red-500' : 'border-softgray focus:ring-lightblue'} focus:outline-none focus:ring-2 focus:border-transparent`}
                required
              />
              {validationErrors.title && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle size={14} className="mr-1" />
                  {validationErrors.title}
                </p>
              )}
            </div>
            
            <div>
              <label htmlFor="issuingOrganization" className="block text-sm font-medium text-gray-700 mb-1">
                Issuing Organization <span className="text-red-500">*</span>
              </label>
              <input
                id="issuingOrganization"
                type="text"
                name="issuingOrganization"
                value={currentCertification?.issuingOrganization || ""}
                onChange={(e) => handleModalInputChange(e, setCurrentCertification)}
                className={`w-full px-4 py-2 rounded-md border ${validationErrors.issuingOrganization ? 'border-red-500 focus:ring-red-500' : 'border-softgray focus:ring-lightblue'} focus:outline-none focus:ring-2 focus:border-transparent`}
                required
              />
              {validationErrors.issuingOrganization && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle size={14} className="mr-1" />
                  {validationErrors.issuingOrganization}
                </p>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="issueDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Issue Date <span className="text-red-500">*</span>
                </label>
                <input
                  id="issueDate"
                  type="date"
                  name="issueDate"
                  value={currentCertification?.issueDate || ""}
                  onChange={(e) => handleModalInputChange(e, setCurrentCertification)}
                  className={`w-full px-4 py-2 rounded-md border ${validationErrors.issueDate ? 'border-red-500 focus:ring-red-500' : 'border-softgray focus:ring-lightblue'} focus:outline-none focus:ring-2 focus:border-transparent`}
                  required
                />
                {validationErrors.issueDate && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertCircle size={14} className="mr-1" />
                    {validationErrors.issueDate}
                  </p>
                )}
              </div>
              
              <div>
                <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Expiry Date (if any)
                </label>
                <input
                  id="expiryDate"
                  type="date"
                  name="expiryDate"
                  value={currentCertification?.expiryDate || ""}
                  onChange={(e) => handleModalInputChange(e, setCurrentCertification)}
                  className="w-full px-4 py-2 rounded-md border border-softgray focus:outline-none focus:ring-2 focus:ring-lightblue focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">Leave blank if no expiry</p>
              </div>
            </div>
            
            <div>
              <label htmlFor="credentialId" className="block text-sm font-medium text-gray-700 mb-1">
                Credential ID
              </label>
              <input
                id="credentialId"
                type="text"
                name="credentialId"
                value={currentCertification?.credentialId || ""}
                onChange={(e) => handleModalInputChange(e, setCurrentCertification)}
                className="w-full px-4 py-2 rounded-md border border-softgray focus:outline-none focus:ring-2 focus:ring-lightblue focus:border-transparent"
              />
            </div>
          </div>
        </form>
      </Modal>
      
      {/* Experience Modal */}
      <Modal
        isOpen={showExperienceModal}
        onClose={() => setShowExperienceModal(false)}
        title={currentExperience?.id ? "Edit Experience" : "Add Experience"}
        footer={
          <>
            <Button 
              variant="outline" 
              onClick={() => setShowExperienceModal(false)}
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button 
              onClick={saveExperience} 
              isLoading={isSaving}
            >
              {currentExperience?.id ? 'Update' : 'Save'}
            </Button>
          </>
        }
      >
        <form onSubmit={saveExperience}>
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Job Title <span className="text-red-500">*</span>
              </label>
              <input
                id="title"
                type="text"
                name="title"
                value={currentExperience?.title || ""}
                onChange={(e) => handleModalInputChange(e, setCurrentExperience)}
                className={`w-full px-4 py-2 rounded-md border ${validationErrors.title ? 'border-red-500 focus:ring-red-500' : 'border-softgray focus:ring-lightblue'} focus:outline-none focus:ring-2 focus:border-transparent`}
                required
              />
              {validationErrors.title && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle size={14} className="mr-1" />
                  {validationErrors.title}
                </p>
              )}
            </div>
            
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                Company <span className="text-red-500">*</span>
              </label>
              <input
                id="company"
                type="text"
                name="company"
                value={currentExperience?.company || ""}
                onChange={(e) => handleModalInputChange(e, setCurrentExperience)}
                className={`w-full px-4 py-2 rounded-md border ${validationErrors.company ? 'border-red-500 focus:ring-red-500' : 'border-softgray focus:ring-lightblue'} focus:outline-none focus:ring-2 focus:border-transparent`}
                required
              />
              {validationErrors.company && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle size={14} className="mr-1" />
                  {validationErrors.company}
                </p>
              )}
            </div>
            
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                id="location"
                type="text"
                name="location"
                value={currentExperience?.location || ""}
                onChange={(e) => handleModalInputChange(e, setCurrentExperience)}
                className="w-full px-4 py-2 rounded-md border border-softgray focus:outline-none focus:ring-2 focus:ring-lightblue focus:border-transparent"
                placeholder="City, Country or Remote"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date <span className="text-red-500">*</span>
                </label>
                <input
                  id="startDate"
                  type="date"
                  name="startDate"
                  value={currentExperience?.startDate || ""}
                  onChange={(e) => handleModalInputChange(e, setCurrentExperience)}
                  className={`w-full px-4 py-2 rounded-md border ${validationErrors.startDate ? 'border-red-500 focus:ring-red-500' : 'border-softgray focus:ring-lightblue'} focus:outline-none focus:ring-2 focus:border-transparent`}
                  required
                />
                {validationErrors.startDate && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertCircle size={14} className="mr-1" />
                    {validationErrors.startDate}
                  </p>
                )}
              </div>
              
              <div>
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                  End Date
                </label>
                <input
                  id="endDate"
                  type="date"
                  name="endDate"
                  value={currentExperience?.endDate || ""}
                  onChange={(e) => handleModalInputChange(e, setCurrentExperience)}
                  className="w-full px-4 py-2 rounded-md border border-softgray focus:outline-none focus:ring-2 focus:ring-lightblue focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">Leave blank if current position</p>
              </div>
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={currentExperience?.description || ""}
                onChange={(e) => handleModalInputChange(e, setCurrentExperience)}
                rows={3}
                className="w-full px-4 py-2 rounded-md border border-softgray focus:outline-none focus:ring-2 focus:ring-lightblue focus:border-transparent"
                placeholder="Describe your responsibilities and achievements"
              ></textarea>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Profile;
