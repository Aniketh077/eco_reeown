import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, DollarSign, Wrench, Recycle, Building2 } from 'lucide-react';

const ActionBoxes = () => {
  const navigate = useNavigate();

  const actions = [
    {
      icon: ShoppingBag,
      title: 'Buy',
      description: 'Explore premium refurbished electronics',
      color: 'from-green-500 to-emerald-600',
      hoverColor: 'hover:from-green-600 hover:to-emerald-700',
      action: () => navigate('/products')
    },
    {
      icon: DollarSign,
      title: 'Sell',
      description: 'Sell your old devices for instant cash',
      color: 'from-blue-500 to-cyan-600',
      hoverColor: 'hover:from-blue-600 hover:to-cyan-700',
      action: () => navigate('/sell')
    },
    {
      icon: Wrench,
      title: 'Repair',
      description: 'Get your devices repaired by experts',
      color: 'from-orange-500 to-amber-600',
      hoverColor: 'hover:from-orange-600 hover:to-amber-700',
      action: () => navigate('/repair')
    },
    {
      icon: Recycle,
      title: 'Recycle',
      description: 'Dispose e-waste responsibly',
      color: 'from-purple-500 to-violet-600',
      hoverColor: 'hover:from-purple-600 hover:to-violet-700',
      action: () => navigate('/recycle')
    },
    {
      icon: Building2,
      title: 'Business',
      description: 'Bulk orders for businesses & retailers',
      color: 'from-indigo-500 to-blue-600',
      hoverColor: 'hover:from-indigo-600 hover:to-blue-700',
      action: () => navigate('/business')
    }
  ];

  return (
    <section className="py-6 sm:py-8 bg-white">
      <div className="container mx-auto px-3 sm:px-4 max-w-7xl">
        <div className="mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-normal text-[#0f1111] mb-1">What Would You Like To Do?</h2>
          <p className="text-xs sm:text-sm text-gray-600">Choose from our comprehensive range of services</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3">
          {actions.map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={index}
                onClick={action.action}
                className={`group relative overflow-hidden rounded border border-gray-200 bg-white hover:border-green-500 p-3 sm:p-4 text-left transition-all duration-200 hover:shadow-md`}
              >
                <div className="mb-2">
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-green-700" />
                </div>
                <h3 className="mb-1 text-xs sm:text-sm font-normal text-[#0f1111]">{action.title}</h3>
                <p className="text-[10px] sm:text-xs text-gray-600 leading-relaxed">{action.description}</p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ActionBoxes;
