import React from 'react';

export type BadgeVariant = 
  | 'default' 
  | 'primary' 
  | 'secondary' 
  | 'success' 
  | 'danger' 
  | 'warning' 
  | 'info';

export type BadgeSize = 'sm' | 'md' | 'lg';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
  rounded?: boolean;
  onClick?: () => void;
  removable?: boolean;
  onRemove?: () => void;
  icon?: React.ReactNode;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  rounded = false,
  onClick,
  removable = false,
  onRemove,
  icon
}) => {
  // Define variant styles
  const variantStyles = {
    default: 'bg-gray-100 text-gray-800',
    primary: 'bg-lightblue bg-opacity-10 text-lightblue',
    secondary: 'bg-gray-200 text-gray-800',
    success: 'bg-green-100 text-green-800',
    danger: 'bg-red-100 text-red-800',
    warning: 'bg-yellow-100 text-yellow-800',
    info: 'bg-blue-100 text-blue-800'
  };

  // Define size styles
  const sizeStyles = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-0.5',
    lg: 'text-base px-3 py-1'
  };

  // Rounded styles
  const roundedStyles = rounded ? 'rounded-full' : 'rounded';

  // Interactive styles
  const interactiveStyles = onClick 
    ? 'cursor-pointer hover:bg-opacity-80 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lightblue' 
    : '';

  return (
    <span 
      className={`
        inline-flex items-center justify-center font-medium ${variantStyles[variant]} 
        ${sizeStyles[size]} ${roundedStyles} ${interactiveStyles} ${className}
      `}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {icon && <span className="mr-1">{icon}</span>}
      
      {children}
      
      {removable && onRemove && (
        <button 
          type="button" 
          className={`
            ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full text-current
            hover:bg-opacity-20 hover:bg-gray-900 focus:outline-none
          `}
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          aria-label="Remove"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 20 20" 
            fill="currentColor" 
            className="w-3 h-3"
          >
            <path 
              fillRule="evenodd" 
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" 
              clipRule="evenodd" 
            />
          </svg>
        </button>
      )}
    </span>
  );
};

export default Badge;
