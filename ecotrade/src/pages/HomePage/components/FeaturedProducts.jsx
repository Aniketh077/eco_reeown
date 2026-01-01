import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProductCard from '../../../components/ui/ProductCard';
import Button from '../../../components/ui/Button';

const FeaturedProducts = ({ products }) => {

  return (
    <section className="py-8 sm:py-12 md:py-16">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 sm:mb-12 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">Featured Products</h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600">Our top certified refurbished products recommended for you</p>
          </div>
          <Link to="/products?filter=featured" className="hidden md:flex items-center text-green-700 hover:text-emerald-600 font-medium text-sm sm:text-base">
            View All <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
          </Link>
        </div>
        
        {/* UPDATED: Grid classes now have md:grid-cols-2 and lg:grid-cols-3 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product, index) => (
            // UPDATED: Hiding logic now starts at 'lg' to match the 3-column layout
            <div key={product._id} className={index === 3 ? 'lg:hidden xl:block' : ''}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        
        <div className="mt-6 sm:mt-8 text-center md:hidden">
          <Link to="/products?filter=featured">
            <Button variant="outline" className="text-sm sm:text-base">View All Featured Products</Button>          
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;