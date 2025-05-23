import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: {
    value: number;
    isPositive: boolean;
  };
  period?: string;
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'purple';
  onClick?: () => void;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  icon,
  change,
  period = 'from last month',
  color = 'blue',
  onClick,
}) => {
  const colorClasses = {
    blue: 'bg-blue-100 text-lightblue',
    green: 'bg-green-100 text-green-600',
    yellow: 'bg-yellow-100 text-yellow-600',
    red: 'bg-red-100 text-red-600',
    purple: 'bg-purple-100 text-purple-600',
  };

  return (
    <div 
      className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 ${onClick ? 'cursor-pointer hover:shadow-md transition-shadow' : ''}`}
      onClick={onClick}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <p className="text-2xl font-bold text-navyblue mt-1">{value}</p>
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          {icon}
        </div>
      </div>
      
      {change && (
        <div className="mt-4 flex items-center text-sm">
          <span className={change.isPositive ? 'text-green-600' : 'text-red-600'}>
            {change.isPositive ? (
              <ArrowUpRight size={16} className="inline mr-1" />
            ) : (
              <ArrowDownRight size={16} className="inline mr-1" />
            )}
            {change.value}%
          </span>
          <span className="text-gray-500 ml-1">{period}</span>
        </div>
      )}
    </div>
  );
};

export default DashboardCard;
