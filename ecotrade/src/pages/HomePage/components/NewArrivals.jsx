import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProductCard from '../../../components/ui/ProductCard';
import Button from '../../../components/ui/Button';

const NewArrivals = ({ products }) => {

  return (
    <section className="py-6 sm:py-8 bg-white">
      <div className="container mx-auto px-3 sm:px-4 max-w-7xl">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-normal text-[#0f1111]">New Arrivals</h2>
          <Link to="/products?filter=new" className="hidden sm:flex items-center text-xs text-green-700 hover:text-green-800">
            See more <ArrowRight className="ml-1 h-3 w-3" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3">
           {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
        
        <div className="mt-4 text-center sm:hidden">
          <Link to="/products?filter=new" className="text-xs text-green-700 hover:underline">
            See more →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;