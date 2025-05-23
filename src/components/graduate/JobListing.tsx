import { MapPin, Calendar, Briefcase } from 'lucide-react';
import Button from '../common/Button';

interface JobListingProps {
  id: number;
  title: string;
  company: string;
  location: string;
  postedDate: string;
  jobType: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  salary?: string;
  description: string;
  skills: string[];
  featured?: boolean;
  onApply: () => void;
}

const JobListing = ({
  title,
  company,
  location,
  postedDate,
  jobType,
  salary,
  description,
  skills,
  featured = false,
  onApply
}: JobListingProps) => {
  const formattedDate = new Date(postedDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
  
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${featured ? 'border-l-4 border-lightblue' : ''}`}>
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start">
          <div className="flex-1">
            <div className="flex items-center mb-2">
              <h3 className="text-lg font-bold text-navyblue mr-3">{title}</h3>
              {featured && (
                <span className="bg-lightblue text-white text-xs px-2 py-1 rounded-full">
                  Featured
                </span>
              )}
            </div>
            
            <div className="text-gray-600 mb-2">{company}</div>
            
            <div className="flex flex-wrap items-center text-sm text-gray-500 gap-4 mb-4">
              <div className="flex items-center">
                <MapPin size={14} className="mr-1" />
                <span>{location}</span>
              </div>
              <div className="flex items-center">
                <Calendar size={14} className="mr-1" />
                <span>Posted {formattedDate}</span>
              </div>
              <div className="flex items-center">
                <Briefcase size={14} className="mr-1" />
                <span>{jobType}</span>
              </div>
              {salary && (
                <div className="font-medium text-navyblue">
                  {salary}
                </div>
              )}
            </div>
            
            <p className="text-gray-700 mb-4">
              {description.length > 150 
                ? `${description.substring(0, 150)}...` 
                : description}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {skills.map((skill, index) => (
                <span 
                  key={index}
                  className="bg-softgray text-navyblue text-xs px-3 py-1 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          
          <div className="mt-4 md:mt-0 md:ml-6">
            <Button onClick={onApply}>Apply Now</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobListing;
