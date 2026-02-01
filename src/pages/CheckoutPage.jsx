import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  CreditCard, 
  Wallet, 
  CheckCircle2, 
  ShieldCheck,
  ArrowLeft,
  Trash2,
  MapPin,
  Edit2
} from 'lucide-react';
import AnimatedBackground from '../components/AnimatedBackground';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';
import bkashLogo from '../assets/bkash-logo.png';
import nagadLogo from '../assets/Nagad-Logo.png';
import rocketLogo from '../assets/Rocket.png';
import cardLogo from '../assets/credit-debit.png';

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const cartItems = location.state?.cart || [];
  
  const [selectedMethod, setSelectedMethod] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVV, setCardCVV] = useState('');
  const [processing, setProcessing] = useState(false);
  
  // Billing Address State
  const [hasBillingAddress, setHasBillingAddress] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [billingAddress, setBillingAddress] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    country: 'Bangladesh',
    province: '',
    city: '',
    postalCode: '',
    addressLine1: '',
    addressLine2: '',
    phone: ''
  });

  // Auto-populate name fields from user profile
  useEffect(() => {
    if (user) {
      setBillingAddress(prev => ({
        ...prev,
        firstName: user.firstName || '',
        middleName: user.middleName || '',
        lastName: user.lastName || ''
      }));
    }
  }, [user]);

  const handleAddressChange = (e) => {
    setBillingAddress({
      ...billingAddress,
      [e.target.name]: e.target.value
    });
  };

  const handleSaveAddress = () => {
    // Only validate fields that user needs to fill (not the profile name fields)
    if (!billingAddress.country || !billingAddress.province || !billingAddress.city || 
        !billingAddress.addressLine1 || !billingAddress.phone) {
      toast.error('Please fill in all required address fields');
      return;
    }
    setHasBillingAddress(true);
    setIsEditingAddress(false);
    toast.success('Billing address saved!');
  };

  const paymentMethods = [
    {
      id: 'bkash',
      name: 'bKash',
      logo: bkashLogo,
      color: 'bg-pink-500',
      description: 'Pay with bKash mobile wallet'
    },
    {
      id: 'nagad',
      name: 'Nagad',
      logo: nagadLogo,
      color: 'bg-orange-500',
      description: 'Pay with Nagad mobile wallet'
    },
    {
      id: 'rocket',
      name: 'Rocket',
      logo: rocketLogo,
      color: 'bg-purple-500',
      description: 'Pay with Rocket mobile banking'
    },
    {
      id: 'card',
      name: 'Credit/Debit Card',
      logo: cardLogo,
      color: 'bg-blue-500',
      description: 'Visa, Mastercard, Amex'
    }
  ];

  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handlePayment = () => {
    if (!hasBillingAddress) {
      toast.error('Please add a billing address');
      return;
    }

    if (!selectedMethod) {
      toast.error('Please select a payment method');
      return;
    }

    if ((selectedMethod === 'bkash' || selectedMethod === 'nagad' || selectedMethod === 'rocket') && !phoneNumber) {
      toast.error('Please enter your mobile number');
      return;
    }

    if (selectedMethod === 'card' && (!cardNumber || !cardExpiry || !cardCVV)) {
      toast.error('Please fill in all card details');
      return;
    }

    setProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      toast.success('Payment successful! Order confirmed.');
      setTimeout(() => {
        navigate('/shop');
      }, 2000);
    }, 2000);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-black pt-24 pb-16">
        <AnimatedBackground />
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Your cart is empty</h1>
          <p className="text-white/60 mb-8">Add some items to your cart to proceed with checkout</p>
          <Link to="/shop" className="btn-primary inline-block">
            Go to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <AnimatedBackground />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Cart
          </button>
          <h1 className="text-4xl font-bold text-white mb-2">
            Checkout
          </h1>
          <p className="text-white/60">
            Complete your purchase securely
          </p>
        </motion.div>

        <div className={`grid gap-8 ${hasBillingAddress ? 'lg:grid-cols-3' : 'lg:grid-cols-1'}`}>
          {/* Left Side - Payment Methods & Details */}
          {hasBillingAddress && (
            <div className="lg:col-span-2 space-y-8">
              {/* Payment Method Selection */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8"
              >
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#00FFD1]/20 flex items-center justify-center">
                      <Wallet className="w-5 h-5 text-[#00FFD1]" />
                    </div>
                    Payment Method
                  </h2>
                  <p className="text-white/50 text-sm mt-2 ml-13">Select how you want to pay</p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {paymentMethods.map((method) => (
                    <motion.button
                      key={method.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedMethod(method.id)}
                      className={`flex items-center gap-4 p-5 border-2 rounded-xl transition-all ${
                        selectedMethod === method.id
                          ? 'border-[#00FFD1] bg-[#00FFD1]/10 shadow-lg shadow-[#00FFD1]/20'
                          : 'border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10'
                      }`}
                    >
                      <div className="w-14 h-14 bg-white rounded-lg flex items-center justify-center flex-shrink-0 p-2">
                        <img src={method.logo} alt={method.name} className="w-full h-full object-contain" />
                      </div>
                      <div className="text-left flex-1">
                        <p className="font-semibold text-white">{method.name}</p>
                        <p className="text-xs text-white/50 mt-0.5">{method.description}</p>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Payment Details */}
              {selectedMethod && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8"
                >
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#00FFD1]/20 flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-[#00FFD1]" />
                      </div>
                      Payment Details
                    </h2>
                    <p className="text-white/50 text-sm mt-2 ml-13">Enter your payment information</p>
                  </div>

                  {/* Mobile Wallet Forms */}
                  {(selectedMethod === 'bkash' || selectedMethod === 'nagad' || selectedMethod === 'rocket') && (
                    <div className="space-y-5">
                      <div>
                        <label className="block text-white/70 mb-2 text-sm font-medium">Mobile Number</label>
                        <input
                          type="tel"
                          placeholder="01XXXXXXXXX"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#00FFD1] focus:bg-white/10 transition-all rounded-lg"
                        />
                      </div>
                      <div className="bg-[#00FFD1]/10 border border-[#00FFD1]/30 p-5 rounded-xl">
                        <p className="text-white/80 text-sm leading-relaxed">
                          <strong className="text-[#00FFD1] block mb-2">Payment Instructions:</strong>
                          1. Enter your {paymentMethods.find(m => m.id === selectedMethod)?.name} number
                          <br />2. You will receive a payment request on your phone
                          <br />3. Enter your PIN to complete the payment
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Card Payment Form */}
                  {selectedMethod === 'card' && (
                    <div className="space-y-5">
                      <div>
                        <label className="block text-white/70 mb-2 text-sm font-medium">Card Number</label>
                        <input
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          maxLength="19"
                          className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#00FFD1] focus:bg-white/10 transition-all rounded-lg"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-white/70 mb-2 text-sm font-medium">Expiry Date</label>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            maxLength="5"
                            className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#00FFD1] focus:bg-white/10 transition-all rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-white/70 mb-2 text-sm font-medium">CVV</label>
                          <input
                            type="text"
                            placeholder="123"
                            value={cardCVV}
                            onChange={(e) => setCardCVV(e.target.value)}
                            maxLength="3"
                            className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#00FFD1] focus:bg-white/10 transition-all rounded-lg"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          )}

          {/* Right Side - Billing Address or Order Summary */}
          <div className={hasBillingAddress ? 'lg:col-span-1' : ''}>
            {!hasBillingAddress || isEditingAddress ? (
              /* Billing Address Form */
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6"
              >
                <div className="mb-5">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#00FFD1]/20 flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-[#00FFD1]" />
                    </div>
                    Billing Address
                  </h2>
                  <p className="text-white/50 text-xs mt-1.5">
                    {hasBillingAddress && isEditingAddress ? 'Update your billing address' : 'Enter your billing information'}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {/* Left Column */}
                  <div className="space-y-4">
                    {/* Name Fields - From Profile */}
                    <div className="bg-[#00FFD1]/5 border border-[#00FFD1]/20 rounded-lg p-3">
                      <p className="text-[#00FFD1] text-xs font-medium mb-2 flex items-center gap-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        From profile
                      </p>
                      <div className="space-y-2">
                        <div>
                          <label className="block text-white/70 mb-1 text-xs font-medium">
                            First Name
                          </label>
                          <input
                            type="text"
                            value={billingAddress.firstName}
                            readOnly
                            className="w-full bg-white/5 border border-white/10 px-2.5 py-2 text-white/60 text-sm cursor-not-allowed rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-white/70 mb-1 text-xs font-medium">
                            Last Name
                          </label>
                          <input
                            type="text"
                            value={billingAddress.lastName}
                            readOnly
                            className="w-full bg-white/5 border border-white/10 px-2.5 py-2 text-white/60 text-sm cursor-not-allowed rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-white/70 mb-1 text-xs font-medium">
                            Middle Name
                          </label>
                          <input
                            type="text"
                            value={billingAddress.middleName}
                            readOnly
                            className="w-full bg-white/5 border border-white/10 px-2.5 py-2 text-white/60 text-sm cursor-not-allowed rounded-lg"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Country */}
                    <div>
                      <label className="block text-white/70 mb-1.5 text-xs font-medium">
                        Country <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="country"
                        value={billingAddress.country}
                        onChange={handleAddressChange}
                        className="w-full bg-white/5 border border-white/10 px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#00FFD1] focus:bg-white/10 transition-all rounded-lg"
                      />
                    </div>

                    {/* Province */}
                    <div>
                      <label className="block text-white/70 mb-1.5 text-xs font-medium">
                        Province/State <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="province"
                        value={billingAddress.province}
                        onChange={handleAddressChange}
                        className="w-full bg-white/5 border border-white/10 px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#00FFD1] focus:bg-white/10 transition-all rounded-lg"
                      />
                    </div>

                    {/* City */}
                    <div>
                      <label className="block text-white/70 mb-1.5 text-xs font-medium">
                        City <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={billingAddress.city}
                        onChange={handleAddressChange}
                        className="w-full bg-white/5 border border-white/10 px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#00FFD1] focus:bg-white/10 transition-all rounded-lg"
                      />
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4">
                    {/* Postal Code */}
                    <div>
                      <label className="block text-white/70 mb-1.5 text-xs font-medium">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        name="postalCode"
                        value={billingAddress.postalCode}
                        onChange={handleAddressChange}
                        className="w-full bg-white/5 border border-white/10 px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#00FFD1] focus:bg-white/10 transition-all rounded-lg"
                      />
                    </div>

                    {/* Address Line 1 */}
                    <div>
                      <label className="block text-white/70 mb-1.5 text-xs font-medium">
                        Address Line 1 <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="addressLine1"
                        value={billingAddress.addressLine1}
                        onChange={handleAddressChange}
                        className="w-full bg-white/5 border border-white/10 px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#00FFD1] focus:bg-white/10 transition-all rounded-lg"
                      />
                    </div>

                    {/* Address Line 2 */}
                    <div>
                      <label className="block text-white/70 mb-1.5 text-xs font-medium">
                        Address Line 2
                      </label>
                      <input
                        type="text"
                        name="addressLine2"
                        value={billingAddress.addressLine2}
                        onChange={handleAddressChange}
                        className="w-full bg-white/5 border border-white/10 px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#00FFD1] focus:bg-white/10 transition-all rounded-lg"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-white/70 mb-1.5 text-xs font-medium">
                        Phone Number <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={billingAddress.phone}
                        onChange={handleAddressChange}
                        className="w-full bg-white/5 border border-white/10 px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#00FFD1] focus:bg-white/10 transition-all rounded-lg"
                      />
                    </div>
                  </div>
                </div>

                {/* Action Buttons - Full Width Below Columns */}
                <div className="flex flex-col gap-2.5 pt-4">
                  <button
                    onClick={handleSaveAddress}
                    className="w-full bg-[#00FFD1] text-black font-semibold py-3 rounded-lg hover:bg-[#00FFD1]/90 transition-all hover:shadow-lg hover:shadow-[#00FFD1]/20"
                  >
                    Save & Continue
                  </button>
                  {hasBillingAddress && isEditingAddress && (
                    <button
                      onClick={() => setIsEditingAddress(false)}
                      className="w-full bg-white/5 border border-white/10 text-white py-2.5 rounded-lg hover:bg-white/10 transition-all text-sm"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </motion.div>
            ) : (
              /* Billing Address and Order Summary - Only shows when billing address is saved */
              <div className="space-y-6">
                {/* Saved Billing Address Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6"
                >
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-[#00FFD1]" />
                    Billing Address
                  </h3>
                  <div className="bg-white/5 border border-white/10 p-4 rounded-xl mb-3">
                    <div className="space-y-2">
                      <p className="text-white font-semibold">
                        {billingAddress.firstName} {billingAddress.middleName && billingAddress.middleName + ' '}{billingAddress.lastName}
                      </p>
                      <p className="text-white/70 text-sm">{billingAddress.addressLine1}</p>
                      {billingAddress.addressLine2 && (
                        <p className="text-white/70 text-sm">{billingAddress.addressLine2}</p>
                      )}
                      <p className="text-white/70 text-sm">
                        {billingAddress.city}, {billingAddress.province} {billingAddress.postalCode}
                      </p>
                      <p className="text-white/70 text-sm">{billingAddress.country}</p>
                      <p className="text-white/70 text-sm">{billingAddress.phone}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsEditingAddress(true)}
                    className="flex items-center gap-2 text-[#00FFD1] hover:text-[#00FFD1]/80 transition-colors font-medium text-sm"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit Address
                  </button>
                </motion.div>

                {/* Order Summary Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6"
                >
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-[#00FFD1]" />
                    Order Summary
                  </h2>
                    
                    <div className="space-y-3 mb-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                      {cartItems.map((item) => (
                        <div
                          key={`${item.gameId}-${item.currencyId}`}
                          className="flex justify-between items-start pb-3 border-b border-white/10 last:border-0"
                        >
                          <div className="flex-1 pr-2">
                            <p className="text-white font-semibold text-sm">{item.currencyName}</p>
                            <p className="text-white/40 text-xs mt-0.5">{item.gameName}</p>
                            <p className="text-white/50 text-xs mt-1">
                              <span className="bg-white/10 px-2 py-0.5 rounded">Qty: {item.quantity}</span>
                            </p>
                          </div>
                          <span className="text-[#00FFD1] font-bold">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2 mb-6 pt-4 border-t border-white/10">
                      <div className="flex justify-between text-white/60 text-sm">
                        <span>Subtotal</span>
                        <span className="font-semibold">${cartTotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-white/60 text-sm">
                        <span>Processing Fee</span>
                        <span className="font-semibold">$0.00</span>
                      </div>
                      <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-3"></div>
                      <div className="flex justify-between text-xl font-bold">
                        <span className="text-white">Total</span>
                        <span className="text-[#00FFD1]">${cartTotal.toFixed(2)}</span>
                      </div>
                    </div>

                    <button
                      onClick={handlePayment}
                      disabled={processing}
                      className="btn-primary w-full text-center disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-[#00FFD1]/30 transition-all"
                    >
                      {processing ? (
                        <span className="flex items-center justify-center gap-2">
                          <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                          Processing...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          <CheckCircle2 className="w-5 h-5" />
                          Pay ${cartTotal.toFixed(2)}
                        </span>
                      )}
                    </button>

                    <div className="mt-4 bg-[#00FFD1]/10 border border-[#00FFD1]/30 p-3 rounded-xl">
                      <div className="flex items-start gap-2">
                        <ShieldCheck className="w-4 h-4 text-[#00FFD1] flex-shrink-0 mt-0.5" />
                        <p className="text-white/60 text-xs leading-relaxed">
                          Your payment is encrypted and secure. We never store your card details.
                        </p>
                      </div>
                    </div>
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
