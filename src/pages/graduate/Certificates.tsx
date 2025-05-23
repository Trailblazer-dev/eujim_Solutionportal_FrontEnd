import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Pencil, Trash2, ExternalLink } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

interface Certificate {
  id: number;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  description?: string;
}

const Certificates = () => {
  const navigate = useNavigate();
  const [certificates, setCertificates] = useState<Certificate[]>([
    {
      id: 1,
      name: 'AWS Certified Developer - Associate',
      issuer: 'Amazon Web Services',
      issueDate: '2022-06-15',
      expiryDate: '2025-06-15',
      credentialId: 'AWS-DEV-1234567',
      credentialUrl: 'https://aws.amazon.com/verification',
      description: 'Validates technical expertise in developing and maintaining AWS-based applications.'
    },
    {
      id: 2,
      name: 'React Developer Certification',
      issuer: 'Meta',
      issueDate: '2022-01-10',
      credentialId: 'META-REACT-987654',
      credentialUrl: 'https://www.meta.com/certificates/verify',
      description: 'Advanced proficiency in building React applications.'
    }
  ]);

  const [isAddingCertificate, setIsAddingCertificate] = useState(false);
  const [currentCertificate, setCurrentCertificate] = useState<Certificate | null>(null);
  
  const handleAddCertificate = () => {
    setCurrentCertificate({
      id: Date.now(),
      name: '',
      issuer: '',
      issueDate: '',
    });
    setIsAddingCertificate(true);
  };
  
  const handleEditCertificate = (certificate: Certificate) => {
    setCurrentCertificate(certificate);
    setIsAddingCertificate(true);
  };
  
  const handleDeleteCertificate = (id: number) => {
    if (window.confirm('Are you sure you want to delete this certificate?')) {
      setCertificates(certificates.filter(item => item.id !== id));
    }
  };
  
  const handleSaveCertificate = () => {
    if (!currentCertificate) return;
    
    if (certificates.some(item => item.id === currentCertificate.id)) {
      // Update existing certificate
      setCertificates(certificates.map(item => 
        item.id === currentCertificate.id ? currentCertificate : item
      ));
    } else {
      // Add new certificate
      setCertificates([...certificates, currentCertificate]);
    }
    
    setIsAddingCertificate(false);
    setCurrentCertificate(null);
  };
  
  return (
    <div className="min-h-screen bg-softgray p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <button 
          className="mb-4 flex items-center text-navyblue hover:underline"
          onClick={() => navigate('/graduate')}
        >
          <ArrowLeft size={18} className="mr-1" />
          Back to Dashboard
        </button>
        
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-navyblue">Certifications</h1>
          {!isAddingCertificate && (
            <Button onClick={handleAddCertificate}>
              <Plus size={18} className="mr-1" />
              Add Certificate
            </Button>
          )}
        </div>
        
        {isAddingCertificate ? (
          <Card className="mb-6">
            <h2 className="text-xl font-semibold mb-4">
              {currentCertificate?.name ? 'Edit Certificate' : 'Add Certificate'}
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Certificate Name</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={currentCertificate?.name || ''}
                  onChange={(e) => setCurrentCertificate({
                    ...currentCertificate!,
                    name: e.target.value
                  })}
                  placeholder="e.g. AWS Certified Developer"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Issuing Organization</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={currentCertificate?.issuer || ''}
                  onChange={(e) => setCurrentCertificate({
                    ...currentCertificate!,
                    issuer: e.target.value
                  })}
                  placeholder="e.g. Amazon Web Services"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Issue Date</label>
                  <input
                    type="date"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={currentCertificate?.issueDate || ''}
                    onChange={(e) => setCurrentCertificate({
                      ...currentCertificate!,
                      issueDate: e.target.value
                    })}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date (Optional)</label>
                  <input
                    type="date"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={currentCertificate?.expiryDate || ''}
                    onChange={(e) => setCurrentCertificate({
                      ...currentCertificate!,
                      expiryDate: e.target.value || undefined
                    })}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Credential ID (Optional)</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={currentCertificate?.credentialId || ''}
                  onChange={(e) => setCurrentCertificate({
                    ...currentCertificate!,
                    credentialId: e.target.value || undefined
                  })}
                  placeholder="e.g. ABC123XYZ"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Credential URL (Optional)</label>
                <input
                  type="url"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={currentCertificate?.credentialUrl || ''}
                  onChange={(e) => setCurrentCertificate({
                    ...currentCertificate!,
                    credentialUrl: e.target.value || undefined
                  })}
                  placeholder="e.g. https://verify.example.com/cert/123"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded"
                  rows={3}
                  value={currentCertificate?.description || ''}
                  onChange={(e) => setCurrentCertificate({
                    ...currentCertificate!,
                    description: e.target.value || undefined
                  })}
                  placeholder="Brief description of the certification"
                />
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button 
                  variant="outline"
                  onClick={() => {
                    setIsAddingCertificate(false);
                    setCurrentCertificate(null);
                  }}
                >
                  Cancel
                </Button>
                <Button onClick={handleSaveCertificate}>Save</Button>
              </div>
            </div>
          </Card>
        ) : (
          <div className="space-y-4">
            {certificates.length === 0 ? (
              <Card className="text-center py-8">
                <p className="text-gray-500 mb-4">No certificates found</p>
                <Button onClick={handleAddCertificate}>
                  <Plus size={18} className="mr-1" />
                  Add Certificate
                </Button>
              </Card>
            ) : (
              certificates.map((certificate) => (
                <Card key={certificate.id} className="relative">
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <button 
                      onClick={() => handleEditCertificate(certificate)}
                      className="p-1 text-gray-500 hover:text-navyblue"
                    >
                      <Pencil size={16} />
                    </button>
                    <button 
                      onClick={() => handleDeleteCertificate(certificate.id)}
                      className="p-1 text-gray-500 hover:text-red-500"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  
                  <h3 className="text-lg font-bold text-navyblue">{certificate.name}</h3>
                  <p className="text-gray-700">{certificate.issuer}</p>
                  <p className="text-sm text-gray-500">
                    Issued: {new Date(certificate.issueDate).toLocaleDateString()}
                    {certificate.expiryDate && ` · Expires: ${new Date(certificate.expiryDate).toLocaleDateString()}`}
                  </p>
                  
                  {certificate.credentialId && (
                    <p className="text-sm mt-2">Credential ID: {certificate.credentialId}</p>
                  )}
                  
                  {certificate.credentialUrl && (
                    <a 
                      href={certificate.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-lightblue flex items-center mt-1 hover:underline"
                    >
                      Verify Certificate
                      <ExternalLink size={14} className="ml-1" />
                    </a>
                  )}
                  
                  {certificate.description && (
                    <p className="mt-3 text-gray-600">{certificate.description}</p>
                  )}
                </Card>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Certificates;
