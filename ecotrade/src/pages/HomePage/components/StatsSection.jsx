import React from 'react';
import { Users, Award, TrendingUp, Zap } from 'lucide-react';

const StatsSection = () => {
  const stats = [
    { icon: Users, value: '50K+', label: 'Happy Customers' },
    { icon: Award, value: '100K+', label: 'Devices Refurbished' },
    { icon: TrendingUp, value: '99%', label: 'Satisfaction Rate' },
    { icon: Zap, value: '40-Point', label: 'Quality Check' }
  ];

  return (
    <section className="py-6 sm:py-8 bg-gray-50">
      <div className="container mx-auto px-3 sm:px-4 max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center bg-white border border-gray-200 rounded p-3 sm:p-4">
              <div className="bg-green-50 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center mx-auto mb-2">
                <stat.icon className="h-4 w-4 sm:h-5 sm:w-5 text-green-700" />
              </div>
              <div className="text-base sm:text-lg font-normal text-green-700 mb-1">{stat.value}</div>
              <div className="text-[10px] sm:text-xs text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;