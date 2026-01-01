import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';

const PromotionalBanner = () => {
  return (
    <section className="py-6 sm:py-8 bg-gray-50">
      <div className="container mx-auto px-3 sm:px-4 max-w-7xl">
        <div className="bg-white border border-gray-200 rounded p-4 sm:p-6 text-center">
          <h2 className="text-base sm:text-lg font-normal mb-2 text-[#0f1111]">Premium Refurbished Electronics</h2>
          <p className="text-xs sm:text-sm text-gray-600 mb-4 leading-relaxed">
            Save up to 60% on certified refurbished devices with warranty and quality guarantee!
          </p>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center">
            <Link to="/products?filter=featured">
              <button className="bg-green-600 hover:bg-green-700 text-white font-normal py-2 px-4 rounded text-xs sm:text-sm transition-colors">
                Shop Certified Devices
              </button>
            </Link>
            <Link to="/products">
              <button className="border border-gray-300 text-gray-700 hover:bg-gray-50 font-normal py-2 px-4 rounded text-xs sm:text-sm transition-colors">
                Browse All Electronics
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromotionalBanner;