import React, { useState, useRef, useEffect } from 'react';
import { ZoomIn } from 'lucide-react';

const ProductImages = ({ product, activeImage, setActiveImage }) => {
  const [showZoom, setShowZoom] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef(null);
  const containerRef = useRef(null);
  const zoomRef = useRef(null);

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
    if (!containerRef.current || !imageRef.current || !showZoom) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate percentage position
    const percentX = (x / rect.width) * 100;
    const percentY = (y / rect.height) * 100;

    setMousePosition({ x, y });
    setZoomPosition({ 
      x: Math.max(0, Math.min(100, percentX)), 
      y: Math.max(0, Math.min(100, percentY)) 
    });
  };

  const handleMouseEnter = () => {
    setShowZoom(true);
  };

  const handleMouseLeave = () => {
    setShowZoom(false);
  };

  useEffect(() => {
    setShowZoom(false);
  }, [activeImage]);

  return (
    <div className="p-2 sm:p-3 md:p-4">
      <div className="relative">
        {/* Main Image Container */}
        <div 
          ref={containerRef}
          className="relative mb-2 sm:mb-3 aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-crosshair group"
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <img
            ref={imageRef}
            src={currentImage}
            alt={product.name}
            className={`w-full h-full object-contain p-2 sm:p-3 ${
              product.stock === 0 ? 'opacity-50' : ''
            }`}
          />
          
          {/* Zoom Lens - Magnifying Glass Effect */}
          {showZoom && (
            <>
              {/* Lens overlay on main image - only on desktop */}
              <div 
                className="absolute pointer-events-none z-30 border-2 border-green-600 bg-green-600/20 rounded-full hidden md:block"
                style={{
                  width: '120px',
                  height: '120px',
                  left: `${mousePosition.x}px`,
                  top: `${mousePosition.y}px`,
                  display: mousePosition.x > 0 && mousePosition.y > 0 ? 'block' : 'none',
                  transform: 'translate(-50%, -50%)',
                  boxShadow: '0 0 0 2px white, 0 0 10px rgba(0,0,0,0.3)'
                }}
              />
              
              {/* Zoomed Image Preview - Side Panel (Desktop only) */}
              <div 
                ref={zoomRef}
                className="absolute left-full ml-4 top-0 w-80 h-80 bg-white border-2 border-gray-300 rounded-lg shadow-2xl overflow-hidden z-40 hidden md:block"
                style={{
                  display: showZoom && mousePosition.x > 0 && mousePosition.y > 0 ? 'block' : 'none'
                }}
              >
                <div 
                  className="w-full h-full relative"
                  style={{
                    backgroundImage: `url(${currentImage})`,
                    backgroundSize: '300%',
                    backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                    backgroundRepeat: 'no-repeat',
                    imageRendering: 'crisp-edges'
                  }}
                />
              </div>
            </>
          )}

          {/* Zoom hint */}
          <div className="absolute bottom-2 right-2 bg-black/60 text-white px-2 py-1 rounded text-[10px] sm:text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 pointer-events-none">
            <ZoomIn className="h-3 w-3" />
            <span className="hidden sm:inline">Hover to zoom</span>
            <span className="sm:hidden">Zoom</span>
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
      </div>
      
      {productImages.length > 1 && (
        <div className="flex space-x-1.5 sm:space-x-2 overflow-x-auto pb-1 sm:pb-2 scrollbar-hide">
          {productImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setActiveImage(index)}
              className={`flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 border-2 rounded-md overflow-hidden transition-all ${
                activeImage === index ? 'border-green-600 ring-2 ring-green-200' : 'border-gray-200 hover:border-green-300'
              }`}
            >
              <img
                src={image}
                alt={`${product.name} - view ${index + 1}`}
                className={`w-full h-full object-contain p-0.5 sm:p-1 ${product.stock === 0 ? 'opacity-50' : ''}`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImages;