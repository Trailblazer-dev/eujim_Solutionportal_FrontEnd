import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  footer?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '',
  title,
  footer
}) => {
  return (
    <div 
      className={`bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden ${className}`}
    >
      {title && (
        <div className="border-b border-gray-100 px-6 py-4">
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
      )}
      <div className={`px-6 py-4 ${!title ? '' : ''}`}>
        {children}
      </div>
      {footer && (
        <div className="bg-gray-50 px-6 py-3 border-t border-gray-100">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
