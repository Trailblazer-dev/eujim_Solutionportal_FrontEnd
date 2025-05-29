import React from 'react';
import LoadingSpinner from './LoadingSpinner';

interface FullPageLoadingProps {
  message?: string;
}

const FullPageLoading: React.FC<FullPageLoadingProps> = ({ message = 'Loading...' }) => {
  return (
    <div className="fixed inset-0 bg-gray-50 bg-opacity-75 flex flex-col items-center justify-center z-50">
      <LoadingSpinner size="lg" />
      {message && <p className="mt-4 text-gray-700 font-medium">{message}</p>}
    </div>
  );
};

export default FullPageLoading;
