import React from 'react';
import { Link } from 'react-router-dom';

const BrandsSection = ({ types }) => {
  // Add comprehensive safety checks to prevent React child errors
  if (!types || !Array.isArray(types) || types.length === 0) {
    return null;
  }

  // Filter and validate types to ensure they have required properties
  const validTypes = types.filter(type => {
    if (!type || typeof type !== 'object') {
      console.warn('Invalid type object:', type);
      return false;
    }
    
    // Ensure we have essential data as stringsa
    const typeId = type._id ? String(type._id) : (type.id ? String(type.id) : '');
    const typeName = type.name ? String(type.name) : '';
    
    if (!typeId || !typeName) {
      console.warn('Missing essential type data:', { typeId, typeName });
      return false;
    }
    
    return true;
  });

  // Don't render if no valid types
  if (validTypes.length === 0) {
    return null;
  }

  return (
    <section className="py-8 sm:py-12 bg-white">
      <div className="container mx-auto px-3 sm:px-4 max-w-7xl">
        <div className="mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-normal mb-1 text-[#0f1111]">Shop by Brand</h2>
          <p className="text-xs sm:text-sm text-gray-600">
            Browse certified refurbished products from trusted brands
          </p>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-3 sm:gap-4">
          {validTypes.map((type, index) => {
            // Safely extract type properties as strings
            const typeId = type._id ? String(type._id) : (type.id ? String(type.id) : '');
            const typeName = type.name ? String(type.name) : '';
            const typeLogo = type.logo && typeof type.logo === 'string' ? String(type.logo) : null;

            return (
              <Link
                key={`brand-${typeId}-${index}`}
                to={`/products?types=${encodeURIComponent(typeName)}`}
                className="bg-white border border-gray-200 rounded p-3 sm:p-4 flex flex-col items-center justify-center transition-all hover:border-green-500 hover:shadow-md group"
              >
                {typeLogo ? (
                  <div className="w-full h-12 sm:h-14 mb-2 flex items-center justify-center">
                    <img
                      src={typeLogo}
                      alt={`${typeName} logo`}
                      className="max-w-full max-h-full object-contain"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        const fallback = e.target.nextElementSibling;
                        if (fallback) {
                          fallback.style.display = 'flex';
                        }
                      }}
                    />
                    <div className="hidden w-10 h-10 bg-gray-100 rounded items-center justify-center group-hover:bg-green-50 transition-colors">
                      <span className="text-sm font-medium text-green-700">
                        {typeName.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="w-10 h-10 mb-2 bg-gray-100 rounded flex items-center justify-center group-hover:bg-green-50 transition-colors">
                    <span className="text-sm font-medium text-green-700">
                      {typeName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                <span className="text-[11px] sm:text-xs font-normal text-gray-700 group-hover:text-green-700 transition-colors text-center line-clamp-2">
                  {typeName}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BrandsSection;