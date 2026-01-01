import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, Facebook, Twitter, Instagram, Youtube, ArrowRight } from 'lucide-react';
import FAQModal from '../FAQModal/FAQModal';

const Footer = () => {
  const [isFAQModalOpen, setIsFAQModalOpen] = useState(false);

  const handleFAQClick = (e) => {
    e.preventDefault();
    setIsFAQModalOpen(true);
  };

  const closeFAQModal = () => {
    setIsFAQModalOpen(false);
  };

  return (
    <>
      <footer className="bg-[#131A22] text-gray-300">
        <div className="container mx-auto px-3 sm:px-4 max-w-7xl">
          {/* Main Footer Content */}
          <div className="py-8 sm:py-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 sm:gap-8">
            {/* Company Info */}
            <div className="col-span-2 sm:col-span-1">
              <Link to="/" className="flex items-center mb-3">
                <span className="text-lg sm:text-xl font-normal text-white">Ree<span className="text-[#10B981]">own</span></span>
              </Link>
              <p className="text-xs text-gray-400 mb-4 leading-relaxed">
                Premium certified refurbished electronics. Quality tested, warranty included.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xs font-medium mb-3 text-white">Get to Know Us</h3>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-xs text-gray-400 hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="text-xs text-gray-400 hover:text-white transition-colors">Contact</Link></li>
                <li><Link to="/products" className="text-xs text-gray-400 hover:text-white transition-colors">Shop</Link></li>
              </ul>
            </div>

            {/* Help & Info */}
            <div>
              <h3 className="text-xs font-medium mb-3 text-white">Let Us Help You</h3>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={handleFAQClick}
                    className="text-xs text-gray-400 hover:text-white transition-colors text-left"
                  >
                    FAQs
                  </button>
                </li>
                <li><a href="tel:8861009443" className="text-xs text-gray-400 hover:text-white transition-colors">Customer Service</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-gray-800 py-4 mt-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-3">
              <p className="text-[11px] text-gray-500 text-center md:text-left">
                &copy; {new Date().getFullYear()} Reeown. All rights reserved.
              </p>
              <div className="flex space-x-4">
                <a href="https://www.youtube.com/@EcoDispose" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors" aria-label="YouTube">
                  <Youtube className="h-4 w-4" />
                </a>
                <a href="https://www.instagram.com/clenrgy.eco.dispose/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors" aria-label="Instagram">
                  <Instagram className="h-4 w-4" />
                </a>
                <a href="https://www.linkedin.com/company/clenrgy-eco-dispose-india-llp/?viewAsMember=true" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors" aria-label="LinkedIn">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.29c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75c.97 0 1.75.79 1.75 1.75s-.78 1.75-1.75 1.75zm13.5 10.29h-3v-4.5c0-1.07-.93-1.5-1.5-1.5s-1.5.43-1.5 1.5v4.5h-3v-9h3v1.29c.63-1.03 1.8-1.29 2.56-1.29 1.84 0 3.44 1.51 3.44 3.75v5.25z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <FAQModal isOpen={isFAQModalOpen} onClose={closeFAQModal} />
    </>
  );
};

export default Footer;
