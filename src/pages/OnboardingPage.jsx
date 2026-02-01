import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogOut } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '../contexts/AuthContext';
import welcomeImage from '../assets/gamify_welcome.png';
import AnimatedBackground from '../components/AnimatedBackground';

const OnboardingPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    middleName: '',
    lastName: '',
    gender: ''
  });

  const handleLogout = () => {
    sessionStorage.removeItem('registrationEmail');
    toast.info('Logged out. You can register again.');
    navigate('/register');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate username (no spaces, alphanumeric)
    if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      toast.error('Username can only contain letters, numbers, and underscores');
      return;
    }

    // Get email from sessionStorage (set during registration)
    const email = sessionStorage.getItem('registrationEmail');
    
    // Complete user profile
    const userData = {
      email: email,
      username: formData.username,
      firstName: formData.firstName,
      middleName: formData.middleName,
      lastName: formData.lastName,
      gender: formData.gender,
      name: formData.middleName 
        ? `${formData.firstName} ${formData.middleName} ${formData.lastName}`
        : `${formData.firstName} ${formData.lastName}`
    };
    
    login(userData);
    sessionStorage.removeItem('registrationEmail');
    toast.success('Profile completed! Welcome to Gamify!');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <AnimatedBackground />
      
      {/* Logout Button */}
      <div className="absolute top-6 right-6 z-20">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 transition-all rounded-md"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-2xl"
        >
          {/* Welcome Image */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex justify-center mb-8 mt-12"
          >
            <img src={welcomeImage} alt="Welcome to Gamify" className="w-64 h-auto object-contain" />
          </motion.div>

          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
              Complete Your <span className="text-[#00FFD1]">Profile</span>
            </h1>
            <p className="text-white/60 text-lg">
              Let's get to know you better
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="w-full"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Username Field */}
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                placeholder="Username"
                className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-[#00FFD1] transition-colors rounded-md"
              />

              {/* First Name */}
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                placeholder="First Name"
                className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-[#00FFD1] transition-colors rounded-md"
              />

              {/* Middle Name */}
              <input
                type="text"
                name="middleName"
                value={formData.middleName}
                onChange={handleChange}
                placeholder="Middle Name (Optional)"
                className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-[#00FFD1] transition-colors rounded-md"
              />

              {/* Last Name */}
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                placeholder="Last Name"
                className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-[#00FFD1] transition-colors rounded-md"
              />

              {/* Gender Field */}
              <div className="grid grid-cols-3 gap-3">
                {['Male', 'Female', 'Other'].map((option) => (
                  <label
                    key={option}
                    className={`
                      flex items-center justify-center py-3 px-4 border rounded-md cursor-pointer transition-all
                      ${formData.gender === option 
                        ? 'bg-[#00FFD1]/20 border-[#00FFD1] text-[#00FFD1]' 
                        : 'bg-white/5 border-white/10 text-white/60 hover:border-white/30'
                      }
                    `}
                  >
                    <input
                      type="radio"
                      name="gender"
                      value={option}
                      checked={formData.gender === option}
                      onChange={handleChange}
                      required
                      className="sr-only"
                    />
                    <span className="font-medium">{option}</span>
                  </label>
                ))}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#00FFD1] text-black font-semibold py-3 rounded-md hover:bg-[#00FFD1]/90 transition-colors"
              >
                Complete Setup
              </button>
            </form>
          </motion.div>

          {/* Skip Option */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-center mt-6"
          >
            <p className="text-white/40 text-sm">
              You can always update this information later in your profile settings
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 py-4">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-white/40 text-sm">
            Step 2 of 2 - Almost there!
          </p>
        </div>
      </footer>
    </div>
  );
};

export default OnboardingPage;
