import React, { useState, useRef } from 'react';
import { ZoomIn, ZoomOut } from 'lucide-react';

const ProductImages = ({ product, activeImage, setActiveImage }) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isZooming, setIsZooming] = useState(false);
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

  const handleMouseMove = (e) => {
    if (!containerRef.current || !isZooming) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  const handleMouseEnter = () => {
    if (zoomLevel > 1) {
      setIsZooming(true);
    }
  };

  const handleMouseLeave = () => {
    setIsZooming(false);
  };

  const handleZoomIn = () => {
    setZoomLevel(Math.min(zoomLevel + 0.5, 3));
    setIsZooming(true);
  };

  const handleZoomOut = () => {
    const newZoom = Math.max(zoomLevel - 0.5, 1);
    setZoomLevel(newZoom);
    if (newZoom === 1) {
      setIsZooming(false);
    }
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
    setIsZooming(false);
  };

  return (
    <div className="p-3 sm:p-4 md:p-6">
      <div 
        ref={containerRef}
        className="relative mb-3 sm:mb-4 aspect-square bg-gray-100 rounded-lg overflow-hidden group"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="absolute top-2 right-2 z-20 flex flex-col gap-1 bg-white/90 rounded-md p-1 shadow-md">
          <button
            onClick={handleZoomIn}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
            aria-label="Zoom in"
          >
            <ZoomIn className="h-4 w-4 text-gray-700" />
          </button>
          <button
            onClick={handleZoomOut}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
            aria-label="Zoom out"
          >
            <ZoomOut className="h-4 w-4 text-gray-700" />
          </button>
          {zoomLevel > 1 && (
            <button
              onClick={handleResetZoom}
              className="p-1 text-xs text-gray-600 hover:bg-gray-100 rounded transition-colors"
            >
              Reset
            </button>
          )}
        </div>
        <div 
          className="w-full h-full overflow-hidden"
          style={{
            transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
            transform: isZooming ? `scale(${zoomLevel})` : 'scale(1)',
            transition: isZooming ? 'none' : 'transform 0.3s ease'
          }}
        >
          <img
            ref={imageRef}
            src={productImages[activeImage] || product.image}
            alt={product.name}
            className={`w-full h-full object-contain p-2 sm:p-4 cursor-zoom-in ${product.stock === 0 ? 'opacity-50' : ''}`}
            style={{ pointerEvents: 'none' }}
          />
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
              className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 border-2 rounded-md overflow-hidden ${
                activeImage === index ? 'border-green-600' : 'border-gray-200'
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