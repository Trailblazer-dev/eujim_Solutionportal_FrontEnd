import { useState } from 'react';
import { Search, Filter, SlidersHorizontal, ChevronDown } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import JobListing from '../../components/graduate/JobListing';

// Mock job data
const mockJobs = [
	{
		id: 1,
		title: 'Junior Software Developer',
		company: 'TechStart Inc.',
		location: 'Nairobi, Kenya',
		postedDate: new Date(Date.now() - 86400000 * 3)
			.toISOString()
			.split('T')[0],
		jobType: 'Full-time' as const,
		salary: 'KES 70,000 - 90,000',
		description:
			'Great opportunity for recent graduates with knowledge of modern JavaScript frameworks.',
		skills: ['JavaScript', 'React', 'Git'],
		featured: true,
	},
	{
		id: 2,
		title: 'Graduate Trainee - Data Science',
		company: 'Data Insights Ltd',
		location: 'Remote',
		postedDate: new Date(Date.now() - 86400000)
			.toISOString()
			.split('T')[0],
		jobType: 'Full-time' as const,
		description:
			'Join our 6-month graduate trainee program focused on data science and machine learning.',
		skills: ['Python', 'Data Analysis', 'Statistics'],
	},
	{
		id: 3,
		title: 'UI/UX Design Intern',
		company: 'Creative Solutions',
		location: 'Mombasa, Kenya',
		postedDate: new Date(Date.now() - 86400000 * 5)
			.toISOString()
			.split('T')[0],
		jobType: 'Internship' as const,
		salary: 'KES 30,000',
		description: 'Learn and apply UI/UX design principles in real-world projects.',
		skills: ['Figma', 'UI Design', 'Prototyping'],
	},
	{
		id: 4,
		title: 'Graduate DevOps Engineer',
		company: 'Cloud Systems',
		location: 'Nairobi, Kenya',
		postedDate: new Date(Date.now() - 86400000 * 2)
			.toISOString()
			.split('T')[0],
		jobType: 'Contract' as const,
		description:
			'DevOps position perfect for recent IT or Computer Science graduates.',
		skills: ['AWS', 'Docker', 'CI/CD', 'Linux'],
	},
	{
		id: 5,
		title: 'Junior Content Developer',
		company: 'Digital Media Agency',
		location: 'Remote',
		postedDate: new Date().toISOString().split('T')[0], // Today
		jobType: 'Part-time' as const,
		description: 'Create engaging content for multiple digital platforms.',
		skills: ['Content Writing', 'SEO', 'Social Media'],
	},
];

const JobSearch = () => {
	const [jobs, setJobs] = useState(mockJobs);
	const [searchQuery, setSearchQuery] = useState('');
	const [filters, setFilters] = useState({
		location: '',
		jobType: '',
		isRemote: false,
		salary: '',
		datePosted: '',
	});
	const [showFilters, setShowFilters] = useState(false);
	const [sortOption, setSortOption] = useState('relevance');

	// Handle search form submission
	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		// In a real app, you would fetch jobs based on the search query and filters
		// For now, let's just filter the mock data
		filterJobs();
	};

	// Handle filter input changes
	const handleFilterChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value, type } = e.target;

		setFilters({
			...filters,
			[name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
		});
	};

	// Filter jobs based on current filters
	const filterJobs = () => {
		// In a real app, this would be part of your API request
		// For now, just simulate filtering on the mock data
		let filteredJobs = [...mockJobs];

		// Filter by search query
		if (searchQuery) {
			filteredJobs = filteredJobs.filter(
				(job) =>
					job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
					job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
					job.description.toLowerCase().includes(searchQuery.toLowerCase())
			);
		}

		// Filter by location
		if (filters.location) {
			filteredJobs = filteredJobs.filter((job) =>
				job.location.toLowerCase().includes(filters.location.toLowerCase())
			);
		}

		// Filter by job type
		if (filters.jobType) {
			filteredJobs = filteredJobs.filter((job) => job.jobType === filters.jobType);
		}

		// Filter for remote jobs
		if (filters.isRemote) {
			filteredJobs = filteredJobs.filter((job) =>
				job.location.toLowerCase().includes('remote')
			);
		}

		// Filter by date posted
		if (filters.datePosted) {
			const now = new Date();
			const oneDay = 86400000; // 24 hours in milliseconds

			filteredJobs = filteredJobs.filter((job) => {
				const jobDate = new Date(job.postedDate);
				const daysDifference = Math.floor(
					(now.getTime() - jobDate.getTime()) / oneDay
				);

				switch (filters.datePosted) {
					case 'today':
						return daysDifference < 1;
					case 'week':
						return daysDifference < 7;
					case 'month':
						return daysDifference < 30;
					default:
						return true;
				}
			});
		}

		// Sort jobs
		if (sortOption === 'newest') {
			filteredJobs.sort(
				(a, b) =>
					new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()
			);
		} else if (sortOption === 'oldest') {
			filteredJobs.sort(
				(a, b) =>
					new Date(a.postedDate).getTime() - new Date(b.postedDate).getTime()
			);
		}

		setJobs(filteredJobs);

		// On mobile, close the filters panel after applying
		if (window.innerWidth < 768) {
			setShowFilters(false);
		}
	};

	// Apply current filters
	const applyFilters = () => {
		filterJobs();
	};

	// Reset all filters
	const resetFilters = () => {
		setFilters({
			location: '',
			jobType: '',
			isRemote: false,
			salary: '',
			datePosted: '',
		});
		setSearchQuery('');
		setJobs(mockJobs);
	};

	// Handle sort option change
	const handleSortChange = (option: string) => {
		setSortOption(option);
		// Re-apply filters with new sort option
		filterJobs();
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
								aria-label="Search jobs"
							/>
						</div>
						<div className="flex items-center space-x-2">
							<Button
								type="button"
								variant="outline"
								onClick={() => setShowFilters(!showFilters)}
								className="md:hidden"
								aria-label="Toggle filters"
								aria-expanded={showFilters}
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
								aria-label="Reset all filters"
							>
								Reset
							</button>
						</div>

						<div className="space-y-4">
							<div>
								<label
									htmlFor="desktop-location"
									className="block text-gray-700 text-sm font-medium mb-1"
								>
									Location
								</label>
								<input
									id="desktop-location"
									type="text"
									name="location"
									value={filters.location}
									onChange={handleFilterChange}
									placeholder="City or country"
									className="w-full px-3 py-2 border border-softgray rounded-md focus:outline-none focus:ring-1 focus:ring-lightblue text-sm"
								/>
							</div>

							<div>
								<label
									htmlFor="desktop-job-type"
									className="block text-gray-700 text-sm font-medium mb-1"
								>
									Job Type
								</label>
								<select
									id="desktop-job-type"
									name="jobType"
									value={filters.jobType}
									onChange={handleFilterChange}
									className="w-full px-3 py-2 border border-softgray rounded-md focus:outline-none focus:ring-1 focus:ring-lightblue text-sm"
									aria-label="Select job type"
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
									id="desktop-isRemote"
									name="isRemote"
									checked={filters.isRemote}
									onChange={handleFilterChange}
									className="w-4 h-4 text-lightblue"
								/>
								<label
									htmlFor="desktop-isRemote"
									className="ml-2 text-sm text-gray-700"
								>
									Remote Only
								</label>
							</div>

							<div>
								<label
									htmlFor="desktop-salary"
									className="block text-gray-700 text-sm font-medium mb-1"
								>
									Salary Range
								</label>
								<select
									id="desktop-salary"
									name="salary"
									value={filters.salary}
									onChange={handleFilterChange}
									className="w-full px-3 py-2 border border-softgray rounded-md focus:outline-none focus:ring-1 focus:ring-lightblue text-sm"
									aria-label="Select salary range"
								>
									<option value="">Any Salary</option>
									<option value="0-50000">Below KES 50,000</option>
									<option value="50000-100000">KES 50,000 - 100,000</option>
									<option value="100000-150000">KES 100,000 - 150,000</option>
									<option value="150000+">Above KES 150,000</option>
								</select>
							</div>

							<div>
								<label
									htmlFor="desktop-date-posted"
									className="block text-gray-700 text-sm font-medium mb-1"
								>
									Date Posted
								</label>
								<select
									id="desktop-date-posted"
									name="datePosted"
									value={filters.datePosted}
									onChange={handleFilterChange}
									className="w-full px-3 py-2 border border-softgray rounded-md focus:outline-none focus:ring-1 focus:ring-lightblue text-sm"
									aria-label="Select date range"
								>
									<option value="">Any Time</option>
									<option value="today">Today</option>
									<option value="week">Past Week</option>
									<option value="month">Past Month</option>
								</select>
							</div>

							<Button
								onClick={applyFilters}
								className="w-full mt-2"
								aria-label="Apply current filters"
							>
								Apply Filters
							</Button>
						</div>
					</Card>
				</div>

				{/* Filters - Mobile */}
				{showFilters && (
					<div className="md:hidden fixed inset-0 bg-white z-50 p-4 overflow-y-auto">
						<div className="flex justify-between items-center mb-4">
							<h3 className="font-bold text-xl">Filters</h3>
							<button
								onClick={() => setShowFilters(false)}
								className="p-1 rounded hover:bg-gray-100"
								aria-label="Close filters"
							>
								<SlidersHorizontal size={24} />
							</button>
						</div>

						<div className="space-y-4">
							<div>
								<label
									htmlFor="mobile-location"
									className="block text-gray-700 font-medium mb-1"
								>
									Location
								</label>
								<input
									id="mobile-location"
									type="text"
									name="location"
									value={filters.location}
									onChange={handleFilterChange}
									placeholder="City or country"
									className="w-full px-3 py-2 border border-softgray rounded-md focus:outline-none focus:ring-1 focus:ring-lightblue"
								/>
							</div>

							<div>
								<label
									htmlFor="mobile-job-type"
									className="block text-gray-700 font-medium mb-1"
								>
									Job Type
								</label>
								<select
									id="mobile-job-type"
									name="jobType"
									value={filters.jobType}
									onChange={handleFilterChange}
									className="w-full px-3 py-2 border border-softgray rounded-md focus:outline-none focus:ring-1 focus:ring-lightblue"
									aria-label="Select job type"
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
								<label
									htmlFor="mobileIsRemote"
									className="ml-2 text-gray-700"
								>
									Remote Only
								</label>
							</div>

							<div>
								<label
									htmlFor="mobile-salary"
									className="block text-gray-700 font-medium mb-1"
								>
									Salary Range
								</label>
								<select
									id="mobile-salary"
									name="salary"
									value={filters.salary}
									onChange={handleFilterChange}
									className="w-full px-3 py-2 border border-softgray rounded-md focus:outline-none focus:ring-1 focus:ring-lightblue"
									aria-label="Select salary range"
								>
									<option value="">Any Salary</option>
									<option value="0-50000">Below KES 50,000</option>
									<option value="50000-100000">KES 50,000 - 100,000</option>
									<option value="100000-150000">KES 100,000 - 150,000</option>
									<option value="150000+">Above KES 150,000</option>
								</select>
							</div>

							<div>
								<label
									htmlFor="mobile-date-posted"
									className="block text-gray-700 font-medium mb-1"
								>
									Date Posted
								</label>
								<select
									id="mobile-date-posted"
									name="datePosted"
									value={filters.datePosted}
									onChange={handleFilterChange}
									className="w-full px-3 py-2 border border-softgray rounded-md focus:outline-none focus:ring-1 focus:ring-lightblue"
									aria-label="Select date range"
								>
									<option value="">Any Time</option>
									<option value="today">Today</option>
									<option value="week">Past Week</option>
									<option value="month">Past Month</option>
								</select>
							</div>

							<div className="flex space-x-2 pt-4">
								<Button
									variant="outline"
									onClick={resetFilters}
									className="flex-1"
								>
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
							<p className="text-sm text-gray-600">
								Showing results for your search
							</p>
						</div>
						<div className="flex items-center space-x-2">
							<label
								htmlFor="sort-options"
								className="text-sm text-gray-600"
							>
								Sort by:
							</label>
							<div className="relative">
								<select
									id="sort-options"
									className="appearance-none bg-transparent pr-8 text-navyblue hover:underline focus:outline-none cursor-pointer"
									value={sortOption}
									onChange={(e) => handleSortChange(e.target.value)}
									aria-label="Sort job listings"
								>
									<option value="relevance">Relevance</option>
									<option value="newest">Newest</option>
									<option value="oldest">Oldest</option>
								</select>
								<ChevronDown
									size={16}
									className="absolute right-0 top-1/2 transform -translate-y-1/2 pointer-events-none"
								/>
							</div>
						</div>
					</div>

					{/* Job Listings */}
					{jobs.length > 0 ? (
						<div className="space-y-4">
							{jobs.map((job) => (
								<JobListing
									key={job.id}
									{...job}
									onApply={() =>
										alert(`Applied to ${job.title} at ${job.company}`)
									}
								/>
							))}
						</div>
					) : (
						<Card>
							<div className="text-center py-8">
								<h3 className="text-lg font-semibold mb-2">
									No jobs found
								</h3>
								<p className="text-gray-600">
									Try adjusting your search criteria or filters
								</p>
							</div>
						</Card>
					)}

					{/* Pagination */}
					{jobs.length > 0 && (
						<nav className="flex justify-center mt-8" aria-label="Pagination">
							<div className="flex space-x-2">
								<button
									className="px-4 py-2 border border-softgray rounded-md text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
									disabled
									aria-label="Previous page"
									aria-disabled="true"
								>
									Previous
								</button>
								<button
									className="px-4 py-2 bg-lightblue text-white rounded-md"
									aria-label="Page 1"
									aria-current="page"
								>
									1
								</button>
								<button
									className="px-4 py-2 border border-softgray rounded-md text-gray-700"
									aria-label="Page 2"
								>
									2
								</button>
								<button
									className="px-4 py-2 border border-softgray rounded-md text-gray-700"
									aria-label="Page 3"
								>
									3
								</button>
								<button
									className="px-4 py-2 border border-softgray rounded-md text-gray-700"
									aria-label="Next page"
								>
									Next
								</button>
							</div>
						</nav>
					)}
				</div>
			</div>
		</div>
	);
};

export default JobSearch;

// No inline styles are used in this file. All styles are handled via Tailwind CSS classes or external CSS.
