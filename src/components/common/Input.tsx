import { ReactNode, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: ReactNode;
  error?: string;
  className?: string;
}

const Input = ({
  label,
  icon,
  error,
  className = '',
  ...props
}: InputProps) => {
  return (
    <div className={`${className}`}>
      {label && (
        <label className="block text-navyblue font-medium mb-1">
          {label}
        </label>
      )}
      
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
            {icon}
          </div>
        )}
        
        <input
          className={`w-full rounded-md border ${error ? 'border-red-500' : 'border-softgray'} 
            ${icon ? 'pl-10' : 'pl-4'} pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-lightblue focus:border-transparent`}
          {...props}
        />
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default Input;
