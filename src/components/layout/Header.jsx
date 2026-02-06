import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingCart, Gamepad2, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import logo from '../../assets/logo.png';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartTotal, cartItemCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/shop', label: 'Shop' },
    { path: '/about', label: 'About' },
    { path: '/support', label: 'Support' }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'glass-strong py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
            className="w-10 h-10 flex items-center justify-center"
          >
            <img src={logo} alt="Gamify Logo" className="w-full h-full object-contain" />
          </motion.div>
          <span className="text-2xl font-bold tracking-tight">
            <span className="text-white">GAMI</span>
            <span className="text-[#00FFD1]">FY</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-lg font-medium transition-colors duration-300 relative group ${
                location.pathname === link.path
                  ? 'text-[#00FFD1]'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              {link.label}
              <span
                className={`absolute -bottom-1 left-0 h-0.5 bg-[#00FFD1] transition-all duration-300 ${
                  location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              />
            </Link>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <>
              {/* Cart Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative text-white/80 hover:text-white transition-colors p-2"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#00FFD1] text-black text-xs font-bold rounded-full flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </button>
              <Link
                to="/profile"
                className="text-white/80 hover:text-white transition-colors font-medium flex items-center gap-2"
              >
                <User className="w-5 h-5" />
                <span>Profile</span>
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-white/80 hover:text-white transition-colors font-medium"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="btn-primary"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-white p-2"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-strong mt-2 mx-4"
          >
            <nav className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-lg font-medium py-2 ${
                    location.pathname === link.path
                      ? 'text-[#00FFD1]'
                      : 'text-white/60'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              {isAuthenticated && (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsCartOpen(true);
                  }}
                  className="text-lg font-medium py-2 text-white/60 text-left flex items-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Cart
                  {cartItemCount > 0 && (
                    <span className="ml-auto w-6 h-6 bg-[#00FFD1] text-black text-sm font-bold rounded-full flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </button>
              )}
              {isAuthenticated ? (
                <Link
                  to="/profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-lg font-medium py-2 ${
                    location.pathname === '/profile'
                      ? 'text-[#00FFD1]'
                      : 'text-white/60'
                  }`}
                >
                  Profile
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="btn-secondary text-center mt-4"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="btn-primary text-center"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 z-40"
              onClick={() => setIsCartOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 20 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-black border-l border-white/10 z-50 flex flex-col"
            >
              {/* Cart Header */}
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Your Cart</h2>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 hover:bg-white/10 transition-colors"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-auto p-6">
                {cart.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingCart className="w-16 h-16 text-white/20 mx-auto mb-4" />
                    <p className="text-white/60">Your cart is empty</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div
                        key={`${item.gameId}-${item.currencyId}`}
                        className="bg-white/5 border border-white/10 p-4"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="text-white font-semibold">{item.currencyName}</h3>
                            <p className="text-white/50 text-sm">{item.gameName}</p>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.gameId, item.currencyId)}
                            className="text-white/40 hover:text-red-400 transition-colors"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.gameId, item.currencyId, item.quantity - 1)}
                              className="w-8 h-8 bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
                            >
                              -
                            </button>
                            <span className="text-white w-8 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.gameId, item.currencyId, item.quantity + 1)}
                              className="w-8 h-8 bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
                            >
                              +
                            </button>
                          </div>
                          <span className="text-[#00FFD1] font-semibold">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Cart Footer */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-white/60">Total</span>
                    <span className="text-2xl font-bold text-[#00FFD1]">
                      ${cartTotal.toFixed(2)}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      navigate('/checkout', { state: { cart } });
                    }}
                    className="btn-primary w-full text-center text-lg"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;