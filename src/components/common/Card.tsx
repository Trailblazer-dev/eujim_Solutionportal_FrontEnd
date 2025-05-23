import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '',
  noPadding = false,
  onClick
}) => {
  const baseClasses = "bg-white rounded-lg shadow-sm border border-gray-100";
  const paddingClasses = noPadding ? "" : "p-6";
  const cursorClasses = onClick ? "cursor-pointer hover:shadow-md transition-shadow duration-200" : "";
  
  return (
    <div 
      className={`${baseClasses} ${paddingClasses} ${cursorClasses} ${className}`}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  );
};

export default Card;
