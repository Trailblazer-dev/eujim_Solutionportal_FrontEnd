import { User, MapPin, Pencil, ExternalLink, Linkedin, Twitter } from 'lucide-react';
import Button from '../common/Button';

interface ProfileCardProps {
  name: string;
  title?: string;
  location?: string;
  bio?: string;
  skills?: string[];
  experience?: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    [key: string]: string | undefined;
  };
  onEdit?: () => void;
}

const ProfileCard = ({
  name,
  title,
  location,
  bio,
  skills = [],
  experience,
  socialLinks = {},
  onEdit
}: ProfileCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center mr-4">
              <User size={32} className="text-gray-500" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-navyblue">{name}</h2>
              {title && (
                <p className="text-gray-600">{title}</p>
              )}
              {location && (
                <div className="flex items-center text-gray-500 text-sm mt-1">
                  <MapPin size={14} className="mr-1" />
                  <span>{location}</span>
                </div>
              )}
            </div>
          </div>

          {onEdit && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onEdit}
              className="flex items-center"
            >
              <Pencil size={16} className="mr-2" />
              Edit Profile
            </Button>
          )}
        </div>

        {bio && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">About</h3>
            <p className="text-gray-700">{bio}</p>
          </div>
        )}

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {skills.length > 0 ? (
              skills.map((skill, index) => (
                <span 
                  key={index} 
                  className="bg-lightblue bg-opacity-10 text-lightblue px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))
            ) : (
              <p className="text-gray-500">No skills added yet</p>
            )}
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-6">
          {experience && (
            <div>
              <h3 className="text-sm text-gray-500 mb-1">Experience</h3>
              <p className="font-medium">{experience}</p>
            </div>
          )}

          {Object.keys(socialLinks).length > 0 && (
            <div className="flex gap-3">
              {socialLinks.linkedin && (
                <a 
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-lightblue"
                >
                  <Linkedin size={20} />
                </a>
              )}
              {socialLinks.twitter && (
                <a 
                  href={socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-lightblue"
                >
                  <Twitter size={20} />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
