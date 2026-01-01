import React, { useState, useRef, useEffect } from 'react';
import { ZoomIn, X } from 'lucide-react';

const ProductImages = ({ product, activeImage, setActiveImage }) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef(null);
  const containerRef = useRef(null);

  const getProductImages = () => {
    const images = [];

    // Always push the main image first
    if (product.image) {
      images.push(product.image);
    }

    if (product.images && product.images.length > 0) {
      product.images.forEach(img => {
        if (img !== product.image) {
          images.push(img);
        }
      });
    }

    return images;
  };

  const productImages = getProductImages();
  const currentImage = productImages[activeImage] || product.image;

  const handleMouseMove = (e) => {
    if (!containerRef.current || !imageRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setZoomPosition({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
  };

  const handleMouseEnter = () => {
    setIsZoomed(true);
  };

  const handleMouseLeave = () => {
    setIsZoomed(false);
  };

  useEffect(() => {
    setIsZoomed(false);
  }, [activeImage]);

  return (
    <div className="p-3 sm:p-4 md:p-6">
      <div 
        ref={containerRef}
        className="relative mb-3 sm:mb-4 aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-zoom-in group"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img
          ref={imageRef}
          src={currentImage}
          alt={product.name}
          className={`w-full h-full object-contain p-2 sm:p-4 transition-transform duration-300 ${
            product.stock === 0 ? 'opacity-50' : ''
          } ${isZoomed ? 'scale-150' : ''}`}
          style={{
            transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`
          }}
        />
        
        {/* Zoom indicator */}
        {isZoomed && (
          <div 
            className="absolute pointer-events-none z-30 w-32 h-32 border-2 border-green-600 bg-green-600/10 rounded-full"
            style={{
              left: `${mousePosition.x - 64}px`,
              top: `${mousePosition.y - 64}px`,
              display: mousePosition.x > 0 && mousePosition.y > 0 ? 'block' : 'none'
            }}
          />
        )}

        {/* Zoom hint */}
        <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
          <ZoomIn className="h-3 w-3" />
          Hover to zoom
        </div>

        {product.stock === 0 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
            <div className="bg-red-600 text-white px-4 sm:px-8 py-2 sm:py-4 text-base sm:text-xl font-bold rounded-md transform -rotate-12 shadow-lg">
              SOLD OUT
            </div>
          </div>
        )}
        {product.stock > 0 && product.discountPrice && product.discountPrice < product.price &&
         Math.round(((product.price - product.discountPrice) / product.price) * 100) > 0 && (
          <div className="absolute left-2 sm:left-4 top-2 sm:top-4 z-10 bg-red-500 px-2 sm:px-3 py-1 text-xs sm:text-sm font-semibold text-white">
            {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
          </div>
        )}
        {product.stock > 0 && product.newArrival && (
          <div className="absolute right-2 sm:right-4 top-2 sm:top-4 z-10 bg-green-600 px-2 sm:px-3 py-1 text-xs sm:text-sm font-semibold text-white">
            NEW
          </div>
        )}
      </div>
      
      {productImages.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
          {productImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setActiveImage(index)}
              className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 border-2 rounded-md overflow-hidden transition-all ${
                activeImage === index ? 'border-green-600 ring-2 ring-green-200' : 'border-gray-200 hover:border-green-300'
              }`}
            >
              <img
                src={image}
                alt={`${product.name} - view ${index + 1}`}
                className={`w-full h-full object-contain p-1 ${product.stock === 0 ? 'opacity-50' : ''}`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImages;