import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Pencil, Trash2 } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

interface Education {
  id: number;
  degree: string;
  institution: string;
  startDate: string;
  endDate: string;
  description: string;
}

const Education = () => {
  const navigate = useNavigate();
  const [educationItems, setEducationItems] = useState<Education[]>([
    {
      id: 1,
      degree: 'Bachelor of Science in Computer Science',
      institution: 'University of Nairobi',
      startDate: '2018-09',
      endDate: '2022-06',
      description: 'Graduated with honors. Specialized in software engineering and data science.'
    },
    {
      id: 2,
      degree: 'High School Diploma',
      institution: 'Sunshine Academy',
      startDate: '2014-01',
      endDate: '2017-12',
      description: 'Focused on mathematics and computer studies.'
    }
  ]);

  const [isAddingEducation, setIsAddingEducation] = useState(false);
  const [currentEducation, setCurrentEducation] = useState<Education | null>(null);
  
  const handleAddEducation = () => {
    setCurrentEducation({
      id: Date.now(),
      degree: '',
      institution: '',
      startDate: '',
      endDate: '',
      description: ''
    });
    setIsAddingEducation(true);
  };
  
  const handleEditEducation = (education: Education) => {
    setCurrentEducation(education);
    setIsAddingEducation(true);
  };
  
  const handleDeleteEducation = (id: number) => {
    if (window.confirm('Are you sure you want to delete this education entry?')) {
      setEducationItems(educationItems.filter(item => item.id !== id));
    }
  };
  
  const handleSaveEducation = () => {
    if (!currentEducation) return;
    
    if (educationItems.some(item => item.id === currentEducation.id)) {
      // Update existing education
      setEducationItems(educationItems.map(item => 
        item.id === currentEducation.id ? currentEducation : item
      ));
    } else {
      // Add new education
      setEducationItems([...educationItems, currentEducation]);
    }
    
    setIsAddingEducation(false);
    setCurrentEducation(null);
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
          <h1 className="text-2xl font-bold text-navyblue">Education</h1>
          {!isAddingEducation && (
            <Button onClick={handleAddEducation}>
              <Plus size={18} className="mr-1" />
              Add Education
            </Button>
          )}
        </div>
        
        {isAddingEducation ? (
          <Card className="mb-6">
            <h2 className="text-xl font-semibold mb-4">
              {currentEducation?.degree ? 'Edit Education' : 'Add Education'}
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Degree/Certificate</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={currentEducation?.degree || ''}
                  onChange={(e) => setCurrentEducation({
                    ...currentEducation!,
                    degree: e.target.value
                  })}
                  placeholder="e.g. Bachelor of Science in Computer Science"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={currentEducation?.institution || ''}
                  onChange={(e) => setCurrentEducation({
                    ...currentEducation!,
                    institution: e.target.value
                  })}
                  placeholder="e.g. University of Nairobi"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input
                    type="month"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={currentEducation?.startDate || ''}
                    onChange={(e) => setCurrentEducation({
                      ...currentEducation!,
                      startDate: e.target.value
                    })}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input
                    type="month"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={currentEducation?.endDate || ''}
                    onChange={(e) => setCurrentEducation({
                      ...currentEducation!,
                      endDate: e.target.value
                    })}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded"
                  rows={3}
                  value={currentEducation?.description || ''}
                  onChange={(e) => setCurrentEducation({
                    ...currentEducation!,
                    description: e.target.value
                  })}
                  placeholder="Describe your studies, achievements, etc."
                />
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button 
                  variant="outline"
                  onClick={() => {
                    setIsAddingEducation(false);
                    setCurrentEducation(null);
                  }}
                >
                  Cancel
                </Button>
                <Button onClick={handleSaveEducation}>Save</Button>
              </div>
            </div>
          </Card>
        ) : (
          <div className="space-y-4">
            {educationItems.length === 0 ? (
              <Card className="text-center py-8">
                <p className="text-gray-500 mb-4">No education entries found</p>
                <Button onClick={handleAddEducation}>
                  <Plus size={18} className="mr-1" />
                  Add Education
                </Button>
              </Card>
            ) : (
              educationItems.map((education) => (
                <Card key={education.id} className="relative">
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <button 
                      onClick={() => handleEditEducation(education)}
                      className="p-1 text-gray-500 hover:text-navyblue"
                    >
                      <Pencil size={16} />
                    </button>
                    <button 
                      onClick={() => handleDeleteEducation(education.id)}
                      className="p-1 text-gray-500 hover:text-red-500"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  
                  <h3 className="text-lg font-bold text-navyblue">{education.degree}</h3>
                  <p className="text-gray-700">{education.institution}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(education.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })} - 
                    {new Date(education.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                  </p>
                  
                  {education.description && (
                    <p className="mt-2 text-gray-600">{education.description}</p>
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

export default Education;
