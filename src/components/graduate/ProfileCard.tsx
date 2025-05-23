import React from 'react';
import { User, Phone, Mail, MapPin, Calendar, Pencil, Linkedin, Twitter } from 'lucide-react';
import Button from '../common/Button';
import AvatarUpload from './AvatarUpload';

interface ProfileCardProps {
  name: string;
  email: string;
  phone?: string;
  profileImage?: string;
  title?: string;
  location?: string;
  bio?: string;
  skills: string[];
  experience?: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
  };
  onEdit: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  email,
  phone,
  profileImage,
  title,
  location,
  bio,
  skills,
  experience,
  socialLinks,
  onEdit
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300">
      <div className="relative">
        {/* Profile header with background */}
        <div className="h-32 bg-gradient-to-r from-lightblue to-navyblue"></div>
        
        {/* Profile image and edit button */}
        <div className="px-6 sm:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end -mt-16 mb-4">
            <div className="flex flex-col sm:flex-row items-center mb-4 sm:mb-0">
              <div className="relative mb-3 sm:mb-0">
                <AvatarUpload 
                  currentImage={profileImage}
                  size="large"
                  name={name}
                  readOnly
                />
              </div>
              <div className="sm:ml-4 text-center sm:text-left">
                <h2 className="text-2xl font-bold text-navyblue">{name}</h2>
                <p className="text-gray-600">{title || 'No title added'}</p>
              </div>
            </div>
            <Button onClick={onEdit} className="sm:self-end">
              <Pencil size={16} className="mr-2" /> Edit Profile
            </Button>
          </div>
        </div>
      </div>

      <div className="px-6 sm:px-8 py-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile details */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-navyblue mb-3">About</h3>
              <p className="text-gray-700 whitespace-pre-wrap">
                {bio || "No bio information added yet."}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-navyblue mb-3">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skills && skills.length > 0 ? (
                  skills.map((skill, index) => (
                    <span 
                      key={index} 
                      className="bg-softgray text-navyblue px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors duration-200"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-500">No skills added yet.</p>
                )}
              </div>
            </div>
          </div>

          {/* Contact information */}
          <div className="bg-softgray bg-opacity-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-navyblue mb-3">Contact Information</h3>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-700">
                <Mail size={18} className="text-lightblue mr-3" />
                <span>{email}</span>
              </li>
              {phone && (
                <li className="flex items-center text-gray-700">
                  <Phone size={18} className="text-lightblue mr-3" />
                  <span>{phone}</span>
                </li>
              )}
              {location && (
                <li className="flex items-center text-gray-700">
                  <MapPin size={18} className="text-lightblue mr-3" />
                  <span>{location}</span>
                </li>
              )}
              {experience && (
                <li className="flex items-center text-gray-700">
                  <Calendar size={18} className="text-lightblue mr-3" />
                  <span>{experience} experience</span>
                </li>
              )}
            </ul>
              
            {/* Social links */}
            {socialLinks && (Object.values(socialLinks).some(link => link)) && (
              <div className="pt-2 mt-3">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Social Profiles</h4>
                <div className="flex space-x-2">
                  {socialLinks.linkedin && (
                    <a
                      href={socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-white rounded-full text-lightblue hover:bg-lightblue hover:text-white transition-colors duration-200"
                      aria-label="LinkedIn Profile"
                    >
                      <Linkedin size={18} />
                    </a>
                  )}
                  {socialLinks.twitter && (
                    <a
                      href={socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-white rounded-full text-lightblue hover:bg-lightblue hover:text-white transition-colors duration-200"
                      aria-label="Twitter Profile"
                    >
                      <Twitter size={18} />
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
