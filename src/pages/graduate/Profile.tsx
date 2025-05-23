import { useState } from 'react';
import { User, Phone, Mail, MapPin, Calendar, Building, Book, Award, Pencil, Save, Plus } from 'lucide-react';
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const skills = e.target.value.split(',').map(skill => skill.trim());
    setEditData({ ...editData, skills });
  };

  const saveChanges = () => {
    setUserData(editData);
    setIsEditing(false);
  };

  // Education handlers
  const openEducationModal = (education = null) => {
    setCurrentEducation(education);
    setShowEducationModal(true);
  };

  const saveEducation = (educationData: any) => {
    if (currentEducation) {
      // Update existing education
      const updatedEducation = userData.education.map(edu => 
        edu.id === currentEducation.id ? { ...educationData, id: currentEducation.id } : edu
      );
      setUserData({ ...userData, education: updatedEducation });
    } else {
      // Add new education
      const newEducation = { ...educationData, id: Date.now() };
      setUserData({ ...userData, education: [...userData.education, newEducation] });
    }
    setShowEducationModal(false);
  };

  // Certification handlers
  const openCertificationModal = (certification = null) => {
    setCurrentCertification(certification);
    setShowCertificationModal(true);
  };

  const saveCertification = (certData: any) => {
    if (currentCertification) {
      // Update existing certification
      const updatedCertifications = userData.certifications.map(cert => 
        cert.id === currentCertification.id ? { ...certData, id: currentCertification.id } : cert
      );
      setUserData({ ...userData, certifications: updatedCertifications });
    } else {
      // Add new certification
      const newCertification = { ...certData, id: Date.now() };
      setUserData({ ...userData, certifications: [...userData.certifications, newCertification] });
    }
    setShowCertificationModal(false);
  };

  // Experience handlers
  const openExperienceModal = (experience = null) => {
    setCurrentExperience(experience);
    setShowExperienceModal(true);
  };

  const saveExperience = (expData: any) => {
    if (currentExperience) {
      // Update existing experience
      const updatedExperiences = userData.workExperience.map(exp => 
        exp.id === currentExperience.id ? { ...expData, id: currentExperience.id } : exp
      );
      setUserData({ ...userData, workExperience: updatedExperiences });
    } else {
      // Add new experience
      const newExperience = { ...expData, id: Date.now() };
      setUserData({ ...userData, workExperience: [...userData.workExperience, newExperience] });
    }
    setShowExperienceModal(false);
  };

  return (
    <div className="min-h-screen bg-softgray p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>

      {isEditing ? (
        <Card>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-navyblue">Edit Profile</h2>
            <div className="space-x-2">
              <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
              <Button onClick={saveChanges}><Save size={16} className="mr-2" /> Save Changes</Button>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="font-semibold text-navyblue">Personal Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                name="name"
                value={editData.name}
                onChange={handleInputChange}
                icon={<User size={18} />}
              />
              <Input
                label="Job Title"
                name="title"
                value={editData.title || ''}
                onChange={handleInputChange}
                icon={<Pencil size={18} />}
              />
              <Input
                label="Email"
                name="email"
                type="email"
                value={editData.email}
                onChange={handleInputChange}
                icon={<Mail size={18} />}
              />
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
              <Card key={edu.id} className="relative">
                <button 
                  className="absolute top-4 right-4 text-gray-400 hover:text-lightblue"
                  onClick={() => openEducationModal(edu)}
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
            <div className="text-center py-6">
              <Book size={32} className="mx-auto text-gray-400 mb-2" />
              <p>No education details added yet</p>
              <Button variant="outline" size="sm" className="mt-2" onClick={() => openEducationModal()}>
                Add Education
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
              <Card key={cert.id} className="relative">
                <button 
                  className="absolute top-4 right-4 text-gray-400 hover:text-lightblue"
                  onClick={() => openCertificationModal(cert)}
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
            <div className="text-center py-6">
              <Award size={32} className="mx-auto text-gray-400 mb-2" />
              <p>No certifications added yet</p>
              <Button variant="outline" size="sm" className="mt-2" onClick={() => openCertificationModal()}>
                Add Certification
              </Button>
            </div>
          </Card>
        )}
      </div>
      
      {/* Work Experience Section */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Work Experience</h2>
          <Button variant="outline" size="sm" onClick={() => openExperienceModal()}>
            <Plus size={16} className="mr-1" /> Add Experience
          </Button>
        </div>
        
        {userData.workExperience.length > 0 ? (
          <div className="space-y-4">
            {userData.workExperience.map((exp) => (
              <Card key={exp.id} className="relative">
                <button 
                  className="absolute top-4 right-4 text-gray-400 hover:text-lightblue"
                  onClick={() => openExperienceModal(exp)}
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
            <div className="text-center py-6">
              <Building size={32} className="mx-auto text-gray-400 mb-2" />
              <p>No work experience added yet</p>
              <Button variant="outline" size="sm" className="mt-2" onClick={() => openExperienceModal()}>
                Add Experience
              </Button>
            </div>
          </Card>
        )}
      </div>
      
      {/* Education Modal */}
      <Modal
        isOpen={showEducationModal}
        onClose={() => setShowEducationModal(false)}
        title={currentEducation ? "Edit Education" : "Add Education"}
        footer={
          <>
            <Button variant="outline" onClick={() => setShowEducationModal(false)}>Cancel</Button>
            <Button onClick={() => {
              // Here you would normally handle the form submission
              // For simplicity, we'll just close the modal
              saveEducation({
                degree: "New Degree",
                institution: "New Institution",
                startDate: new Date().toISOString().split('T')[0],
                endDate: new Date().toISOString().split('T')[0],
                description: "Description"
              });
            }}>Save</Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input 
            label="Degree/Course" 
            name="degree" 
            defaultValue={currentEducation?.degree || ""} 
            required 
          />
          <Input 
            label="Institution" 
            name="institution" 
            defaultValue={currentEducation?.institution || ""} 
            required 
          />
          <div className="grid grid-cols-2 gap-4">
            <Input 
              label="Start Date" 
              name="startDate" 
              type="date" 
              defaultValue={currentEducation?.startDate || ""} 
              required 
            />
            <Input 
              label="End Date (or expected)" 
              name="endDate" 
              type="date" 
              defaultValue={currentEducation?.endDate || ""} 
            />
          </div>
          <div>
            <label className="block text-navyblue font-medium mb-1">
              Description
            </label>
            <textarea
              name="description"
              defaultValue={currentEducation?.description || ""}
              rows={3}
              className="w-full px-4 py-2 rounded-md border border-softgray focus:outline-none focus:ring-2 focus:ring-lightblue focus:border-transparent"
            ></textarea>
          </div>
        </div>
      </Modal>
      
      {/* Certification Modal */}
      <Modal
        isOpen={showCertificationModal}
        onClose={() => setShowCertificationModal(false)}
        title={currentCertification ? "Edit Certification" : "Add Certification"}
        footer={
          <>
            <Button variant="outline" onClick={() => setShowCertificationModal(false)}>Cancel</Button>
            <Button onClick={() => {
              // For simplicity, we'll just close the modal with mock data
              saveCertification({
                title: "New Certification",
                issuingOrganization: "Organization",
                issueDate: new Date().toISOString().split('T')[0],
                expiryDate: "",
                credentialId: "CERT-123"
              });
            }}>Save</Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input 
            label="Certification Name" 
            name="title" 
            defaultValue={currentCertification?.title || ""} 
            required 
          />
          <Input 
            label="Issuing Organization" 
            name="issuingOrganization" 
            defaultValue={currentCertification?.issuingOrganization || ""} 
            required 
          />
          <div className="grid grid-cols-2 gap-4">
            <Input 
              label="Issue Date" 
              name="issueDate" 
              type="date" 
              defaultValue={currentCertification?.issueDate || ""} 
              required 
            />
            <Input 
              label="Expiry Date (if any)" 
              name="expiryDate" 
              type="date" 
              defaultValue={currentCertification?.expiryDate || ""} 
            />
          </div>
          <Input 
            label="Credential ID" 
            name="credentialId" 
            defaultValue={currentCertification?.credentialId || ""} 
          />
        </div>
      </Modal>
      
      {/* Experience Modal */}
      <Modal
        isOpen={showExperienceModal}
        onClose={() => setShowExperienceModal(false)}
        title={currentExperience ? "Edit Experience" : "Add Experience"}
        footer={
          <>
            <Button variant="outline" onClick={() => setShowExperienceModal(false)}>Cancel</Button>
            <Button onClick={() => {
              // For simplicity, we'll just close the modal with mock data
              saveExperience({
                title: "New Position",
                company: "Company Name",
                location: "Location",
                startDate: new Date().toISOString().split('T')[0],
                endDate: "",
                description: "Job description"
              });
            }}>Save</Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input 
            label="Job Title" 
            name="title" 
            defaultValue={currentExperience?.title || ""} 
            required 
          />
          <Input 
            label="Company" 
            name="company" 
            defaultValue={currentExperience?.company || ""} 
            required 
          />
          <Input 
            label="Location" 
            name="location" 
            defaultValue={currentExperience?.location || ""} 
            required 
          />
          <div className="grid grid-cols-2 gap-4">
            <Input 
              label="Start Date" 
              name="startDate" 
              type="date" 
              defaultValue={currentExperience?.startDate || ""} 
              required 
            />
            <Input 
              label="End Date" 
              name="endDate" 
              type="date" 
              defaultValue={currentExperience?.endDate || ""} 
              placeholder="Leave blank if current"
            />
          </div>
          <div>
            <label className="block text-navyblue font-medium mb-1">
              Description
            </label>
            <textarea
              name="description"
              defaultValue={currentExperience?.description || ""}
              rows={3}
              className="w-full px-4 py-2 rounded-md border border-softgray focus:outline-none focus:ring-2 focus:ring-lightblue focus:border-transparent"
            ></textarea>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Profile;
