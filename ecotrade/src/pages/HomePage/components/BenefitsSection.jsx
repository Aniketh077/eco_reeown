import React from 'react';
import { Truck, Shield, CircleCheck as CheckCircle, Leaf, Award, RefreshCw } from 'lucide-react';

const BenefitsSection = () => {
  const benefits = [
    {
      icon: CheckCircle,
      title: 'Quality Tested',
      description: 'Every device goes through rigorous 40-point quality checks and certification'
    },
    {
      icon: Shield,
      title: 'Certified Warranty',
      description: 'Up to 12 months warranty on all certified refurbished electronics'
    },
    {
      icon: Leaf,
      title: 'Eco-Friendly',
      description: 'Reduce e-waste and carbon footprint with sustainable refurbished tech'
    },
    {
      icon: Award,
      title: 'Great Savings',
      description: 'Save up to 60% compared to brand new devices with same quality'
    }
  ];

  return (
    <section className="py-6 sm:py-8 bg-white">
      <div className="container mx-auto px-3 sm:px-4 max-w-7xl">
        <div className="mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-normal mb-1 text-[#0f1111]">Why Choose Refurbished?</h2>
          <p className="text-xs sm:text-sm text-gray-600 max-w-2xl">
            Premium quality electronics at unbeatable prices. Good for your wallet, great for the planet.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center bg-white border border-gray-200 rounded p-4 hover:border-green-500 transition-colors">
              <div className="bg-green-50 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3">
                <benefit.icon className="h-5 w-5 text-green-700" />
              </div>
              <h3 className="text-sm font-normal mb-2 text-[#0f1111]">{benefit.title}</h3>
              <p className="text-xs text-gray-600 leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;