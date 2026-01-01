import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { subscribeNewsletter } from '../../../store/slices/newsletterContactSlice';
import { useToast } from '../../../contexts/ToastContext';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const { newsletterSubscribing } = useSelector(
    (state) => state.newsletterContact
  );
  const { showSuccess, showError } = useToast();

const handleSubmit = async (e) => {
  e.preventDefault();
  if (email.trim()) {
    const result = await dispatch(subscribeNewsletter({ email }));
    if (subscribeNewsletter.fulfilled.match(result)) {
      showSuccess('Successfully subscribed to newsletter!');
    } else if (subscribeNewsletter.rejected.match(result)) {
      showError(result.payload?.message || 'Subscription failed. Please try again.');
    }
    setEmail('');
  }
};


  return (
    <section className="py-6 sm:py-8 bg-gray-50">
      <div className="container mx-auto px-3 sm:px-4 max-w-7xl">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-lg sm:text-xl font-normal mb-2 text-[#0f1111]">Stay Updated</h2>
          <p className="text-xs sm:text-sm text-gray-600 mb-4 leading-relaxed">
            Subscribe to our newsletter for exclusive deals on refurbished devices, new arrivals, and tech tips
          </p>
    
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-3 py-2 text-xs sm:text-sm text-gray-900 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
              required
              disabled={newsletterSubscribing}
            />
            <button
              type="submit"
              disabled={newsletterSubscribing}
              className="bg-green-600 hover:bg-green-700 px-4 py-2 text-xs sm:text-sm text-white font-normal rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {newsletterSubscribing ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
     
          <p className="text-[10px] sm:text-xs text-gray-500 mt-3">
            No spam, unsubscribe at any time
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;