import { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import JobListing from '../../components/graduate/JobListing';

// Mock data for demonstration
const recentJobs = [
	{
		id: 1,
		title: 'Software Developer',
		company: 'Tech Solutions Ltd',
		location: 'Nairobi, Kenya',
		postedDate: new Date(Date.now() - 86400000 * 2)
			.toISOString()
			.split('T')[0], // 2 days ago
		jobType: 'Full-time' as const,
		skills: ['JavaScript', 'React', 'Node.js'],
		description:
			"We're looking for a passionate software developer to join our team.",
	},
	{
		id: 2,
		title: 'UX/UI Designer',
		company: 'Creative Agency',
		location: 'Remote',
		postedDate: new Date(Date.now() - 86400000)
			.toISOString()
			.split('T')[0], // 1 day ago
		jobType: 'Contract' as const,
		skills: ['Figma', 'UI/UX', 'Adobe XD'],
		description: 'Design beautiful and functional interfaces for our clients.',
		featured: true,
	},
];

const Dashboard = () => {
	const [applicationCount, setApplicationCount] = useState(3);
	const [profileCompletionPercentage] = useState(85);

	return (
		<div>
			<h1 className="text-2xl font-bold mb-8">Graduate Dashboard</h1>
			{/* Dashboard Overview */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
				<Card>
					<h3 className="text-lg font-semibold mb-2">Profile Completion</h3>
					<div className="text-3xl font-bold text-lightblue mb-2">
						{profileCompletionPercentage}%
					</div>
					<div className="w-full bg-gray-200 h-2 rounded-full">
						<div
							className="bg-lightblue h-2 rounded-full dashboard-progress-bar"
							data-progress={profileCompletionPercentage}
						></div>
					</div>
					<Link to="/graduate/profile">
						<Button variant="outline" size="sm" className="mt-4">
							Complete Your Profile
						</Button>
					</Link>
				</Card>
				<Card>
					<h3 className="text-lg font-semibold mb-2">Applications</h3>
					<div className="text-3xl font-bold text-lightblue">
						{applicationCount}
					</div>
					<p className="text-gray-600">Active job applications</p>
					<Button variant="outline" size="sm" className="mt-4">
						View Applications
					</Button>
				</Card>
				<Card>
					<h3 className="text-lg font-semibold mb-2">Notifications</h3>
					<div className="text-3xl font-bold text-lightblue">2</div>
					<p className="text-gray-600">Unread notifications</p>
					<Button variant="outline" size="sm" className="mt-4">
						View All
					</Button>
				</Card>
			</div>
			{/* Recommended Jobs */}
			<h2 className="text-xl font-bold mb-4">Recommended For You</h2>
			<div className="space-y-4 mb-8">
				{recentJobs.map((job) => (
					<JobListing
						key={job.id}
						{...job}
						onApply={() => setApplicationCount(applicationCount + 1)}
					/>
				))}
				<div className="text-center">
					<Link to="/graduate/jobs">
						<Button>View More Jobs</Button>
					</Link>
				</div>
			</div>
			{/* Upcoming Events */}
			<h2 className="text-xl font-bold mb-4">Upcoming Events</h2>
			<Card>
				<div className="space-y-4">
					<div className="flex items-start">
						<div className="bg-lightblue text-white rounded p-2 mr-4 text-center min-w-16">
							<div className="text-sm">JUN</div>
							<div className="text-xl font-bold">15</div>
						</div>
						<div>
							<h3 className="font-semibold">Graduate Career Fair</h3>
							<p className="text-gray-600">
								Connect with top employers in the tech industry
							</p>
							<p className="text-sm text-gray-500 mt-1">
								10:00 AM - 4:00 PM • Virtual Event
							</p>
						</div>
					</div>
					<div className="flex items-start">
						<div className="bg-lightblue text-white rounded p-2 mr-4 text-center min-w-16">
							<div className="text-sm">JUN</div>
							<div className="text-xl font-bold">22</div>
						</div>
						<div>
							<h3 className="font-semibold">Resume Building Workshop</h3>
							<p className="text-gray-600">
								Learn how to create an effective tech resume
							</p>
							<p className="text-sm text-gray-500 mt-1">
								2:00 PM - 3:30 PM • Online
							</p>
						</div>
					</div>
				</div>
			</Card>
		</div>
	);
};

export default Dashboard;

// Add this CSS to your main stylesheet or a relevant CSS module:
// .dashboard-progress-bar {
//   width: var(--progress-width, 0%);
// }
// [data-progress] {
//   --progress-width: attr(data-progress '%');
// }
// If your build tool does not support attr() for width, use a utility like Tailwind's w-[value%] or set width via JS.
