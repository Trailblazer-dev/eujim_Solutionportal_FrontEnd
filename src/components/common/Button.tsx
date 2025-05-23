import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'default' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'default',
  size = 'md',
  isLoading = false,
  className = '',
  disabled,
  ...props
}) => {
  // Base styles
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lightblue';
  
  // Variant styles
  const variantStyles = {
    default: 'bg-lightblue text-white hover:bg-blue-700 border border-transparent',
    outline: 'bg-transparent text-navyblue border border-lightblue hover:bg-lightblue hover:text-white',
    ghost: 'bg-transparent text-navyblue hover:bg-gray-100 border border-transparent',
    link: 'bg-transparent text-lightblue hover:underline border-none shadow-none p-0'
  };
  
  // Size styles
  const sizeStyles = {
    sm: 'text-sm px-3 py-1.5 rounded',
    md: 'text-base px-4 py-2 rounded-md',
    lg: 'text-lg px-6 py-3 rounded-lg'
  };
  
  // Disabled styles
  const disabledStyles = 'opacity-50 cursor-not-allowed pointer-events-none';
  
  const combinedClassName = `
    ${baseStyles} 
    ${variantStyles[variant]} 
    ${sizeStyles[size]} 
    ${isLoading || disabled ? disabledStyles : ''} 
    ${className}
  `;

  return (
    <button 
      className={combinedClassName} 
      disabled={isLoading || disabled}
      aria-busy={isLoading === true ? true : undefined}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {children}
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
