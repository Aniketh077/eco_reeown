import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Shield, Package, Award, ArrowRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCollections } from "../../../store/slices/collectionSlice";
import { fetchCollections as fetchCollectionsWithTypes } from "../../../store/slices/productSlice";

const CollectionCards = () => {
  const dispatch = useDispatch();
  const { collections } = useSelector((state) => state.collections);
  const { collections: collectionsWithTypes } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchCollections({ includeInactive: false }));
    dispatch(fetchCollectionsWithTypes());
  }, [dispatch]);

  // Comprehensive safety checks to prevent React child errors
  if (!collections || !Array.isArray(collections) || collections.length === 0) {
    return null;
  }

  // Safely process collections with extensive validation
  const displayCollections = collections
    .slice(0, 8) // Show more collections in horizontal scroll
    .map((collection, index) => {
      // Ensure collection is a valid object with required properties
      if (!collection || typeof collection !== 'object') {
        console.warn('Invalid collection object:', collection);
        return null;
      }

      // Safely extract collection properties as strings only
      const collectionId = collection._id ? String(collection._id) : (collection.id ? String(collection.id) : '');
      const collectionName = collection.name ? String(collection.name) : '';
      const collectionSlug = collection.slug ? String(collection.slug) : collectionName.toLowerCase().replace(/\s+/g, '-');
      const collectionImage = collection.image ? String(collection.image) : "https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg";

      // Skip if essential data is missing
      if (!collectionId || !collectionName) {
        console.warn('Missing essential collection data:', { collectionId, collectionName });
        return null;
      }

      // Safely find matching collection with types
      const collectionWithTypes = Array.isArray(collectionsWithTypes)
        ? collectionsWithTypes.find(c => {
            if (!c || typeof c !== 'object') return false;
            const cId = c._id ? String(c._id) : (c.id ? String(c.id) : '');
            const cName = c.name ? String(c.name) : '';
            return cId === collectionId || cName === collectionName;
          })
        : null;

      // Safely extract types with validation - ensure only strings are used
      const types = [];
      if (collectionWithTypes && Array.isArray(collectionWithTypes.types)) {
        collectionWithTypes.types.slice(0, 2).forEach(type => {
          if (type && typeof type === 'object' && type.name) {
            const typeName = String(type.name);
            if (typeName) {
              types.push(typeName);
            }
          }
        });
      }

      // Get product count from the collection
      const productCount = collection.productCount || 0;

      return {
        id: collectionId,
        title: collectionName,
        imageUrl: collectionImage,
        exploreUrl: `/products/${collectionSlug}`,
        types: types,
        productCount: productCount
      };
    })
    .filter(Boolean); // Remove null entries

  // Don't render if no valid collections
  if (displayCollections.length === 0) {
    return null;
  }

  return (
    <section className="py-6 sm:py-8 bg-white">
      <div className="container mx-auto px-3 sm:px-4 max-w-7xl">
        <div className="mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-normal mb-1 text-[#0f1111]">Shop by Category</h2>
          <p className="text-xs sm:text-sm text-gray-600">
            Discover our premium certified refurbished electronics across different categories
          </p>
        </div>
        
        {/* Grid Collection Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {displayCollections.map((collection, index) => (
            <Link
              key={collection.id}
              to={collection.exploreUrl}
              className="bg-white border border-gray-200 rounded hover:border-green-500 transition-all duration-200 overflow-hidden group"
            >
              {/* Image Section */}
              <div className="relative h-32 sm:h-40 overflow-hidden bg-gray-50">
                <img
                  src={collection.imageUrl}
                  alt={collection.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {collection.productCount > 0 && (
                  <div className="absolute top-1 right-1 bg-white/90 text-gray-800 px-1.5 py-0.5 rounded text-[10px] font-medium">
                    {collection.productCount}
                  </div>
                )}
              </div>

              {/* Content Section */}
              <div className="p-2 sm:p-3">
                <h3 className="text-xs sm:text-sm font-normal text-[#0f1111] mb-1.5 line-clamp-2 group-hover:text-green-700 transition-colors">
                  {collection.title}
                </h3>
                <span className="text-[10px] sm:text-xs text-green-700">Shop now →</span>
              </div>
            </Link>
          ))}

        </div>
      </div>
    </section>
  );
};

export default CollectionCards;