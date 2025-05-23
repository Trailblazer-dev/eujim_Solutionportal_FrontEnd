import React, { useState } from 'react';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import { ReactNode, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: ReactNode;
  helperText?: string;
  fullWidth?: boolean;
  required?: boolean;
}

const Input = ({
  label,
  error,
  icon,
  helperText,
  className = '',
  fullWidth = true,
  required,
  type = 'text',
  ...props
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  
  // Handle password visibility toggle
  const actualType = type === 'password' ? (showPassword ? 'text' : 'password') : type;
  
  // Build class strings
  const containerClasses = `${fullWidth ? 'w-full' : ''} ${className}`;
  
  const inputWrapperClasses = `relative flex items-center rounded-md border ${
    error ? 'border-red-500' : isFocused ? 'border-lightblue ring-2 ring-lightblue ring-opacity-50' : 'border-gray-300'
  } bg-white transition-all duration-200`;
  
  const inputBaseClasses = "w-full px-4 py-2 rounded-md focus:outline-none text-gray-900";
  const inputWithIconClasses = icon ? "pl-10" : "";
  const inputClasses = `${inputBaseClasses} ${inputWithIconClasses}`;

  return (
    <div className={containerClasses}>
      {label && (
        <label 
          htmlFor={props.id || props.name} 
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      
      <div className={inputWrapperClasses}>
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
            {icon}
          </div>
        )}
        
        <input
          type={actualType}
          className={inputClasses}
          aria-invalid={error ? 'true' : 'false'}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          required={required}
          {...props}
        />
        
        {type === 'password' && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 transition-colors"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      
      {(error || helperText) && (
        <div className="mt-1 text-sm">
          {error ? (
            <p className="text-red-500 flex items-center">
              <AlertCircle size={14} className="mr-1" />
              {error}
            </p>
          ) : helperText ? (
            <p className="text-gray-500">{helperText}</p>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default Input;
