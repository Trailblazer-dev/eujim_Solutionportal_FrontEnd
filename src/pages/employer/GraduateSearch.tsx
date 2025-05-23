import React, { useState } from 'react';
import { Search, Filter, Star, StarOff, Download, UserPlus } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Badge from '../../components/common/Badge';

// Mock data for graduates
const mockGraduates = [
	{
		id: 1,
		name: 'Jane Smith',
		title: 'Frontend Developer',
		location: 'Nairobi, Kenya',
		education: 'BSc Computer Science, University of Nairobi',
		graduationYear: 2023,
		skills: ['JavaScript', 'React', 'TypeScript', 'HTML/CSS', 'UI/UX'],
		experience: '1 year internship',
		bio: 'Passionate frontend developer with a focus on creating intuitive user experiences.',
		profileImage: '',
		isShortlisted: false,
	},
	{
		id: 2,
		name: 'Michael Chen',
		title: 'Data Scientist',
		location: 'Remote',
		education: 'MSc Data Science, Strathmore University',
		graduationYear: 2022,
		skills: ['Python', 'Machine Learning', 'SQL', 'Data Analysis', 'Statistics'],
		experience: '6 months internship',
		bio: 'Data scientist specializing in predictive modeling and data visualization.',
		profileImage: '',
		isShortlisted: true,
	},
	{
		id: 3,
		name: 'Sarah Johnson',
		title: 'UX/UI Designer',
		location: 'Mombasa, Kenya',
		education: 'BA in Design, Moi University',
		graduationYear: 2023,
		skills: ['Figma', 'Adobe XD', 'UI Design', 'User Research', 'Prototyping'],
		experience: 'Freelance',
		bio: 'Creative designer focused on creating user-centered digital experiences.',
		profileImage: '',
		isShortlisted: false,
	},
	{
		id: 4,
		name: 'David Mwangi',
		title: 'Backend Developer',
		location: 'Nairobi, Kenya',
		education: 'BSc Information Technology, JKUAT',
		graduationYear: 2022,
		skills: ['Node.js', 'Express', 'MongoDB', 'API Design', 'GraphQL'],
		experience: '1 year',
		bio: 'Backend developer with experience in building robust APIs and database design.',
		profileImage: '',
		isShortlisted: false,
	},
];

const GraduateSearch: React.FC = () => {
	const [searchQuery, setSearchQuery] = useState('');
	const [graduates, setGraduates] = useState(mockGraduates);
	const [showFilters, setShowFilters] = useState(false);
	const [activeSkillFilters, setActiveSkillFilters] = useState<string[]>([]);
	const [selectedGraduate, setSelectedGraduate] = useState<typeof mockGraduates[0] | null>(null);

	// Get all unique skills from the graduates for filter options
	const allSkills = Array.from(
		new Set(mockGraduates.flatMap((graduate) => graduate.skills))
	).sort();

	// Toggle skill filter
	const toggleSkillFilter = (skill: string) => {
		if (activeSkillFilters.includes(skill)) {
			setActiveSkillFilters(activeSkillFilters.filter((s) => s !== skill));
		} else {
			setActiveSkillFilters([...activeSkillFilters, skill]);
		}
	};

	// Apply filters and search
	const filteredGraduates = graduates.filter((graduate) => {
		// Filter by search query
		const matchesSearch =
			graduate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			graduate.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			graduate.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
			graduate.skills.some((skill) =>
				skill.toLowerCase().includes(searchQuery.toLowerCase())
			);

		// Filter by selected skills
		const matchesSkills =
			activeSkillFilters.length === 0 ||
			activeSkillFilters.every((skill) => graduate.skills.includes(skill));

		return matchesSearch && matchesSkills;
	});

	// Toggle shortlist status for a graduate
	const toggleShortlist = (id: number) => {
		setGraduates(
			graduates.map((graduate) =>
				graduate.id === id
					? { ...graduate, isShortlisted: !graduate.isShortlisted }
					: graduate
			)
		);
	};

	// View graduate profile
	const viewProfile = (graduate: typeof mockGraduates[0]) => {
		setSelectedGraduate(graduate);
	};

	// Clear all filters
	const clearFilters = () => {
		setActiveSkillFilters([]);
		setSearchQuery('');
	};

	return (
		<div className="min-h-screen bg-softgray flex">
			{/* Sidebar */}
			{/* <EmployerSidebar 
        activeTab="search" 
        setActiveTab={() => {}}
        showMobileMenu={showMobileMenu}
        setShowMobileMenu={setShowMobileMenu}
      /> */}

			{/* Main Content */}
			<div className="flex-1 flex flex-col min-h-screen">
				{/* <EmployerHeader 
          title="Graduate Search" 
          showMobileMenu={showMobileMenu}
          setShowMobileMenu={setShowMobileMenu}
        /> */}

				<main className="flex-1 p-6">
					<div className="max-w-7xl mx-auto">
						{/* Search and Filter Bar */}
						<Card className="mb-6 p-6">
							<div className="flex flex-col md:flex-row gap-4">
								<div className="flex-1">
									<Input
										placeholder="Search by name, skill, or keyword..."
										value={searchQuery}
										onChange={(e) => setSearchQuery(e.target.value)}
										icon={<Search size={18} />}
									/>
								</div>
								<div className="flex gap-2">
									<Button
										variant="outline"
										onClick={() => setShowFilters(!showFilters)}
									>
										<Filter size={18} className="mr-1" /> Filters{' '}
										{activeSkillFilters.length > 0 &&
											`(${activeSkillFilters.length})`}
									</Button>
									<Button onClick={() => clearFilters()}>Reset</Button>
								</div>
							</div>

							{/* Active Filters */}
							{activeSkillFilters.length > 0 && (
								<div className="mt-4 flex flex-wrap gap-2">
									{activeSkillFilters.map((skill) => (
										<Badge
											key={skill}
											variant="primary"
											removable
											onRemove={() => toggleSkillFilter(skill)}
										>
											{skill}
										</Badge>
									))}
								</div>
							)}

							{/* Filter Panel */}
							{showFilters && (
								<div className="mt-4 pt-4 border-t border-gray-200">
									<h3 className="font-medium text-gray-700 mb-3">
										Filter by Skills
									</h3>
									<div className="flex flex-wrap gap-2">
										{allSkills.map((skill) => (
											<button
												key={skill}
												className={`px-3 py-1 text-sm rounded-full transition-all ${
													activeSkillFilters.includes(skill)
														? 'bg-lightblue text-white'
														: 'bg-gray-100 text-gray-700 hover:bg-gray-200'
												}`}
												onClick={() => toggleSkillFilter(skill)}
											>
												{skill}
											</button>
										))}
									</div>
								</div>
							)}
						</Card>

						{/* Results Count */}
						<div className="mb-6 flex justify-between items-center">
							<h2 className="text-lg font-semibold text-gray-700">
								{filteredGraduates.length} Graduate
								{filteredGraduates.length !== 1 ? 's' : ''} Found
							</h2>
							<div className="flex gap-2">
								<Button
									variant="outline"
									size="sm"
								>
									<Download size={16} className="mr-1" /> Export Results
								</Button>
							</div>
						</div>

						{/* Graduate Cards */}
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{filteredGraduates.map((graduate) => (
								<Card key={graduate.id} className="p-0 overflow-hidden">
									<div className="p-4 border-b border-gray-100">
										<div className="flex justify-between items-start">
											<div className="flex items-center">
												<div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 mr-3">
													{graduate.profileImage ? (
														<img
															src={graduate.profileImage}
															alt={graduate.name}
															className="w-full h-full rounded-full object-cover"
														/>
													) : (
														<span className="text-lg font-semibold">
															{graduate.name
																.split(' ')
																.map((n) => n[0])
																.join('')}
														</span>
													)}
												</div>
												<div>
													<h3 className="font-semibold text-navyblue">
														{graduate.name}
													</h3>
													<p className="text-sm text-gray-600">
														{graduate.title}
													</p>
												</div>
											</div>
											<button
												onClick={() => toggleShortlist(graduate.id)}
												className={`p-2 rounded-full ${
													graduate.isShortlisted
														? 'text-yellow-500 hover:bg-yellow-50'
														: 'text-gray-400 hover:bg-gray-100'
												}`}
												aria-label={
													graduate.isShortlisted
														? 'Remove from shortlist'
														: 'Add to shortlist'
												}
											>
												{graduate.isShortlisted ? (
													<Star size={18} />
												) : (
													<StarOff size={18} />
												)}
											</button>
										</div>
									</div>

									<div className="p-4">
										<div className="mb-3">
											<p className="text-sm text-gray-600 flex items-center gap-1 mb-1">
												<span className="w-4 h-4 inline-flex items-center justify-center bg-blue-100 rounded-full text-blue-500">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														viewBox="0 0 20 20"
														fill="currentColor"
														className="w-3 h-3"
													>
														<path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
													</svg>
												</span>
												{graduate.education}
											</p>
											<p className="text-sm text-gray-600 flex items-center gap-1">
												<span className="w-4 h-4 inline-flex items-center justify-center bg-green-100 rounded-full text-green-500">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														viewBox="0 0 20 20"
														fill="currentColor"
														className="w-3 h-3"
													>
														<path
															fillRule="evenodd"
															d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
															clipRule="evenodd"
														/>
													</svg>
												</span>
												{graduate.location}
											</p>
										</div>

										<div className="mb-4">
											<h4 className="text-xs text-gray-500 uppercase tracking-wider mb-2">
												Skills
											</h4>
											<div className="flex flex-wrap gap-1">
												{graduate.skills
													.slice(0, 4)
													.map((skill, index) => (
														<span
															key={index}
															className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full"
														>
															{skill}
														</span>
													))}
												{graduate.skills.length > 4 && (
													<span className="text-xs text-gray-500 px-2 py-1">
														+{graduate.skills.length - 4} more
													</span>
												)}
											</div>
										</div>

										<div className="flex gap-2">
											<Button
												variant="default"
												className="flex-1"
												onClick={() => viewProfile(graduate)}
											>
												View Profile
											</Button>
											<Button
												variant="outline"
												className="flex-none"
												onClick={() =>
													alert(`Invite ${graduate.name} to apply`)
												}
											>
												<UserPlus size={16} className="mr-1" /> Invite
											</Button>
										</div>
									</div>
								</Card>
							))}

							{/* Empty State */}
							{filteredGraduates.length === 0 && (
								<Card className="py-12 text-center">
									<div className="flex flex-col items-center">
										<div className="bg-gray-100 rounded-full p-4 mb-4">
											<Search size={32} className="text-gray-400" />
										</div>
										<h3 className="text-xl font-bold text-gray-700 mb-2">
											No graduates found
										</h3>
										<p className="text-gray-500 max-w-md mx-auto mb-6">
											Try adjusting your search or filter criteria to find more
											graduates that match your requirements.
										</p>
										<Button onClick={clearFilters}>
											Clear all filters
										</Button>
									</div>
								</Card>
							)}
						</div>
					</div>
				</main>
			</div>

			{/* Graduate Profile Modal */}
			{selectedGraduate && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
					<div className="bg-white rounded-lg shadow-lg max-w-2xl w-full mx-4 p-6 relative">
						<button
							onClick={() => setSelectedGraduate(null)}
							className="absolute top-4 right-4 text-gray-500 hover:text-navyblue"
							aria-label="Close profile modal"
						>
							&times;
						</button>
						<div className="flex justify-between items-center mb-4">
							<h2 className="text-xl font-semibold text-gray-800">
								{selectedGraduate.name}'s Profile
							</h2>
							<button
								onClick={() => toggleShortlist(selectedGraduate.id)}
								className={`p-2 rounded-full ${
									selectedGraduate.isShortlisted
										? 'text-yellow-500 hover:bg-yellow-50'
										: 'text-gray-400 hover:bg-gray-100'
								}`}
								aria-label={
									selectedGraduate.isShortlisted
										? 'Remove from shortlist'
										: 'Add to shortlist'
								}
							>
								{selectedGraduate.isShortlisted ? (
									<Star size={18} />
								) : (
									<StarOff size={18} />
								)}
							</button>
						</div>
						<div className="mb-4">
							<p className="text-gray-700 mb-2">
								<span className="font-semibold">Title:</span> {selectedGraduate.title}
							</p>
							<p className="text-gray-700 mb-2">
								<span className="font-semibold">Location:</span> {selectedGraduate.location}
							</p>
							<p className="text-gray-700 mb-2">
								<span className="font-semibold">Education:</span> {selectedGraduate.education}
							</p>
							<p className="text-gray-700 mb-2">
								<span className="font-semibold">Graduation Year:</span> {selectedGraduate.graduationYear}
							</p>
							<p className="text-gray-700 mb-2">
								<span className="font-semibold">Experience:</span> {selectedGraduate.experience}
							</p>
							<p className="text-gray-700 mb-2">
								<span className="font-semibold">Bio:</span> {selectedGraduate.bio}
							</p>
						</div>
						<div>
							<h4 className="text-xs text-gray-500 uppercase tracking-wider mb-2">
								Skills
							</h4>
							<div className="flex flex-wrap gap-1">
								{selectedGraduate.skills.map((skill: string, index: number) => (
									<span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
										{skill}
									</span>
								))}
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default GraduateSearch;
