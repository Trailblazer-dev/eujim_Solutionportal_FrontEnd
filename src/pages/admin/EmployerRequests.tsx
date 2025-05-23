import React, { useState } from 'react';
import DataTable from '../../components/admin/DataTable';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import { 
  CheckCircle, XCircle, AlertCircle, Eye, 
  Plus, Download, RefreshCw, FileText
} from 'lucide-react';

interface EmployerRequest {
  id: number;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  industry: string;
  size: string;
  status: 'pending' | 'approved' | 'rejected';
  dateSubmitted: string;
}

const EmployerRequests: React.FC = () => {
  const [selectedRequest, setSelectedRequest] = useState<EmployerRequest | null>(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [actionModalOpen, setActionModalOpen] = useState(false);
  const [actionType, setActionType] = useState<'approve' | 'reject' | null>(null);
  const [actionReason, setActionReason] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Mock data
  const employerRequests: EmployerRequest[] = [
    {
      id: 1,
      companyName: 'Tech Innovations Ltd',
      contactPerson: 'John Smith',
      email: 'john.smith@techinnovations.com',
      phone: '+254 712 345 678',
      industry: 'Technology',
      size: '50-200',
      status: 'pending',
      dateSubmitted: '2023-06-15T09:24:00Z',
    },
    {
      id: 2,
      companyName: 'Global Finance Inc',
      contactPerson: 'Sarah Johnson',
      email: 'sarah.j@globalfinance.com',
      phone: '+254 723 456 789',
      industry: 'Finance',
      size: '200-500',
      status: 'approved',
      dateSubmitted: '2023-06-14T10:15:00Z',
    },
    {
      id: 3,
      companyName: 'Creative Minds',
      contactPerson: 'Emma Williams',
      email: 'emma@creativeminds.co.ke',
      phone: '+254 734 567 890',
      industry: 'Design',
      size: '10-50',
      status: 'rejected',
      dateSubmitted: '2023-06-13T14:30:00Z',
    },
    {
      id: 4,
      companyName: 'Future Technologies',
      contactPerson: 'Michael Wong',
      email: 'michael@futuretech.com',
      phone: '+254 745 678 901',
      industry: 'Technology',
      size: '50-200',
      status: 'pending',
      dateSubmitted: '2023-06-12T11:45:00Z',
    },
    {
      id: 5,
      companyName: 'Eco Solutions',
      contactPerson: 'David Kariuki',
      email: 'david@ecosolutions.co.ke',
      phone: '+254 756 789 012',
      industry: 'Environmental',
      size: '10-50',
      status: 'pending',
      dateSubmitted: '2023-06-11T08:20:00Z',
    },
  ];
  
  // Column definitions
  const columns = [
    {
      header: 'Company',
      accessor: 'companyName' as const,
      sortable: true,
    },
    {
      header: 'Contact Person',
      accessor: 'contactPerson' as const,
      sortable: true,
    },
    {
      header: 'Industry',
      accessor: 'industry' as const,
      sortable: true,
    },
    {
      header: 'Size',
      accessor: 'size' as const,
      sortable: true,
    },
    {
      header: 'Date Submitted',
      accessor: 'dateSubmitted' as const,
      sortable: true,
      render: (value: string) => {
        const date = new Date(value);
        return new Intl.DateTimeFormat('en-US', {
          dateStyle: 'medium',
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
    {
      header: 'Actions',
      accessor: 'id' as const,
      render: (value: number, item: EmployerRequest) => (
        <div className="flex space-x-2 justify-end">
          <button
            className="p-1 rounded-full hover:bg-gray-100"
            onClick={(e) => {
              e.stopPropagation();
              handleViewRequest(item);
            }}
          >
            <Eye size={18} className="text-lightblue" />
          </button>
          
          {item.status === 'pending' && (
            <>
              <button
                className="p-1 rounded-full hover:bg-gray-100"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAction(item, 'approve');
                }}
              >
                <CheckCircle size={18} className="text-green-500" />
              </button>
              
              <button
                className="p-1 rounded-full hover:bg-gray-100"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAction(item, 'reject');
                }}
              >
                <XCircle size={18} className="text-red-500" />
              </button>
            </>
          )}
        </div>
      ),
    },
  ];
  
  const handleViewRequest = (request: EmployerRequest) => {
    setSelectedRequest(request);
    setViewModalOpen(true);
  };
  
  const handleAction = (request: EmployerRequest, action: 'approve' | 'reject') => {
    setSelectedRequest(request);
    setActionType(action);
    setActionReason('');
    setActionModalOpen(true);
  };
  
  const handleSubmitAction = async () => {
    if (!selectedRequest || !actionType) return;
    
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real application, you would call an API here
    console.log('Action:', actionType, 'Request ID:', selectedRequest.id, 'Reason:', actionReason);
    
    setIsLoading(false);
    setActionModalOpen(false);
    setActionReason('');
    setActionType(null);
    setSelectedRequest(null);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-navyblue mb-4 sm:mb-0">Employer Requests</h1>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            leftIcon={<RefreshCw size={16} />}
            onClick={() => console.log('Refresh data')}
          >
            Refresh
          </Button>
          <Button
            variant="outline"
            leftIcon={<Download size={16} />}
            onClick={() => console.log('Export data')}
          >
            Export
          </Button>
        </div>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-yellow-100 text-yellow-800 mr-4">
              <AlertCircle size={24} />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Pending</h3>
              <p className="text-2xl font-bold text-navyblue">
                {employerRequests.filter(r => r.status === 'pending').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-green-100 text-green-800 mr-4">
              <CheckCircle size={24} />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Approved</h3>
              <p className="text-2xl font-bold text-navyblue">
                {employerRequests.filter(r => r.status === 'approved').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-red-100 text-red-800 mr-4">
              <XCircle size={24} />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Rejected</h3>
              <p className="text-2xl font-bold text-navyblue">
                {employerRequests.filter(r => r.status === 'rejected').length}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Data Table */}
      <DataTable
        columns={columns}
        data={employerRequests}
        keyField="id"
        onRowClick={handleViewRequest}
        actions={
          <Button
            leftIcon={<Plus size={16} />}
            onClick={() => console.log('Add new employer')}
          >
            Add Employer
          </Button>
        }
      />
      
      {/* View Request Modal */}
      {selectedRequest && (
        <Modal
          isOpen={viewModalOpen}
          onClose={() => setViewModalOpen(false)}
          title="Employer Request Details"
          size="lg"
          footer={
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setViewModalOpen(false)}
              >
                Close
              </Button>
              {selectedRequest.status === 'pending' && (
                <>
                  <Button
                    variant="outline"
                    leftIcon={<XCircle size={16} />}
                    className="text-red-600 border-red-600 hover:bg-red-50"
                    onClick={() => {
                      setViewModalOpen(false);
                      handleAction(selectedRequest, 'reject');
                    }}
                  >
                    Reject
                  </Button>
                  <Button
                    leftIcon={<CheckCircle size={16} />}
                    onClick={() => {
                      setViewModalOpen(false);
                      handleAction(selectedRequest, 'approve');
                    }}
                  >
                    Approve
                  </Button>
                </>
              )}
            </div>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Company Information</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-500">Company Name</p>
                  <p className="text-navyblue">{selectedRequest.companyName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Industry</p>
                  <p className="text-navyblue">{selectedRequest.industry}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Company Size</p>
                  <p className="text-navyblue">{selectedRequest.size} employees</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Date Submitted</p>
                  <p className="text-navyblue">
                    {new Date(selectedRequest.dateSubmitted).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Contact Information</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-500">Contact Person</p>
                  <p className="text-navyblue">{selectedRequest.contactPerson}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="text-navyblue">{selectedRequest.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Phone</p>
                  <p className="text-navyblue">{selectedRequest.phone}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Status</p>
                  <p>
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium 
                      ${selectedRequest.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                        selectedRequest.status === 'approved' ? 'bg-green-100 text-green-800' : 
                        'bg-red-100 text-red-800'}`}
                    >
                      {selectedRequest.status.charAt(0).toUpperCase() + selectedRequest.status.slice(1)}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="font-medium text-gray-900 mb-2">Documents</h3>
            <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center">
                <FileText size={20} className="text-gray-400 mr-2" />
                <span className="text-navyblue">Company Registration Certificate</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                leftIcon={<Eye size={16} />}
                onClick={() => console.log('View document')}
              >
                View
              </Button>
            </div>
          </div>
        </Modal>
      )}
      
      {/* Action Modal (Approve/Reject) */}
      <Modal
        isOpen={actionModalOpen}
        onClose={() => setActionModalOpen(false)}
        title={actionType === 'approve' ? 'Approve Employer Request' : 'Reject Employer Request'}
        footer={
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setActionModalOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmitAction}
              isLoading={isLoading}
              className={actionType === 'reject' ? 'bg-red-600 hover:bg-red-700' : ''}
            >
              {actionType === 'approve' ? 'Approve' : 'Reject'}
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          <p>
            {actionType === 'approve' 
              ? 'Are you sure you want to approve this employer registration request?' 
              : 'Are you sure you want to reject this employer registration request?'}
          </p>
          
          {selectedRequest && (
            <div className="bg-gray-50 p-3 rounded">
              <p className="font-medium">{selectedRequest.companyName}</p>
              <p className="text-sm text-gray-600">{selectedRequest.contactPerson} - {selectedRequest.email}</p>
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {actionType === 'approve' ? 'Notes (Optional)' : 'Reason for Rejection'}
            </label>
            <textarea
              value={actionReason}
              onChange={(e) => setActionReason(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-lightblue focus:border-lightblue"
              rows={4}
              required={actionType === 'reject'}
              placeholder={actionType === 'approve' 
                ? 'Add any notes about this approval...' 
                : 'Please provide a reason for rejection...'}
            ></textarea>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default EmployerRequests;
