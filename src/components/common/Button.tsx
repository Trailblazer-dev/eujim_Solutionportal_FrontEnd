import { ReactNode, ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  isLoading?: boolean;
};

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  isLoading = false,
  type = 'button',
  ...props
}: ButtonProps) => {
  // Base classes for all buttons
  const baseClasses = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  // Classes for different variants
  const variantClasses = {
    primary: "bg-lightblue hover:bg-blue-700 text-white focus:ring-lightblue",
    secondary: "bg-navyblue hover:bg-opacity-90 text-white focus:ring-navyblue",
    outline: "border border-lightblue text-lightblue hover:bg-lightblue hover:bg-opacity-10 focus:ring-lightblue",
    danger: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-600",
  };
  
  // Classes for different sizes
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };
  
  // Disabled state classes
  const disabledClasses = props.disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer";
  
  // Loading state
  const loadingClasses = isLoading ? "relative text-transparent" : "";
  
  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${loadingClasses} ${className}`}
      {...props}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      )}
      {children}
    </button>
  );
};

export default Button;
