import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  CreditCard, 
  Wallet, 
  CheckCircle2, 
  ShieldCheck,
  ArrowLeft,
  Trash2
} from 'lucide-react';
import AnimatedBackground from '../components/AnimatedBackground';
import { toast } from 'sonner';
import bkashLogo from '../assets/bkash-logo.png';
import nagadLogo from '../assets/Nagad-Logo.png';
import rocketLogo from '../assets/Rocket.png';
import cardLogo from '../assets/credit-debit.png';

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const cartItems = location.state?.cart || [];
  
  const [selectedMethod, setSelectedMethod] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVV, setCardCVV] = useState('');
  const [processing, setProcessing] = useState(false);

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

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Payment Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Payment Method Selection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/5 border border-white/10 p-6"
            >
              <h2 className="text-2xl font-bold text-white mb-1 flex items-center gap-2">
                <Wallet className="w-6 h-6 text-[#00FFD1]" />
                Payment Method
              </h2>
              <p className="text-white/60 text-sm mb-6">Select how you want to pay</p>

              <div className="grid sm:grid-cols-2 gap-4">
                {paymentMethods.map((method) => (
                  <motion.button
                    key={method.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedMethod(method.id)}
                    className={`flex items-center gap-4 p-4 border-2 transition-all ${
                      selectedMethod === method.id
                        ? 'border-[#00FFD1] bg-[#00FFD1]/10'
                        : 'border-white/10 bg-white/5 hover:border-white/30'
                    }`}
                  >
                    <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center flex-shrink-0 p-2">
                      <img src={method.logo} alt={method.name} className="w-full h-full object-contain" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-white">{method.name}</p>
                      <p className="text-xs text-white/60">{method.description}</p>
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
                className="bg-white/5 border border-white/10 p-6"
              >
                <h2 className="text-2xl font-bold text-white mb-1 flex items-center gap-2">
                  <CreditCard className="w-6 h-6 text-[#00FFD1]" />
                  Payment Details
                </h2>
                <p className="text-white/60 text-sm mb-6">Enter your payment information</p>

                {/* Mobile Wallet Forms */}
                {(selectedMethod === 'bkash' || selectedMethod === 'nagad' || selectedMethod === 'rocket') && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-white/80 mb-2 text-sm">Mobile Number</label>
                      <input
                        type="tel"
                        placeholder="01XXXXXXXXX"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-[#00FFD1] transition-colors"
                      />
                    </div>
                    <div className="bg-[#00FFD1]/10 border border-[#00FFD1]/30 p-4">
                      <p className="text-white/80 text-sm">
                        <strong className="text-[#00FFD1]">Instructions:</strong>
                        <br />1. Enter your {paymentMethods.find(m => m.id === selectedMethod)?.name} number
                        <br />2. You will receive a payment request on your phone
                        <br />3. Enter your PIN to complete the payment
                      </p>
                    </div>
                  </div>
                )}

                {/* Card Payment Form */}
                {selectedMethod === 'card' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-white/80 mb-2 text-sm">Card Number</label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        maxLength="19"
                        className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-[#00FFD1] transition-colors"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white/80 mb-2 text-sm">Expiry Date</label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          maxLength="5"
                          className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-[#00FFD1] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-white/80 mb-2 text-sm">CVV</label>
                        <input
                          type="text"
                          placeholder="123"
                          value={cardCVV}
                          onChange={(e) => setCardCVV(e.target.value)}
                          maxLength="3"
                          className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-[#00FFD1] transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/5 border border-white/10 p-6"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div
                    key={`${item.gameId}-${item.currencyId}`}
                    className="flex justify-between items-start pb-4 border-b border-white/10"
                  >
                    <div className="flex-1">
                      <p className="text-white font-semibold">{item.currencyName}</p>
                      <p className="text-white/50 text-sm">{item.gameName}</p>
                      <p className="text-white/60 text-sm mt-1">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-[#00FFD1] font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-white/60">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>Processing Fee</span>
                  <span>$0.00</span>
                </div>
                <div className="h-px bg-white/10 my-3"></div>
                <div className="flex justify-between text-xl font-bold">
                  <span className="text-white">Total</span>
                  <span className="text-[#00FFD1]">${cartTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handlePayment}
                disabled={processing}
                className="btn-primary w-full text-center text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {processing ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                    Processing...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-5 h-5" />
                    Complete Payment
                  </span>
                )}
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-[#00FFD1]/10 border border-[#00FFD1]/30 p-4"
            >
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#00FFD1] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-semibold text-sm mb-1">Secure Payment</p>
                  <p className="text-white/70 text-xs">
                    Your payment information is encrypted and secure. We never store your card details.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
