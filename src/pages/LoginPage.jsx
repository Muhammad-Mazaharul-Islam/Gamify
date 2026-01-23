import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';
import logo from '../assets/logo.png';
import AnimatedBackground from '../components/AnimatedBackground';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    const userData = {
      name: formData.email.split('@')[0],
      email: formData.email
    };
    login(userData);
    toast.success('Login successful!');
    navigate('/');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <AnimatedBackground />
      
      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Left Half - Logo */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hidden lg:flex lg:w-1/2 items-center justify-center relative z-10"
        >
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative"
          >
            <div className="absolute inset-0 bg-[#00FFD1]/20 blur-3xl rounded-full animate-pulse" />
            <img src={logo} alt="Gamify Logo" className="w-96 h-96 object-contain relative z-10 drop-shadow-2xl" />
          </motion.div>
        </motion.div>

        {/* Right Half - Login Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full lg:w-1/2 flex items-center justify-center p-6 relative z-10"
        >
          <div className="w-full max-w-md">
            <h2 className="text-4xl font-bold text-white mb-8">
              Welcome Back
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Field */}
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Email"
                className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-[#00FFD1] transition-colors rounded-md"
              />

              {/* Password Field */}
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Password"
                  className="w-full bg-white/5 border border-white/10 px-4 py-3 pr-12 text-white placeholder:text-white/40 focus:outline-none focus:border-[#00FFD1] transition-colors rounded-md"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer text-white/60">
                  <input
                    type="checkbox"
                    className="w-4 h-4 bg-white/5 border border-white/10 text-[#00FFD1] focus:ring-[#00FFD1] focus:ring-offset-0 rounded"
                  />
                  <span>Remember me</span>
                </label>
                <Link
                  to="/forgot-password"
                  className="text-[#00FFD1] hover:text-[#00FFD1]/80 transition-colors"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#00FFD1] text-black font-semibold py-3 rounded-md hover:bg-[#00FFD1]/90 transition-colors"
              >
                Sign in
              </button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-black text-white/40">or continue with</span>
                </div>
              </div>

              {/* Social Login */}
              <div className="space-y-3">
                <button
                  type="button"
                  className="w-full bg-white/5 border border-white/10 py-3 rounded-md text-white hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
                >
                  Google
                </button>
                <button
                  type="button"
                  className="w-full bg-white/5 border border-white/10 py-3 rounded-md text-white hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
                >
                  Discord
                </button>
              </div>

              {/* Sign Up Link */}
              <p className="text-center text-white/60 mt-6">
                Don't have an account?{' '}
                <Link
                  to="/register"
                  className="text-[#00FFD1] hover:text-[#00FFD1]/80 font-medium transition-colors"
                >
                  Create Account
                </Link>
              </p>
              
              {/* Help Link */}
              <p className="text-center">
                <Link
                  to="/support"
                  className="text-[#00FFD1] hover:text-[#00FFD1]/80 text-sm transition-colors"
                >
                  Need any help?
                </Link>
              </p>
            </form>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 py-4">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-white/40 text-sm">
            <Link to="/" className="hover:text-white/60 transition-colors">Welcome to your gamify community</Link>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LoginPage;
