import React, { useState, useEffect } from 'react';
import { Minus, Plus, Check, ShoppingCart, Star, Truck as TruckIcon, ShieldCheck, Heart, Zap, TrendingDown, Percent, Calculator, CheckCircle, Bell } from 'lucide-react';
import Button from '../../../components/ui/Button';
import { useAuth } from '../../../contexts/AuthContext';
import { useDispatch } from 'react-redux';
import { setUserWishlist } from '../../../store/slices/authSlice';
import { useToast } from '../../../contexts/ToastContext';
import { wishlistAPI } from '../../../api/wishlistAPI';
import stockNotificationAPI from '../../../api/stockNotificationAPI';

const ProductInfo = ({
  product,
  quantity,
  incrementQuantity,
  decrementQuantity,
  setQuantity,
  handleAddToCart,
  isDescriptionExpanded,
  setIsDescriptionExpanded,
  collectionName,
  scrollToReviews
}) => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isWishlistLoading, setIsWishlistLoading] = useState(false);
  const [notificationEmail, setNotificationEmail] = useState('');
  const [notificationPhone, setNotificationPhone] = useState('');
  const [notificationChannels, setNotificationChannels] = useState({
    email: true,
    sms: false,
    whatsapp: false
  });
  const [showNotificationForm, setShowNotificationForm] = useState(false);
  const [isNotificationLoading, setIsNotificationLoading] = useState(false);

  useEffect(() => {
    if (user && user.wishlist) {
      setIsInWishlist(user.wishlist.some(id => id === product._id || id._id === product._id));
    }
    if (user && user.email) {
      setNotificationEmail(user.email);
    }
  }, [user, product._id]);
  // Safely extract type name as string with comprehensive validation
  let typeName = 'Refurbished Electronics';
  if (product && product.type) {
    if (typeof product.type === 'string' && product.type.trim()) {
      typeName = product.type.trim();
    } else if (typeof product.type === 'object' && product.type.name) {
      typeName = String(product.type.name).trim();
    }
  }

  // Safely extract collection name for display
  let safeCollectionName = 'Electronics';
  if (typeof collectionName === 'string' && collectionName.trim() && collectionName !== 'Unknown') {
    safeCollectionName = collectionName.trim();
  }

  // Calculate savings and discount percentage
  const originalPrice = product.originalPrice || product.price;
  const currentPrice = product.discountPrice || product.price;
  const savings = originalPrice - currentPrice;
  const discountPercentage = originalPrice > currentPrice ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100) : 0;
  const totalSavings = savings * quantity;

  const handleToggleWishlist = async () => {
    if (!user) {
      showToast('Please login to manage wishlist', 'error');
      return;
    }

    setIsWishlistLoading(true);
    try {
      const response = await wishlistAPI.toggleWishlist(product._id);
      setIsInWishlist(response.isInWishlist);
      if (response.wishlist) {
        dispatch(setUserWishlist(response.wishlist));
      }
      showToast(
        response.isInWishlist ? 'Added to wishlist!' : 'Removed from wishlist',
        'success'
      );
    } catch (error) {
      showToast(error.response?.data?.message || 'Failed to update wishlist', 'error');
    } finally {
      setIsWishlistLoading(false);
    }
  };

  const handleNotifyMe = async (e) => {
    e.preventDefault();
    if (!notificationEmail) {
      showToast('Please enter your email', 'error');
      return;
    }

    if ((notificationChannels.sms || notificationChannels.whatsapp) && !notificationPhone) {
      showToast('Please enter your phone number for SMS/WhatsApp notifications', 'error');
      return;
    }

    setIsNotificationLoading(true);
    try {
      await stockNotificationAPI.requestNotification(
        product._id,
        notificationEmail,
        notificationPhone || undefined,
        notificationChannels
      );
      showToast('You will be notified when this product is back in stock!', 'success');
      setShowNotificationForm(false);
    } catch (error) {
      showToast(error.response?.data?.message || 'Failed to subscribe to notifications', 'error');
    } finally {
      setIsNotificationLoading(false);
    }
  };

  return (
    <div className="p-3 sm:p-4 flex flex-col">
      <div className="mb-1 text-[11px] text-gray-500">{typeName}</div>
      <h1 className="text-base sm:text-lg md:text-xl font-normal mb-2 break-words overflow-hidden text-[#0f1111] leading-snug">{product.name}</h1>
      
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
        <div className="flex items-center">
          {[1, 2, 3, 4, 5].map((star) => {
            const fillPercent = Math.min(Math.max(product.rating - (star - 1), 0), 1) * 100;

            return (
              <div key={star} className="relative w-4 h-4 sm:w-5 sm:h-5 mr-0.5">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 text-gray-200" fill="#E0E0E0" />
                <div
                  className="absolute top-0 left-0 overflow-hidden"
                  style={{ width: `${fillPercent}%` }}
                >
                  <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" fill="#FCD34D" />
                </div>
              </div>
            );
          })}
          <span className="ml-1 sm:ml-2 text-xs sm:text-sm font-medium">{product.rating}</span>
        </div>
        <span className="text-gray-300 hidden sm:inline">|</span>
        <button
          onClick={scrollToReviews}
          className="text-xs sm:text-sm text-gray-500 hover:text-green-700 hover:underline transition-colors duration-200 cursor-pointer"
        >
          {product.reviewCount} reviews
        </button>

        {/* Quality Check Badge */}
        {product.qualityCheckPoints && (
          <>
            <span className="text-gray-300 hidden sm:inline">|</span>
            <div className="bg-green-50 border border-green-200 rounded-full px-2 sm:px-3 py-1 flex items-center">
              <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 mr-1 sm:mr-1.5" />
              <span className="text-xs sm:text-sm font-semibold text-green-700">
                {product.qualityCheckPoints}-Point Quality Check
              </span>
            </div>
          </>
        )}
      </div>
      
      {/* Price Display */}
      <div className="mb-4 sm:mb-5">
        <div className="bg-white border border-gray-200 rounded p-3 sm:p-4">
          <div className="flex items-baseline gap-2 mb-2 flex-wrap">
            <span className="text-lg sm:text-xl md:text-2xl font-normal text-green-700">
              ₹{currentPrice.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
            </span>
            {originalPrice > currentPrice && (
              <span className="text-xs sm:text-sm text-gray-500 line-through">
                ₹{originalPrice.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
              </span>
            )}
            {discountPercentage > 0 && (
              <span className="bg-red-500 text-white px-1.5 py-0.5 rounded text-[10px] sm:text-xs font-medium">
                {discountPercentage}% OFF
              </span>
            )}
          </div>
        </div>
      </div>
      
      <div className="mb-3 sm:mb-4">
        <p className={`text-xs sm:text-sm text-gray-600 leading-relaxed ${isDescriptionExpanded ? '' : 'line-clamp-3'}`}>
          {product.description}
        </p>
        {product.description && product.description.length > 150 && (
          <button
            onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
            className="text-green-700 text-[11px] sm:text-xs font-normal hover:text-green-800 mt-1"
          >
            {isDescriptionExpanded ? 'Show less' : 'Read more'}
          </button>
        )}
      </div>
      
      {/* Key Features */}
      {product.features && product.features.length > 0 && (
        <div className="mb-3 sm:mb-4">
          <h3 className="text-xs sm:text-sm font-normal mb-2 text-[#0f1111]">Key Features</h3>
          <ul className="space-y-1">
            {product.features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <Check className="h-3 w-3 text-green-700 mr-1.5 flex-shrink-0 mt-0.5" />
                <span className="text-xs text-gray-600 leading-relaxed">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Stock */}
      <div className="mb-4 sm:mb-6">
        <div className="flex items-center">
          <div className={`h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full mr-2 ${
            product.stock > 5 ? 'bg-green-500' :
            product.stock > 0 ? 'bg-yellow-500' : 'bg-red-500'
          }`}></div>
          <span className={`text-xs sm:text-sm font-medium ${product.stock === 0 ? 'text-red-600' : ''}`}>
            {product.stock > 5
              ? 'In Stock'
              : product.stock > 0
              ? `Low Stock (${product.stock} left)`
              : 'Sold Out'}
          </span>
        </div>
        {product.stock === 0 && (
          <div className="mt-3 space-y-3">
            <div className="bg-red-50 border border-red-200 rounded-md p-3">
              <p className="text-sm text-red-700 font-medium mb-2">
                This item is currently out of stock.
              </p>
              {!showNotificationForm && (
                <button
                  onClick={() => setShowNotificationForm(true)}
                  className="text-sm text-green-700 font-semibold hover:text-green-800 flex items-center"
                >
                  <Bell className="h-4 w-4 mr-1" />
                  Notify me when available
                </button>
              )}
            </div>

            {/* Notification Form */}
            {showNotificationForm && (
              <form onSubmit={handleNotifyMe} className="bg-green-50 border border-green-200 rounded-xl p-5 shadow-sm">
                <h4 className="text-base font-semibold text-green-900 mb-4 flex items-center">
                  <Bell className="h-5 w-5 mr-2" />
                  Get Notified When Back in Stock
                </h4>

                {/* Email Input */}
                <div className="mb-3">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    value={notificationEmail}
                    onChange={(e) => setNotificationEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    className="w-full px-3 py-2 border border-green-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>

                {/* Phone Input */}
                <div className="mb-4">
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Phone Number {(notificationChannels.sms || notificationChannels.whatsapp) && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    type="tel"
                    value={notificationPhone}
                    onChange={(e) => setNotificationPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    placeholder="10-digit mobile number"
                    className="w-full px-3 py-2 border border-green-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    maxLength="10"
                    pattern="[0-9]{10}"
                  />
                </div>

                {/* Notification Preferences */}
                <div className="mb-4">
                  <label className="block text-xs font-medium text-gray-700 mb-2">Notify me via:</label>
                  <div className="space-y-2">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notificationChannels.email}
                        onChange={(e) => setNotificationChannels({...notificationChannels, email: e.target.checked})}
                        className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">📧 Email</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notificationChannels.sms}
                        onChange={(e) => setNotificationChannels({...notificationChannels, sms: e.target.checked})}
                        className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">📱 SMS (requires phone number)</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notificationChannels.whatsapp}
                        onChange={(e) => setNotificationChannels({...notificationChannels, whatsapp: e.target.checked})}
                        className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">💬 WhatsApp (requires phone number)</span>
                    </label>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="sm"
                    disabled={isNotificationLoading}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    {isNotificationLoading ? 'Subscribing...' : 'Notify Me'}
                  </Button>
                  <button
                    type="button"
                    onClick={() => setShowNotificationForm(false)}
                    className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
      
      {/* Quantity Selector and Add to Cart */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-4">
        <div className={`flex items-center border border-gray-300 rounded w-full sm:w-32 ${
          product.stock === 0 ? 'opacity-50' : ''
        }`}>
          <button
            onClick={decrementQuantity}
            disabled={quantity <= 1 || product.stock === 0}
            className="h-9 w-9 flex items-center justify-center text-gray-600 hover:text-green-700 disabled:opacity-50"
          >
            <Minus className="h-3.5 w-3.5" />
          </button>
          <input
            type="number"
            value={quantity}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              if (!isNaN(val) && val > 0 && val <= product.stock) {
                setQuantity(val);
              }
            }}
            className="h-9 w-12 border-0 text-center text-xs sm:text-sm focus:ring-0"
            min="1"
            max={product.stock}
            disabled={product.stock === 0}
          />
          <button
            onClick={incrementQuantity}
            disabled={quantity >= product.stock || product.stock === 0}
            className="h-9 w-9 flex items-center justify-center text-gray-600 hover:text-green-700 disabled:opacity-50"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className={`flex-1 h-9 bg-green-600 hover:bg-green-700 text-white font-normal rounded text-xs sm:text-sm transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 ${product.stock === 0 ? '' : ''}`}
        >
          <ShoppingCart className="h-3.5 w-3.5" />
          {product.stock === 0 ? 'Sold Out' : 'Add to Cart'}
        </button>
        <button
          onClick={handleToggleWishlist}
          disabled={isWishlistLoading}
          className="w-full sm:w-10 h-9 flex items-center justify-center border border-gray-300 rounded hover:border-red-400 transition-all duration-200 flex-shrink-0"
          aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            className={`h-4 w-4 transition-all duration-200 ${
              isInWishlist
                ? 'text-red-500 fill-red-500'
                : 'text-gray-400'
            }`}
          />
        </button>
      </div>
      
      {/* Benefits */}
      <div className="space-y-2 mb-4 border-t border-gray-200 pt-3">
        <div className="flex items-start">
          <TruckIcon className="h-3.5 w-3.5 text-green-700 mr-2 flex-shrink-0 mt-0.5" />
          <span className="text-xs text-gray-600 leading-relaxed">Free shipping on all certified refurbished devices across India. EMI available on products over ₹1,500 at checkout.</span>
        </div>
        
        <div className="flex items-start">
          <ShieldCheck className="h-3.5 w-3.5 text-green-700 mr-2 flex-shrink-0 mt-0.5" />
          <span className="text-xs text-gray-600 leading-relaxed">
            {(product.warranty && product.warranty) || '6 months'} warranty on certified refurbished device
          </span>
        </div>
      </div>
      
      <div className="border-t border-gray-200 pt-3 mt-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center text-[10px] sm:text-xs gap-1 sm:gap-0">
          <span className="text-gray-500">SKU: {product._id ? String(product._id).substring(0, 8) + '...' : 'N/A'}</span>
          <span className="mx-2 text-gray-300 hidden sm:inline">|</span>
          <span className="text-gray-500">Collection: {safeCollectionName}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;