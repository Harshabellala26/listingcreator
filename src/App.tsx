import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Listing = {
  title: string;
  description: string;
  price: string;
  imageUrl: string;
  category: string;
};

type ViewMode = 'buyer' | 'seller';
type CardType = 'basic' | 'featured';

export default function ListingCreator() {
  const [listing, setListing] = useState<Listing>({
    title: '',
    description: '',
    price: '',
    imageUrl: '',
    category: 'Electronics',
  });

  const [errors, setErrors] = useState<Partial<Listing>>({});
  const [viewMode, setViewMode] = useState<ViewMode>('seller');
  const [cardType, setCardType] = useState<CardType>('basic');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    'Electronics',
    'Fashion',
    'Home & Garden',
    'Vehicles',
    'Sports',
    'Other',
  ];

  useEffect(() => {
    const newErrors: Partial<Listing> = {};
    if (listing.title.length > 50) {
      newErrors.title = 'Title must be less than 50 characters';
    }
    if (listing.description.length > 500) {
      newErrors.description = 'Description must be less than 500 characters';
    }
    if (listing.price && isNaN(Number(listing.price))) {
      newErrors.price = 'Price must be a number';
    }
    setErrors(newErrors);
  }, [listing]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setListing(prev => ({ ...prev, [name]: value }));
  };

  const isValidImageUrl = (url: string) => {
    if (!url) return false;
    try {
      new URL(url);
      return /\.(jpe?g|png|gif|webp|bmp|svg)$/i.test(url.split('?')[0].split('#')[0]);
    } catch {
      return false;
    }
  };

  const isFormValid = Object.keys(errors).length === 0 && 
    listing.title && 
    listing.description && 
    listing.price;

  const handleSubmit = () => {
    if (!isFormValid) return;
    setIsSubmitting(true);
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Listing created successfully!');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-4 md:p-8 animate-gradient-x">
      <div className="max-w-6xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600"
        >
          Create Your Listing
        </motion.h1>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Column - Form */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full md:w-1/2 bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20"
          >
            <div className="space-y-6">
              {/* View Mode Toggle */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  View Mode
                </label>
                <div className="flex gap-2 bg-white/50 p-1 rounded-xl shadow-inner">
                  {(['seller', 'buyer'] as ViewMode[]).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setViewMode(mode)}
                      className={`flex-1 py-3 rounded-xl transition-all duration-300 ${
                        viewMode === mode
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md'
                          : 'bg-transparent text-gray-600 hover:bg-white/50'
                      }`}
                    >
                      {mode.charAt(0).toUpperCase() + mode.slice(1)} View
                    </button>
                  ))}
                </div>
              </div>

              {/* Card Type Toggle */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Card Style
                </label>
                <div className="flex gap-2 bg-white/50 p-1 rounded-xl shadow-inner">
                  {(['basic', 'featured'] as CardType[]).map((type) => (
                    <button
                      key={type}
                      onClick={() => setCardType(type)}
                      className={`flex-1 py-3 rounded-xl transition-all duration-300 ${
                        cardType === type
                          ? type === 'featured'
                            ? 'bg-gradient-to-r from-amber-400 to-orange-400 text-white shadow-md'
                            : 'bg-gradient-to-r from-blue-400 to-cyan-400 text-white shadow-md'
                          : 'bg-transparent text-gray-600 hover:bg-white/50'
                      }`}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Form Inputs */}
              <motion.div layout className="space-y-5">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                    Listing Title*
                  </label>
                  <motion.input
                    layout
                    type="text"
                    id="title"
                    name="title"
                    value={listing.title}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 bg-white/80"
                    placeholder="Enter listing title"
                    whileFocus={{ scale: 1.01 }}
                  />
                  <AnimatePresence>
                    {errors.title && (
                      <motion.p 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-pink-600 text-xs mt-1"
                      >
                        {errors.title}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                    Description*
                  </label>
                  <motion.textarea
                    layout
                    id="description"
                    name="description"
                    value={listing.description}
                    onChange={handleChange}
                    rows={4}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 bg-white/80"
                    placeholder="Enter detailed description"
                    whileFocus={{ scale: 1.01 }}
                  />
                  <AnimatePresence>
                    {errors.description && (
                      <motion.p 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-pink-600 text-xs mt-1"
                      >
                        {errors.description}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                    Price*
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-500">₹</span>
                    <motion.input
                      layout
                      type="text"
                      id="price"
                      name="price"
                      value={listing.price}
                      onChange={handleChange}
                      className="w-full pl-8 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 bg-white/80"
                      placeholder="0.00"
                      whileFocus={{ scale: 1.01 }}
                    />
                  </div>
                  <AnimatePresence>
                    {errors.price && (
                      <motion.p 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-pink-600 text-xs mt-1"
                      >
                        {errors.price}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <div>
                  <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-2">
                    Image URL
                  </label>
                  <motion.input
                    layout
                    type="text"
                    id="imageUrl"
                    name="imageUrl"
                    value={listing.imageUrl}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 bg-white/80"
                    placeholder="Paste image URL here"
                    whileFocus={{ scale: 1.01 }}
                  />
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <motion.select
                    layout
                    id="category"
                    name="category"
                    value={listing.category}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 bg-white/80 appearance-none"
                    whileFocus={{ scale: 1.01 }}
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </motion.select>
                </div>

                <motion.button
                  layout
                  disabled={!isFormValid || isSubmitting}
                  onClick={handleSubmit}
                  className={`w-full py-4 px-4 rounded-xl font-medium transition-all duration-300 relative overflow-hidden ${
                    isFormValid 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                  whileHover={isFormValid ? { scale: 1.02 } : {}}
                  whileTap={isFormValid ? { scale: 0.98 } : {}}
                >
                  {isSubmitting ? (
                    <motion.span
                      className="absolute inset-0 flex items-center justify-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <motion.span 
                        className="w-5 h-5 border-2 border-white rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        style={{ borderTopColor: 'transparent' }}
                      />
                    </motion.span>
                  ) : (
                    <motion.span initial={{ opacity: 1 }} animate={{ opacity: 1 }}>
                      {viewMode === 'seller' ? 'Publish Listing' : 'Save for Later'}
                    </motion.span>
                  )}
                </motion.button>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column - Preview */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full md:w-1/2"
          >
            <div className="sticky top-4">
              <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                Live Preview
              </h2>
              <motion.div 
                layout
                className={`p-4 rounded-lg shadow ${cardType === 'featured' ? 'border-2 border-violet-400 bg-yellow-50' : 'bg-white'}`}
                whileHover={{ y: -5 }}
              >
                {isValidImageUrl(listing.imageUrl) ? (
                  <motion.div 
                    layout
                    className="relative w-full h-72 overflow-hidden rounded-xl mb-4 shadow-md"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.img 
                      src={listing.imageUrl}
                      alt="Listing preview"
                      className="absolute h-full w-full object-cover"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=Invalid+Image';
                      }}
                    />
                  </motion.div>
                ) : (
                  <motion.div 
                    layout
                    className="w-full h-72 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl mb-4 flex items-center justify-center text-gray-400 shadow-inner"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-center">
                      <svg className="w-12 h-12 mx-auto mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                      <p>Image Preview</p>
                    </div>
                  </motion.div>
                )}

                <div className="flex flex-wrap gap-2 mb-3">
                  <motion.span 
                    layout
                    className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                      cardType === 'featured' 
                        ? 'bg-gradient-to-r from-amber-400 to-orange-400 text-white shadow'
                        : 'bg-gradient-to-r from-blue-400 to-cyan-400 text-white shadow'
                    }`}
                  >
                    {listing.category}
                  </motion.span>
                  {cardType === 'featured' && (
                    <motion.span 
                      layout
                      className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-green-400 to-teal-400 text-white shadow"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                    >
                      Featured
                    </motion.span>
                  )}
                </div>

                <motion.h3 
                  layout
                  className={`font-bold mb-3 ${
                    cardType === 'featured' 
                      ? 'text-2xl text-amber-800'
                      : 'text-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-transparent bg-clip-text'
                  }`}
                >
                  {listing.title || 'Your listing title'}
                </motion.h3>

                <motion.p 
                  layout
                  className="text-gray-600 mb-4 leading-relaxed"
                >
                  {listing.description || 'Description will appear here'}
                </motion.p>

                <motion.div 
                  layout
                  className="flex justify-between items-center"
                >
                  <motion.p 
                    layout
                    className={`font-bold ${
                      cardType === 'featured' 
                        ? 'text-3xl text-amber-600'
                        : 'text-2xl text-blue-600'
                    }`}
                  >
                    {listing.price ? `₹${Number(listing.price).toLocaleString('en-IN')}` : '₹0.00'}
                  </motion.p>
                  {viewMode === 'buyer' ? (
                    <motion.button 
                      layout
                      className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow hover:shadow-md transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Contact Seller
                    </motion.button>
                  ) : (
                    <motion.div 
                      layout
                      className="text-sm text-gray-500"
                    >
                      {new Date().toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}