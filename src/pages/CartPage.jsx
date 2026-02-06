import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Plus, Minus, X, Tag, ArrowRight, Check } from 'lucide-react';
import AnimatedBackground from '../components/AnimatedBackground';
import { useCart } from '../contexts/CartContext';
import { toast } from 'sonner';

const CartPage = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [selectedItems, setSelectedItems] = useState(new Set());

  // Initialize all items as selected when cart changes
  useEffect(() => {
    const allItemIds = new Set(cart.map(item => `${item.gameId}-${item.currencyId}`));
    setSelectedItems(allItemIds);
  }, [cart]);

  const toggleItemSelection = (gameId, currencyId) => {
    const itemId = `${gameId}-${currencyId}`;
    setSelectedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const toggleSelectAll = () => {
    if (selectedItems.size === cart.length) {
      setSelectedItems(new Set());
    } else {
      const allItemIds = new Set(cart.map(item => `${item.gameId}-${item.currencyId}`));
      setSelectedItems(allItemIds);
    }
  };

  const handleQuantityChange = (gameId, currencyId, value) => {
    const quantity = parseInt(value) || 0;
    if (quantity >= 0) {
      updateQuantity(gameId, currencyId, quantity);
    }
  };

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      toast.error('Please enter a coupon code');
      return;
    }
    
    // Mock coupon validation
    if (couponCode.toUpperCase() === 'GAMIFY10') {
      setAppliedCoupon({ code: couponCode, discount: 0.1 });
      toast.success('Coupon applied! 10% discount');
    } else {
      toast.error('Invalid coupon code');
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    toast.success('Coupon removed');
  };

  // Calculate total for selected items only
  const selectedCartTotal = cart.reduce((sum, item) => {
    const itemId = `${item.gameId}-${item.currencyId}`;
    if (selectedItems.has(itemId)) {
      return sum + (item.price * item.quantity);
    }
    return sum;
  }, 0);

  const discount = appliedCoupon ? selectedCartTotal * appliedCoupon.discount : 0;
  const finalTotal = selectedCartTotal - discount;

  const selectedCart = cart.filter(item => 
    selectedItems.has(`${item.gameId}-${item.currencyId}`)
  );

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <AnimatedBackground />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Shopping <span className="text-[#00FFD1]">Cart</span>
          </h1>
          <p className="text-white/60 text-lg">
            Review your items and proceed to checkout
          </p>
        </motion.div>

        {cart.length === 0 ? (
          // Empty Cart
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="bg-white/5 border border-white/10 p-12 max-w-md mx-auto">
              <ShoppingCart className="w-20 h-20 text-white/20 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-white mb-4">Your cart is empty</h2>
              <p className="text-white/60 mb-8">
                Looks like you haven't added any items to your cart yet.
              </p>
              <button
                onClick={() => navigate('/shop')}
                className="btn-primary inline-flex items-center gap-2"
              >
                Continue Shopping
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        ) : (
          // Cart with Items
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Side - Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {/* Select All */}
              <div className="bg-white/5 border border-white/10 p-4">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center">
                    <input
                      type="checkbox"
                      checked={selectedItems.size === cart.length && cart.length > 0}
                      onChange={toggleSelectAll}
                      className="w-5 h-5 rounded bg-white/5 border-2 border-white/30 checked:bg-[#00FFD1] checked:border-[#00FFD1] appearance-none cursor-pointer transition-all hover:border-[#00FFD1]/50"
                    />
                    {selectedItems.size === cart.length && cart.length > 0 && (
                      <Check className="absolute w-3.5 h-3.5 text-black pointer-events-none" strokeWidth={3} />
                    )}
                  </div>
                  <span className="text-white font-medium group-hover:text-[#00FFD1] transition-colors">
                    Select All ({cart.length} {cart.length === 1 ? 'item' : 'items'})
                  </span>
                </label>
              </div>

              {cart.map((item, index) => {
                const isOutOfStock = false; // Mock stock status
                const itemId = `${item.gameId}-${item.currencyId}`;
                const isSelected = selectedItems.has(itemId);

                return (
                  <motion.div
                    key={itemId}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`bg-white/5 border transition-all duration-300 ${
                      isOutOfStock 
                        ? 'border-red-500/30 opacity-60' 
                        : isSelected
                        ? 'border-[#00FFD1]/30'
                        : 'border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="p-6">
                      <div className="flex gap-4">
                        {/* Checkbox */}
                        <div className="flex-shrink-0 pt-1">
                          <label className="cursor-pointer block">
                            <div className="relative flex items-center justify-center">
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => toggleItemSelection(item.gameId, item.currencyId)}
                                disabled={isOutOfStock}
                                className="w-5 h-5 rounded bg-white/5 border-2 border-white/30 checked:bg-[#00FFD1] checked:border-[#00FFD1] appearance-none cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:border-[#00FFD1]/50"
                              />
                              {isSelected && (
                                <Check className="absolute w-3.5 h-3.5 text-black pointer-events-none" strokeWidth={3} />
                              )}
                            </div>
                          </label>
                        </div>

                        {/* Product Image */}
                        <div className="w-24 h-24 bg-white/10 border border-white/10 flex items-center justify-center flex-shrink-0 relative">
                          <ShoppingCart className="w-10 h-10 text-white/40" />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <h3 className="text-xl font-bold text-white mb-1">
                                {item.currencyName}
                              </h3>
                              <p className="text-white/60 text-sm mb-2">{item.gameName}</p>
                              {isOutOfStock && (
                                <span className="inline-block bg-red-500/20 text-red-400 text-xs font-semibold px-3 py-1 border border-red-500/30">
                                  OUT OF STOCK
                                </span>
                              )}
                            </div>
                            <button
                              onClick={() => removeFromCart(item.gameId, item.currencyId)}
                              className="text-white/40 hover:text-red-400 transition-colors p-2"
                              title="Remove item"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          </div>

                          <div className="flex items-center justify-between flex-wrap gap-4">
                            {/* Quantity Controls */}
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => updateQuantity(item.gameId, item.currencyId, item.quantity - 1)}
                                disabled={isOutOfStock}
                                className="w-10 h-10 bg-white/10 border border-white/10 text-white flex items-center justify-center hover:bg-white/20 hover:border-[#00FFD1]/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              
                              <input
                                type="number"
                                min="0"
                                value={item.quantity}
                                onChange={(e) => handleQuantityChange(item.gameId, item.currencyId, e.target.value)}
                                disabled={isOutOfStock}
                                className="w-20 h-10 bg-white/5 border border-white/10 text-white text-center focus:outline-none focus:border-[#00FFD1] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                              />
                              
                              <button
                                onClick={() => updateQuantity(item.gameId, item.currencyId, item.quantity + 1)}
                                disabled={isOutOfStock}
                                className="w-10 h-10 bg-white/10 border border-white/10 text-white flex items-center justify-center hover:bg-white/20 hover:border-[#00FFD1]/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>

                            {/* Price */}
                            <div className="text-right">
                              <div className="text-sm text-white/60 mb-1">
                                ${item.price.toFixed(2)} each
                              </div>
                              <div className="text-2xl font-bold text-[#00FFD1]">
                                ${(item.price * item.quantity).toFixed(2)}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Right Side - Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white/5 border border-white/10 p-6 sticky top-24"
              >
                <h2 className="text-2xl font-bold text-white mb-6">Order Summary</h2>

                {/* Selected Items Info */}
                {selectedItems.size > 0 && (
                  <div className="bg-[#00FFD1]/10 border border-[#00FFD1]/30 p-3 mb-6 text-sm">
                    <span className="text-[#00FFD1] font-medium">
                      {selectedItems.size} {selectedItems.size === 1 ? 'item' : 'items'} selected
                    </span>
                  </div>
                )}

                {/* Coupon Code */}
                <div className="mb-6">
                  <label className="text-white/60 text-sm mb-2 block">
                    Coupon Code
                  </label>
                  {appliedCoupon ? (
                    <div className="flex items-center justify-between bg-[#00FFD1]/10 border border-[#00FFD1]/30 p-3">
                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4 text-[#00FFD1]" />
                        <span className="text-[#00FFD1] font-semibold">
                          {appliedCoupon.code}
                        </span>
                      </div>
                      <button
                        onClick={handleRemoveCoupon}
                        className="text-white/60 hover:text-red-400 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Enter code"
                        className="flex-1 bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-[#00FFD1] transition-colors"
                      />
                      <button
                        onClick={handleApplyCoupon}
                        className="bg-white/10 border border-white/10 px-4 py-3 text-white hover:bg-white/20 hover:border-[#00FFD1]/30 transition-all"
                      >
                        Apply
                      </button>
                    </div>
                  )}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 mb-6 pb-6 border-b border-white/10">
                  <div className="flex items-center justify-between text-white/60">
                    <span>Subtotal</span>
                    <span className="font-semibold">${selectedCartTotal.toFixed(2)}</span>
                  </div>
                  
                  {appliedCoupon && selectedCartTotal > 0 && (
                    <div className="flex items-center justify-between text-[#00FFD1]">
                      <span>Discount ({appliedCoupon.discount * 100}%)</span>
                      <span className="font-semibold">-${discount.toFixed(2)}</span>
                    </div>
                  )}
                </div>

                {/* Total */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xl text-white font-semibold">Total</span>
                  <span className="text-3xl font-bold text-[#00FFD1]">
                    ${finalTotal.toFixed(2)}
                  </span>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={() => {
                    if (selectedItems.size === 0) {
                      toast.error('Please select at least one item to checkout');
                      return;
                    }
                    navigate('/checkout', { state: { cart: selectedCart, discount, couponCode: appliedCoupon?.code } });
                  }}
                  disabled={selectedItems.size === 0}
                  className="btn-primary w-full text-center text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-5 h-5" />
                </button>

                <button
                  onClick={() => navigate('/shop')}
                  className="w-full text-center text-white/60 hover:text-white transition-colors mt-4 py-3"
                >
                  Continue Shopping
                </button>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
