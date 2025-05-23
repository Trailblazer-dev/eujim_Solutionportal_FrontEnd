import React from 'react';
import {
  Users, Briefcase, Award, AlertTriangle,
  ArrowUpRight, TrendingUp, UserCheck, Activity
} from 'lucide-react';
import DashboardCard from '../../components/admin/DashboardCard';
import DataTable from '../../components/admin/DataTable';
import Button from '../../components/common/Button';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  
  // Mock data for dashboard stats
  const stats = [
    { 
      title: 'Total Users', 
      value: '2,547', 
      icon: <Users size={24} />, 
      change: { value: 12, isPositive: true },
      color: 'blue',
      link: '/admin/users'
    },
    { 
      title: 'Pending Requests', 
      value: '12', 
      icon: <Briefcase size={24} />, 
      change: { value: 8, isPositive: false },
      color: 'yellow',
      link: '/admin/employer-requests'
    },
    { 
      title: 'Certifications', 
      value: '1,254', 
      icon: <Award size={24} />, 
      change: { value: 23, isPositive: true },
      color: 'green',
      link: '/admin/certifications'
    },
    { 
      title: 'Issues', 
      value: '5', 
      icon: <AlertTriangle size={24} />, 
      change: { value: 2, isPositive: false },
      color: 'red',
      link: '/admin/data-quality'
    },
  ];
  
  // Mock data for recent activities
  const recentActivities = [
    { 
      id: 1, 
      user: 'John Smith', 
      action: 'Registered as an Employer', 
      company: 'Tech Innovations Ltd', 
      timestamp: '2023-06-15T09:24:00Z',
      status: 'pending'
    },
    { 
      id: 2, 
      user: 'Sarah Johnson', 
      action: 'Updated certification', 
      company: 'Global Finance Inc', 
      timestamp: '2023-06-15T08:10:00Z',
      status: 'approved'
    },
    { 
      id: 3, 
      user: 'Michael Chen', 
      action: 'Submitted new job posting', 
      company: 'Digitize Solutions', 
      timestamp: '2023-06-14T16:45:00Z',
      status: 'approved'
    },
    { 
      id: 4, 
      user: 'Emma Williams', 
      action: 'Requested account verification', 
      company: 'Creative Minds', 
      timestamp: '2023-06-14T12:30:00Z',
      status: 'pending'
    },
    { 
      id: 5, 
      user: 'James Rodriguez', 
      action: 'Posted graduate opportunity', 
      company: 'Future Tech', 
      timestamp: '2023-06-14T10:15:00Z',
      status: 'approved'
    },
  ];

  // Column definitions for activities table
  const columns = [
    {
      header: 'User',
      accessor: 'user' as const,
      sortable: true,
    },
    {
      header: 'Action',
      accessor: 'action' as const,
      sortable: true,
    },
    {
      header: 'Company',
      accessor: 'company' as const,
      sortable: true,
    },
    {
      header: 'Time',
      accessor: 'timestamp' as const,
      sortable: true,
      render: (value: string) => {
        const date = new Date(value);
        return new Intl.DateTimeFormat('en-US', {
          dateStyle: 'medium',
          timeStyle: 'short'
        }).format(date);
      }
    },
    {
      header: 'Status',
      accessor: 'status' as const,
      sortable: true,
      render: (value: string) => {
        const statusClasses = {
          pending: 'bg-yellow-100 text-yellow-800',
          approved: 'bg-green-100 text-green-800',
          rejected: 'bg-red-100 text-red-800',
        };
        
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusClasses[value as keyof typeof statusClasses]}`}>
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </span>
        );
      }
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-navyblue mb-4 sm:mb-0">Admin Dashboard</h1>
        <div>
          <Button
            leftIcon={<TrendingUp size={16} />}
            onClick={() => navigate('/admin/reports')}
          >
            Generate Report
          </Button>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <DashboardCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            change={stat.change}
            color={stat.color as any}
            onClick={() => navigate(stat.link)}
          />
        ))}
      </div>
      
      {/* Recent Activity Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-navyblue">Recent Activity</h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/admin/employer-requests')}
          >
            View All
          </Button>
        </div>
        
        <DataTable
          columns={columns}
          data={recentActivities}
          keyField="id"
          onRowClick={(item) => {
            // Handle row click based on action type
            if (item.action.includes('Registered as an Employer')) {
              navigate(`/admin/employer-requests`);
            } else if (item.action.includes('certification')) {
              navigate(`/admin/certifications`);
            } else if (item.action.includes('job')) {
              navigate(`/admin/jobs`);
            }
          }}
        />
      </div>
      
      {/* User Activity Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-navyblue mb-4">User Activity</h2>
          <div className="flex items-center justify-center p-6 h-64 border border-dashed border-gray-300 rounded-lg">
            <div className="text-center">
              <Activity size={48} className="mx-auto text-gray-400 mb-2" />
              <p className="text-gray-500">User activity chart will be displayed here</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-navyblue">New Users</h2>
            <Button
              variant="outline"
              size="sm"
              leftIcon={<UserCheck size={16} />}
              onClick={() => navigate('/admin/users')}
            >
              Manage Users
            </Button>
          </div>
          
          <div className="space-y-4">
            {/* Would contain user cards or list here */}
            <div className="flex items-center justify-center p-6 h-64 border border-dashed border-gray-300 rounded-lg">
              <div className="text-center">
                <Users size={48} className="mx-auto text-gray-400 mb-2" />
                <p className="text-gray-500">New users list will be displayed here</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
