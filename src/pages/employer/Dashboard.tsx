import React from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';

// Mock data
const recentActivities = [
  { id: 1, type: 'view', graduateName: 'Jane Smith', time: '2 hours ago' },
  { id: 2, type: 'shortlist', graduateName: 'Michael Chen', time: 'Yesterday' },
  { id: 3, type: 'message', graduateName: 'Sarah Johnson', time: '2 days ago' },
];

const stats = {
  viewedProfiles: 24,
  shortlistedCandidates: 7,
  activeJobs: 3,
  newApplications: 12
};

const upcomingInterviews = [
  { 
    id: 1, 
    candidateName: 'Jane Doe', 
    position: 'Frontend Developer',
    date: '2023-06-15',
    time: '10:00 AM',
    status: 'confirmed'
  },
  { 
    id: 2, 
    candidateName: 'Alex Rodriguez', 
    position: 'UX Designer',
    date: '2023-06-16',
    time: '2:30 PM',
    status: 'pending'
  }
];

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-softgray flex">
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="p-6">
                <h3 className="text-lg font-medium text-gray-500 mb-1">Viewed Profiles</h3>
                <p className="text-3xl font-bold text-navyblue">{stats.viewedProfiles}</p>
                <p className="text-sm text-gray-500 mt-2">Last 30 days</p>
              </Card>
              <Card className="p-6">
                <h3 className="text-lg font-medium text-gray-500 mb-1">Shortlisted</h3>
                <p className="text-3xl font-bold text-navyblue">{stats.shortlistedCandidates}</p>
                <p className="text-sm text-gray-500 mt-2">Candidates</p>
              </Card>
              <Card className="p-6">
                <h3 className="text-lg font-medium text-gray-500 mb-1">Active Jobs</h3>
                <p className="text-3xl font-bold text-navyblue">{stats.activeJobs}</p>
                <p className="text-sm text-gray-500 mt-2">Currently open</p>
              </Card>
              <Card className="p-6">
                <h3 className="text-lg font-medium text-gray-500 mb-1">New Applications</h3>
                <p className="text-3xl font-bold text-navyblue">{stats.newApplications}</p>
                <p className="text-sm text-gray-500 mt-2">Needs review</p>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-6">
                {/* Quick Actions */}
                <Card className="p-6">
                  <h2 className="text-xl font-bold text-navyblue mb-4">Quick Actions</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button 
                      variant="primary" 
                      className="justify-center"
                    >
                      Search Graduates
                    </Button>
                    <Button 
                      variant="outline" 
                      className="justify-center"
                    >
                      Post New Job
                    </Button>
                    <Button 
                      variant="outline" 
                      className="justify-center"
                    >
                      View Applications
                    </Button>
                  </div>
                </Card>

                {/* Upcoming Interviews */}
                <Card className="p-6">
                  <h2 className="text-xl font-bold text-navyblue mb-4">Upcoming Interviews</h2>
                  {upcomingInterviews.length > 0 ? (
                    <div className="space-y-4">
                      {upcomingInterviews.map(interview => (
                        <div key={interview.id} className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-lg shadow-sm">
                          <div>
                            <h3 className="font-semibold">{interview.candidateName}</h3>
                            <p className="text-sm text-gray-600">{interview.position}</p>
                            <div className="flex items-center mt-1 text-sm text-gray-500">
                              <span>{new Date(interview.date).toLocaleDateString()}</span>
                              <span className="mx-2">•</span>
                              <span>{interview.time}</span>
                            </div>
                          </div>
                          <div className="flex flex-col items-end">
                            <Badge 
                              color={interview.status === 'confirmed' ? 'green' : 'yellow'}
                              text={interview.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                            />
                            <Button variant="outline" size="sm" className="mt-2">
                              Details
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-4">No upcoming interviews scheduled</p>
                  )}
                </Card>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Recent Activity */}
                <Card className="p-6">
                  <h2 className="text-xl font-bold text-navyblue mb-4">Recent Activity</h2>
                  <div className="space-y-4">
                    {recentActivities.map(activity => (
                      <div key={activity.id} className="flex items-start">
                        <div className="rounded-full bg-softgray p-2 mr-3">
                          {activity.type === 'view' && <span className="text-blue-500">👀</span>}
                          {activity.type === 'shortlist' && <span className="text-yellow-500">⭐</span>}
                          {activity.type === 'message' && <span className="text-green-500">🔔</span>}
                        </div>
                        <div>
                          <p className="text-sm">
                            {activity.type === 'view' && 'You viewed '}
                            {activity.type === 'shortlist' && 'You shortlisted '}
                            {activity.type === 'message' && 'You messaged '}
                            <span className="font-semibold">{activity.graduateName}</span>
                            's profile
                          </p>
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-4">
                    View All Activity
                  </Button>
                </Card>

                {/* Quick Tips */}
                <Card className="p-6 bg-gradient-to-br from-lightblue to-teal text-white">
                  <h2 className="text-xl font-bold mb-3">Pro Tips</h2>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <div className="rounded-full bg-white bg-opacity-20 p-1 mr-2 mt-0.5">
                        <span className="text-xs">1</span>
                      </div>
                      <p>Use specific skills in your search to find the best match</p>
                    </li>
                    <li className="flex items-start">
                      <div className="rounded-full bg-white bg-opacity-20 p-1 mr-2 mt-0.5">
                        <span className="text-xs">2</span>
                      </div>
                      <p>Shortlist candidates to compare them later</p>
                    </li>
                    <li className="flex items-start">
                      <div className="rounded-full bg-white bg-opacity-20 p-1 mr-2 mt-0.5">
                        <span className="text-xs">3</span>
                      </div>
                      <p>Keep job descriptions clear and specific</p>
                    </li>
                  </ul>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
