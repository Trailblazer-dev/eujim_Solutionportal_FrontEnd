import { useState } from 'react';
import { Search, Filter, SlidersHorizontal, MapPin, Briefcase, ChevronDown } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import JobListing from '../../components/graduate/JobListing';

// Mock job data
const mockJobs = [
  {
    id: 1,
    title: "Junior Software Developer",
    company: "TechStart Inc.",
    location: "Nairobi, Kenya",
    postedDate: new Date(Date.now() - 86400000 * 3).toISOString().split('T')[0],
    jobType: "Full-time" as const,
    salary: "KES 70,000 - 90,000",
    description: "Great opportunity for recent graduates with knowledge of modern JavaScript frameworks.",
    skills: ["JavaScript", "React", "Git"],
    featured: true
  },
  {
    id: 2,
    title: "Graduate Trainee - Data Science",
    company: "Data Insights Ltd",
    location: "Remote",
    postedDate: new Date(Date.now() - 86400000).toISOString().split('T')[0],
    jobType: "Full-time" as const,
    description: "Join our 6-month graduate trainee program focused on data science and machine learning.",
    skills: ["Python", "Data Analysis", "Statistics"],
  },
  {
    id: 3,
    title: "UI/UX Design Intern",
    company: "Creative Solutions",
    location: "Mombasa, Kenya",
    postedDate: new Date(Date.now() - 86400000 * 5).toISOString().split('T')[0],
    jobType: "Internship" as const,
    salary: "KES 30,000",
    description: "Learn and apply UI/UX design principles in real-world projects.",
    skills: ["Figma", "UI Design", "Prototyping"],
  },
  {
    id: 4,
    title: "Graduate DevOps Engineer",
    company: "Cloud Systems",
    location: "Nairobi, Kenya",
    postedDate: new Date(Date.now() - 86400000 * 2).toISOString().split('T')[0],
    jobType: "Contract" as const,
    description: "DevOps position perfect for recent IT or Computer Science graduates.",
    skills: ["AWS", "Docker", "CI/CD", "Linux"],
  },
  {
    id: 5,
    title: "Junior Content Developer",
    company: "Digital Media Agency",
    location: "Remote",
    postedDate: new Date().toISOString().split('T')[0], // Today
    jobType: "Part-time" as const,
    description: "Create engaging content for multiple digital platforms.",
    skills: ["Content Writing", "SEO", "Social Media"],
  }
];

const JobSearch = () => {
  const [jobs, setJobs] = useState(mockJobs);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    location: '',
    jobType: '',
    isRemote: false,
    salary: '',
    datePosted: ''
  });
  const [showFilters, setShowFilters] = useState(false);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would fetch jobs based on the search query and filters
    // For now, let's just filter the mock data
    const filteredJobs = mockJobs.filter(job => 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setJobs(filteredJobs);
  };
  
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    setFilters({
      ...filters,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    });
  };
  
  const applyFilters = () => {
    // In a real app, this would be part of your API request
    // For now, just simulate filtering on the mock data
    let filteredJobs = [...mockJobs];
    
    if (filters.location) {
      filteredJobs = filteredJobs.filter(job => 
        job.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }
    
    if (filters.jobType) {
      filteredJobs = filteredJobs.filter(job => 
        job.jobType === filters.jobType
      );
    }
    
    if (filters.isRemote) {
      filteredJobs = filteredJobs.filter(job => 
        job.location.toLowerCase().includes('remote')
      );
    }
    
    setJobs(filteredJobs);
    // On mobile, close the filters panel after applying
    if (window.innerWidth < 768) {
      setShowFilters(false);
    }
  };
  
  const resetFilters = () => {
    setFilters({
      location: '',
      jobType: '',
      isRemote: false,
      salary: '',
      datePosted: ''
    });
    setJobs(mockJobs);
  };

  return (
    <div className="min-h-screen bg-softgray p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-6">Job Search</h1>
      
      {/* Search Bar */}
      <div className="mb-6">
        <form onSubmit={handleSearch}>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search jobs by title, company, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                icon={<Search size={18} />}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden"
              >
                <Filter size={18} className="mr-1" /> Filters
              </Button>
              <Button type="submit">Search Jobs</Button>
            </div>
          </div>
        </form>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters - Desktop */}
        <div className="hidden md:block w-64">
          <Card className="sticky top-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-navyblue">Filters</h3>
              <button 
                onClick={resetFilters}
                className="text-sm text-lightblue hover:underline"
              >
                Reset
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">Location</label>
                <input
                  type="text"
                  name="location"
                  value={filters.location}
                  onChange={handleFilterChange}
                  placeholder="City or country"
                  className="w-full px-3 py-2 border border-softgray rounded-md focus:outline-none focus:ring-1 focus:ring-lightblue text-sm"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">Job Type</label>
                <select
                  name="jobType"
                  value={filters.jobType}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border border-softgray rounded-md focus:outline-none focus:ring-1 focus:ring-lightblue text-sm"
                >
                  <option value="">All Types</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isRemote"
                  name="isRemote"
                  checked={filters.isRemote}
                  onChange={handleFilterChange}
                  className="w-4 h-4 text-lightblue"
                />
                <label htmlFor="isRemote" className="ml-2 text-sm text-gray-700">
                  Remote Only
                </label>
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">Salary Range</label>
                <select
                  name="salary"
                  value={filters.salary}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border border-softgray rounded-md focus:outline-none focus:ring-1 focus:ring-lightblue text-sm"
                >
                  <option value="">Any Salary</option>
                  <option value="0-50000">Below KES 50,000</option>
                  <option value="50000-100000">KES 50,000 - 100,000</option>
                  <option value="100000-150000">KES 100,000 - 150,000</option>
                  <option value="150000+">Above KES 150,000</option>
                </select>
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">Date Posted</label>
                <select
                  name="datePosted"
                  value={filters.datePosted}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border border-softgray rounded-md focus:outline-none focus:ring-1 focus:ring-lightblue text-sm"
                >
                  <option value="">Any Time</option>
                  <option value="today">Today</option>
                  <option value="week">Past Week</option>
                  <option value="month">Past Month</option>
                </select>
              </div>
              
              <Button onClick={applyFilters} className="w-full mt-2">
                Apply Filters
              </Button>
            </div>
          </Card>
        </div>
        
        {/* Filters - Mobile */}
        {showFilters && (
          <div className="md:hidden fixed inset-0 bg-white z-50 p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-xl">Filters</h3>
              <button onClick={() => setShowFilters(false)}>
                <SlidersHorizontal size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">Location</label>
                <input
                  type="text"
                  name="location"
                  value={filters.location}
                  onChange={handleFilterChange}
                  placeholder="City or country"
                  className="w-full px-3 py-2 border border-softgray rounded-md focus:outline-none focus:ring-1 focus:ring-lightblue"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-1">Job Type</label>
                <select
                  name="jobType"
                  value={filters.jobType}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border border-softgray rounded-md focus:outline-none focus:ring-1 focus:ring-lightblue"
                >
                  <option value="">All Types</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="mobileIsRemote"
                  name="isRemote"
                  checked={filters.isRemote}
                  onChange={handleFilterChange}
                  className="w-4 h-4 text-lightblue"
                />
                <label htmlFor="mobileIsRemote" className="ml-2 text-gray-700">
                  Remote Only
                </label>
              </div>
              
              {/* Other filters... */}
              
              <div className="flex space-x-2 pt-4">
                <Button variant="outline" onClick={resetFilters} className="flex-1">
                  Reset
                </Button>
                <Button onClick={applyFilters} className="flex-1">
                  Apply Filters
                </Button>
              </div>
            </div>
          </div>
        )}
        
        {/* Job Results */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-lg font-bold">{jobs.length} Jobs Found</h2>
              <p className="text-sm text-gray-600">Showing results for your search</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <button className="flex items-center text-navyblue hover:underline">
                Relevance <ChevronDown size={16} className="ml-1" />
              </button>
            </div>
          </div>
          
          {/* Job Listings */}
          {jobs.length > 0 ? (
            <div className="space-y-4">
              {jobs.map(job => (
                <JobListing 
                  key={job.id} 
                  {...job} 
                  onApply={() => alert(`Applied to ${job.title} at ${job.company}`)}
                />
              ))}
            </div>
          ) : (
            <Card>
              <div className="text-center py-8">
                <h3 className="text-lg font-semibold mb-2">No jobs found</h3>
                <p className="text-gray-600">Try adjusting your search criteria or filters</p>
              </div>
            </Card>
          )}
          
          {/* Pagination */}
          {jobs.length > 0 && (
            <div className="flex justify-center mt-8">
              <div className="flex space-x-2">
                <button className="px-4 py-2 border border-softgray rounded-md text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                  Previous
                </button>
                <button className="px-4 py-2 bg-lightblue text-white rounded-md">1</button>
                <button className="px-4 py-2 border border-softgray rounded-md text-gray-700">2</button>
                <button className="px-4 py-2 border border-softgray rounded-md text-gray-700">3</button>
                <button className="px-4 py-2 border border-softgray rounded-md text-gray-700">
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobSearch;
