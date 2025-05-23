import React, { useState, useRef } from 'react';
import { User, Upload, X } from 'lucide-react';

interface AvatarUploadProps {
  currentImage?: string;
  onImageChange?: (file: File | null) => void;
  size?: 'small' | 'medium' | 'large';
  name?: string;
  readOnly?: boolean;
}

const AvatarUpload: React.FC<AvatarUploadProps> = ({
  currentImage,
  onImageChange,
  size = 'medium',
  name = '',
  readOnly = false
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImage || null);
  const [isHovered, setIsHovered] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Determine size classes
  const sizeClasses = {
    small: 'w-16 h-16',
    medium: 'w-24 h-24',
    large: 'w-32 h-32'
  };

  // Function to get initials from name
  const getInitials = (name: string) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);

    if (onImageChange) {
      onImageChange(file);
    }
  };

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    if (onImageChange) {
      onImageChange(null);
    }
  };

  if (readOnly) {
    return (
      <div className={`${sizeClasses[size]} relative rounded-full border-4 border-white shadow-md overflow-hidden bg-gray-200 flex items-center justify-center`}>
        {previewUrl ? (
          <img
            src={previewUrl}
            alt={`${name}'s profile`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-500">
            {name ? (
              <span className="text-xl font-bold">{getInitials(name)}</span>
            ) : (
              <User size={sizeClasses[size] === sizeClasses.large ? 48 : 24} />
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={`${sizeClasses[size]} relative rounded-full border-4 border-white shadow-md overflow-hidden bg-gray-200 cursor-pointer transition-all duration-200 ${isHovered ? 'shadow-lg ring-2 ring-lightblue' : ''}`}
      onClick={() => fileInputRef.current?.click()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="button"
      aria-label="Upload profile image"
      tabIndex={0}
    >
      <input
        type="file"
        className="hidden"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageChange}
        aria-label="Profile image upload"
      />

      {previewUrl ? (
        <>
          <img
            src={previewUrl}
            alt="Profile preview"
            className="w-full h-full object-cover"
          />
          <div className={`absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-40 transition-opacity flex items-center justify-center ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <Upload size={24} className="text-white" />
          </div>
          
          {/* Remove button */}
          {isHovered && (
            <button
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 transform translate-x-1/3 -translate-y-1/3"
              onClick={handleRemoveImage}
              aria-label="Remove image"
            >
              <X size={size === 'small' ? 12 : 16} />
            </button>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center w-full h-full text-gray-500 hover:text-lightblue transition-colors">
          {name ? (
            <span className="text-xl font-bold">{getInitials(name)}</span>
          ) : (
            <User size={sizeClasses[size] === sizeClasses.large ? 48 : 24} />
          )}
          {isHovered && <Upload size={16} className="mt-1" />}
        </div>
      )}
    </div>
  );
};

export default AvatarUpload;
